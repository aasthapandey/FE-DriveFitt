import { generateReceiptVoucher } from "@/utils/invoiceGenerator";

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

const smallNumbers = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function numberInWords(value: number): string {
  if (value < 20) return smallNumbers[value];
  if (value < 100) return [tens[Math.floor(value / 10)], smallNumbers[value % 10]].filter(Boolean).join("-");
  const [size, label] = value >= 10_000_000 ? [10_000_000, "Crore"] as const
    : value >= 100_000 ? [100_000, "Lakh"] as const
      : value >= 1_000 ? [1_000, "Thousand"] as const
        : [100, "Hundred"] as const;
  return [numberInWords(Math.floor(value / size)), label, numberInWords(value % size)].filter(Boolean).join(" ");
}

export function generateTrialPassReceipt(receipt: TrialPassReceipt) {
  const number = `TP-${receipt.bookingId}`;
  const rupees = Math.floor(receipt.amountPaise / 100);
  const paise = receipt.amountPaise % 100;
  const rupeesInWords = `${numberInWords(rupees) || "Zero"} ${rupees === 1 ? "Rupee" : "Rupees"}`;
  const paiseInWords = paise ? ` and ${numberInWords(paise)} ${paise === 1 ? "Paisa" : "Paise"}` : "";
  const document = generateReceiptVoucher({
    invoiceNumber: number,
    invoiceDate: receipt.paymentDate,
    customerName: `${receipt.firstName} ${receipt.lastName}`,
    customerEmail: receipt.email,
    customerPhone: receipt.phone,
    subject: "Drive FITT one-day trial pass",
    description: `One-day trial pass at Drive FITT Club\nPreferred trial date: ${receipt.trialDate}`,
    totalAmount: receipt.amountPaise / 100,
    amountInWords: `${rupeesInWords}${paiseInWords} Only`,
    paymentReference: `Razorpay payment: ${receipt.paymentId} | Order: ${receipt.orderId}`,
  });

  return {
    name: `receipt voucher ${number}.pdf`,
    content: Buffer.from(document.output("arraybuffer")).toString("base64"),
  };
}
