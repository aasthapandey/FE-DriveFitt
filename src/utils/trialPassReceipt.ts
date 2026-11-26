import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface TrialPassReceipt {
  bookingId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  trialDate: string;
  paymentDate: string;
  amountPaise: number;
  orderId: string;
  paymentId: string;
}

export function generateTrialPassReceipt(receipt: TrialPassReceipt) {
  const document = new jsPDF();
  const number = `TP-${receipt.bookingId}`;
  document.setProperties({
    title: `Trial pass receipt ${number}`,
    subject: "Drive FITT one-day trial pass",
    author: "Drive FITT",
  });

  document.setFont("helvetica", "bold");
  document.setFontSize(20);
  document.text("Drive FITT", 15, 21);
  document.setFont("helvetica", "normal");
  document.setFontSize(10);
  document.text("M3M 65th Avenue, Sector 65, Gurugram", 15, 28);
  document.setFont("helvetica", "bold");
  document.setFontSize(14);
  document.text("Trial pass payment receipt", 15, 42);

  autoTable(document, {
    startY: 47,
    margin: { left: 15, right: 15 },
    body: [
      ["Receipt number", number],
      ["Booking reference", receipt.bookingId],
      ["Customer", `${receipt.firstName} ${receipt.lastName}`],
      ["Email", receipt.email],
      ["Phone", receipt.phone],
      ["Item", "One-day trial pass"],
      ["Preferred trial date", receipt.trialDate],
      ["Payment date", receipt.paymentDate],
      ["Razorpay order ID", receipt.orderId],
      ["Razorpay payment ID", receipt.paymentId],
      ["Total paid", `INR ${(receipt.amountPaise / 100).toFixed(2)}`],
    ],
    theme: "striped",
    styles: { fontSize: 10, cellPadding: 3, overflow: "linebreak" },
    columnStyles: { 0: { cellWidth: 50, fontStyle: "bold" } },
  });

  return {
    name: `${number}-receipt.pdf`,
    content: Buffer.from(document.output("arraybuffer")).toString("base64"),
  };
}
