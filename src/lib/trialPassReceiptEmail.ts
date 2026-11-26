import { randomUUID } from "node:crypto";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { getConnection } from "@/lib/database";
import { generateTrialPassReceipt, type TrialPassReceipt } from "@/utils/trialPassReceipt";

const MAP_URL = "https://maps.app.goo.gl/n33LDEAkJUcv4mw56";

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function sendReceiptEmail(receipt: TrialPassReceipt) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("Brevo is not configured for trial receipts.");

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    redirect: "error",
    signal: AbortSignal.timeout(8000),
    body: JSON.stringify({
      sender: { name: "Drive FITT", email: process.env.SENDER_EMAIL || "info@drivefitt.club" },
      to: [{ email: receipt.email, name: `${receipt.firstName} ${receipt.lastName}` }],
      subject: "Get ready to experience DriveFITT!",
      headers: { idempotencyKey: receipt.bookingId },
      htmlContent: `<html><body>
        <p>Hi ${escapeHtml(receipt.firstName)}!</p>
        <p>Get ready to experience DriveFITT! Your trial is booked for ${receipt.trialDate}, and we're excited to have you join us at the club.</p>
        <p>Our team will be in touch shortly with more details. For any queries, feel free to call us at <a href="tel:+919871836565">+91 9871836565</a>.</p>
        <p>Find us here: DriveFITT – <a href="${MAP_URL}">${MAP_URL}</a></p>
        <p>See you at DriveFITT!</p>
        <p>Sport, for Life.</p>
      </body></html>`,
      attachment: [generateTrialPassReceipt(receipt)],
    }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    if (body?.code !== "duplicate_parameter" || !/idempotenc/i.test(String(body.message))) {
      console.error("Brevo rejected trial pass receipt", { status: response.status });
      throw new Error(`Brevo rejected the trial receipt email (HTTP ${response.status}).`);
    }
  }
}

export async function deliverTrialPassReceipt(paymentId: string) {
  const pool = await getConnection();
  const [bookings] = await pool.execute<Array<RowDataPacket & TrialPassReceipt>>(
    `SELECT id AS bookingId, first_name AS firstName, last_name AS lastName, email, phone,
            DATE_FORMAT(trial_date, '%d/%m/%Y') AS trialDate,
            DATE_FORMAT(paid_at + INTERVAL 330 MINUTE, '%d/%m/%Y') AS paymentDate,
            amount_paise AS amountPaise, razorpay_order_id AS orderId, razorpay_payment_id AS paymentId
     FROM trial_pass_bookings
     WHERE razorpay_payment_id = ? AND paid_at IS NOT NULL`,
    [paymentId],
  );
  const receipt = bookings[0];
  if (!receipt) return true;

  const token = randomUUID();
  await pool.execute(
    `INSERT INTO trial_pass_receipt_emails (booking_id) VALUES (?)
     ON DUPLICATE KEY UPDATE booking_id = booking_id`,
    [receipt.bookingId],
  );
  const [claim] = await pool.execute<ResultSetHeader>(
    `UPDATE trial_pass_receipt_emails
     SET claim_token = ?, claimed_until = UTC_TIMESTAMP(3) + INTERVAL 45 SECOND
     WHERE booking_id = ? AND sent_at IS NULL
       AND (claimed_until IS NULL OR claimed_until <= UTC_TIMESTAMP(3))`,
    [token, receipt.bookingId],
  );
  if (!claim.affectedRows) {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT sent_at FROM trial_pass_receipt_emails WHERE booking_id = ?",
      [receipt.bookingId],
    );
    return Boolean(rows[0]?.sent_at);
  }

  try {
    await sendReceiptEmail(receipt);
    await pool.execute(
      `UPDATE trial_pass_receipt_emails
       SET sent_at = UTC_TIMESTAMP(3), claim_token = NULL, claimed_until = NULL
       WHERE booking_id = ? AND claim_token = ?`,
      [receipt.bookingId, token],
    );
    return true;
  } catch (error) {
    await pool.execute(
      `UPDATE trial_pass_receipt_emails SET claim_token = NULL, claimed_until = NULL
       WHERE booking_id = ? AND claim_token = ?`,
      [receipt.bookingId, token],
    );
    throw error;
  }
}
