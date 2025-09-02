// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export interface InvoiceData {
//   invoiceNumber: string;
//   invoiceDate: string;
//   customerName: string;
//   customerEmail: string;
//   amount: number;
//   membershipType: string;
//   paymentId: string;
//   orderId: string;
// }

// export function generateInvoicePDF(data: InvoiceData): jsPDF {
//   const doc = new jsPDF();

//   // Set document properties
//   doc.setProperties({
//     title: `Invoice - ${data.invoiceNumber}`,
//     subject: "Drive FITT Membership Invoice",
//     author: "Drive FITT",
//     creator: "Drive FITT System",
//   });

//   // Company Information (Top Left)
//   doc.setFontSize(20);
//   doc.setFont("helvetica", "bold");
//   doc.text("Drive FITT", 20, 30);

//   doc.setFontSize(9);
//   doc.setFont("helvetica", "normal");
//   doc.text("NM/Block-2/R2 LG", 20, 40);
//   doc.text("11-18,46-57,UG 06-17,46-57", 20, 44);
//   doc.text("M3M 65th Avenue Sector-65", 20, 48);
//   doc.text("Gurgaon Haryana - 122022", 20, 52);
//   doc.text("GSTIN: 06AACCZ3846N1ZS", 20, 56);
//   doc.text("Phone: 9871836565", 20, 60);
//   doc.text("Email: info@drivefitt.club", 20, 64);

//   // Invoice Header (Top Right)
//   doc.setFontSize(16);
//   doc.setFont("helvetica", "bold");
//   doc.text("TAX INVOICE", 140, 30);

//   doc.setFontSize(9);
//   doc.setFont("helvetica", "normal");
//   doc.text(`Invoice Number: ${data.invoiceNumber}`, 140, 40);
//   doc.text(`Date: ${data.invoiceDate}`, 140, 44);
//   doc.text(`Customer: ${data.customerName}`, 140, 48);

//   // Itemized Details Table
//   const tableY = 90;

//   // Table headers
//   const headers = [["Description", "Quantity", "Rate (₹)", "Amount (₹)"]];

//   // Calculate GST values
//   const subtotal = 846.61; // Before GST
//   const gstAmount = 152.39; // 18% GST
//   const totalAmount = 999.0;

//   // Table data
//   const tableData = [
//     ["Pre-booking Spot at Drive FITT Sports Club", "1", "846.61", "846.61"],
//     ["", "", "", ""], // Empty row for spacing
//     ["Subtotal (before GST)", "", "", subtotal.toFixed(2)],
//     ["GST @18% (IGST/CGST+SGST)", "", "", gstAmount.toFixed(2)],
//     ["Total Amount (₹)", "", "", totalAmount.toFixed(2)],
//   ];

//   // Create table
//   autoTable(doc, {
//     head: headers,
//     body: tableData,
//     startY: tableY,
//     theme: "grid",
//     styles: {
//       fontSize: 9,
//       cellPadding: 4,
//       lineWidth: 0.3,
//       lineColor: [180, 180, 180],
//     },
//     headStyles: {
//       fillColor: [41, 128, 185],
//       textColor: 255,
//       fontStyle: "bold",
//       fontSize: 10,
//       cellPadding: 6,
//     },
//     columnStyles: {
//       0: { cellWidth: 90, halign: "left" }, // Description - wider for text
//       1: { cellWidth: 20, halign: "center" }, // Quantity - compact
//       2: { cellWidth: 30, halign: "right" }, // Rate - compact
//       3: { cellWidth: 30, halign: "right" }, // Amount - compact
//     },
//     margin: { left: 20, right: 20 },
//     didDrawPage: function (data) {
//       // Store the final Y position of the table
//       (doc as any).lastAutoTable = data;
//     },
//   });

//   // Amount in Words - positioned below table with minimal spacing
//   const tableEndY = (doc as any).lastAutoTable?.finalY || 150;
//   const amountWordsY = tableEndY + 8; // Reduced space below table

//   doc.setFontSize(10);
//   doc.setFont("helvetica", "bold");
//   doc.text("Amount in Words:", 20, amountWordsY);
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(9);
//   doc.text("Nine Hundred Ninety-Nine Rupees Only.", 20, amountWordsY + 6);

//   // Payment Terms - positioned below amount in words with minimal spacing
//   doc.setFontSize(10);
//   doc.setFont("helvetica", "bold");
//   doc.text("Payment Terms:", 20, amountWordsY + 18);
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(9);
//   doc.text(
//     "Payment is due upon receipt of this invoice. This invoice is issued upon",
//     20,
//     amountWordsY + 24
//   );
//   doc.text(
//     "successful pre-booking of your spot at Drive FITT Sports Club.",
//     20,
//     amountWordsY + 30
//   );

//   return doc;
// }

// export function generateInvoiceBuffer(data: InvoiceData): Buffer {
//   const doc = generateInvoicePDF(data);
//   const pdfBuffer = doc.output("arraybuffer");
//   return Buffer.from(pdfBuffer);
// }
