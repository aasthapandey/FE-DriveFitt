import { getConnection } from "@/lib/database";
import { getRazorpayInstance } from "@/lib/razorpay";
import { getTrialDateWindow, type TrialPassBooking } from "@/config/trialPass";
import {
  getTrialPassOffer,
  TRIAL_PASS_SERVICE_ID,
  TRIAL_PASS_VARIATION_ID,
} from "@/lib/trialPassOffer";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

const CURRENCY = "INR";

export class TrialPassError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
  }
}

type Input = Record<string, unknown>;

export const inputText = (body: Input, field: string) =>
  typeof body[field] === "string" ? body[field].trim() : "";

export function readBookingId(body: Input) {
  const id = inputText(body, "id");
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(id)) {
    throw new TrialPassError("Invalid booking reference.");
  }
  return id;
}

const isDate = (value: string) => {
  if (!/^[1-9]\d{3}-\d{2}-\d{2}$/.test(value)) return false;
  const time = Date.parse(value);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value;
};

interface BookingRow extends RowDataPacket {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  date_of_birth: string;
  trial_date: string;
  service_id: number;
  amount_paise: number;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
}

interface GatewayPayment {
  id: string;
  order_id?: string | null;
  amount: number | string;
  currency: string;
  status: string;
}

async function lookupBooking(id: string) {
  const pool = await getConnection();
  const [rows] = await pool.execute<BookingRow[]>(
    `SELECT id, first_name, last_name, phone, email,
            DATE_FORMAT(date_of_birth, '%Y-%m-%d') AS date_of_birth,
            DATE_FORMAT(trial_date, '%Y-%m-%d') AS trial_date, service_id,
            amount_paise, razorpay_order_id, razorpay_payment_id
     FROM trial_pass_bookings WHERE id = ?`,
    [id],
  );
  return rows[0] ?? null;
}

async function findBooking(id: string) {
  const booking = await lookupBooking(id);
  if (!booking) throw new TrialPassError("Booking could not be found.", 404);
  return booking;
}

function bookingResult(booking: BookingRow, processing = false): TrialPassBooking {
  const state = booking.razorpay_payment_id ? "paid" : processing ? "processing" : "unpaid";
  return {
    id: booking.id,
    trialDate: booking.trial_date,
    amountPaise: booking.amount_paise,
    state,
    ...(booking.razorpay_payment_id && { paymentId: booking.razorpay_payment_id }),
    ...(state === "unpaid" &&
      booking.razorpay_order_id &&
      booking.trial_date >= getTrialDateWindow().today && {
        checkout: {
          key: process.env.RAZORPAY_KEY_ID!,
          orderId: booking.razorpay_order_id,
          amount: booking.amount_paise,
        },
      }),
  };
}

export async function createTrialBooking(id: string, body: Input) {
  const firstName = inputText(body, "firstName");
  const lastName = inputText(body, "lastName");
  const phone = inputText(body, "phone").replace(/[\s()-]/g, "").replace(/^\+91/, "");
  const email = inputText(body, "email");
  const dateOfBirth = inputText(body, "dateOfBirth");
  const trialDate = inputText(body, "trialDate");
  const { today, last } = getTrialDateWindow();

  if (!firstName || !lastName || firstName.length > 80 || lastName.length > 80) {
    throw new TrialPassError("Enter your first and last name.");
  }
  if (!/^[6-9]\d{9}$/.test(phone)) throw new TrialPassError("Enter a valid Indian mobile number.");
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new TrialPassError("Enter a valid email address.");
  }
  if (!isDate(dateOfBirth) || dateOfBirth >= today) {
    throw new TrialPassError("Enter a valid date of birth.");
  }
  if (!isDate(trialDate) || trialDate < today || trialDate > last) {
    throw new TrialPassError("Choose a trial date from today through the next seven days.");
  }

  const fieldsMatch = (booking: BookingRow) =>
    booking.first_name === firstName && booking.last_name === lastName &&
    booking.phone === `+91${phone}` && booking.email === email &&
    booking.date_of_birth === dateOfBirth && booking.trial_date === trialDate;

  const existing = await lookupBooking(id);
  if (existing && !fieldsMatch(existing)) {
    throw new TrialPassError("The booking details changed. Please submit again.", 409);
  }
  const existingCheckout = existing?.razorpay_order_id ? await getTrialBookingStatus(id) : null;
  if (existingCheckout && existingCheckout.state !== "unpaid") return existingCheckout;

  const offer = await getTrialPassOffer();
  if (!offer) {
    throw new TrialPassError("The trial pass is temporarily unavailable. Please try again later.", 503);
  }
  if (body.quotedAmountPaise !== offer.amountPaise || (existing && existing.amount_paise !== offer.amountPaise)) {
    throw new TrialPassError("The trial pass price changed. Review the updated price before paying.", 409);
  }
  if (existingCheckout) return existingCheckout;

  const gateway = getRazorpayInstance();
  const pool = await getConnection();
  await pool.execute(
    `INSERT INTO trial_pass_bookings
       (id, first_name, last_name, phone, email, date_of_birth, trial_date, service_id, amount_paise)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id = id`,
    // This column stores variation IDs for existing trial pass records.
    [id, firstName, lastName, `+91${phone}`, email, dateOfBirth, trialDate, TRIAL_PASS_VARIATION_ID, offer.amountPaise],
  );
  const booking = await findBooking(id);
  if (!fieldsMatch(booking)) {
    throw new TrialPassError("The booking details changed. Please submit again.", 409);
  }
  if (booking.amount_paise !== offer.amountPaise) {
    throw new TrialPassError("The trial pass price changed. Review the updated price before paying.", 409);
  }

  if (booking.razorpay_order_id) return getTrialBookingStatus(id);

  const order = await gateway.orders.create({
    amount: booking.amount_paise,
    currency: CURRENCY,
    receipt: `tp_${id}`,
    notes: {
      product: "trial_pass",
      service_id: String(TRIAL_PASS_SERVICE_ID),
      service_variation_id: String(booking.service_id),
      ...(offer.name && { variation_name: offer.name.slice(0, 256) }),
    },
  });
  // Concurrent requests can create orders, but only the stored order is ever opened.
  await pool.execute(
    "UPDATE trial_pass_bookings SET razorpay_order_id = ? WHERE id = ? AND razorpay_order_id IS NULL",
    [order.id, id],
  );
  return bookingResult(await findBooking(id));
}

export async function recordTrialPayment(payment: GatewayPayment) {
  if (payment.status !== "captured" || payment.currency !== CURRENCY || !payment.order_id) {
    return false;
  }
  const pool = await getConnection();
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE trial_pass_bookings SET razorpay_payment_id = ?, paid_at = UTC_TIMESTAMP(3)
     WHERE razorpay_order_id = ? AND amount_paise = ? AND razorpay_payment_id IS NULL`,
    [payment.id, payment.order_id, Number(payment.amount)],
  );
  return result.affectedRows > 0;
}

export async function getTrialBookingStatus(id: string, payment?: GatewayPayment) {
  const booking = await findBooking(id);
  if (!booking.razorpay_order_id || booking.razorpay_payment_id) return bookingResult(booking);

  const payments = payment
    ? [payment]
    : (await getRazorpayInstance().orders.fetchPayments(booking.razorpay_order_id)).items;
  const linked = payments.filter((item) =>
    item.order_id === booking.razorpay_order_id &&
    Number(item.amount) === booking.amount_paise && item.currency === CURRENCY,
  );
  const captured = linked.find((item) => item.status === "captured");
  if (captured) await recordTrialPayment(captured);

  return bookingResult(
    await findBooking(id),
    linked.some((item) => item.status === "authorized"),
  );
}

export async function getTrialOrderId(id: string) {
  return (await findBooking(id)).razorpay_order_id;
}
