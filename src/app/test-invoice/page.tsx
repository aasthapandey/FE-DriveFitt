"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";

export default function TestInvoicePage() {
  const generate = useCallback(async () => {
    const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
      import("jspdf"),
      import("jspdf-autotable"),
    ]);

    const doc = new jsPDF();

    // Header logo (optional). If it fails, we keep going.
    try {
      const logoRes = await fetch("/images/logo-invoice2.jpg");
      if (logoRes.ok) {
        const blob = await logoRes.blob();
        const reader = new FileReader();
        const base64: string = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
        doc.addImage(base64, "JPEG", 20, 23, 40, 5);
      }
    } catch {}

    // New company header block under logo
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("24-7 Cricket Group India Private Limited", 20, 30);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Registered Address: 5th Floor,", 20, 34);
    doc.text("DLF Centre, Savitri Cinema Complex,", 20, 38);
    doc.text("Greater Kailash-2, New Delhi - 110048", 20, 42);

    // Existing company info
    doc.setFontSize(9);
    doc.text("NM/Block-2/R2 LG", 20, 50);
    doc.text("11-18,46-57,UG 06-17,46-57", 20, 54);
    doc.text("M3M 65th Avenue Sector-65", 20, 58);
    doc.text("Gurgaon Haryana - 122022", 20, 62);
    doc.text("GSTIN: 06AACCZ3846N1ZS", 20, 70);
    doc.text("CIN: U93110DL2024FTC429911", 20, 74);
    doc.text("Phone: 9871836565", 20, 78);
    doc.text("Email: info@drivefitt.club", 20, 82);

    // Invoice header (right)
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("RECEIPT VOUCHER", 140, 30);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice Number: DFTEST-${Date.now()}`, 140, 40);
    doc.text(`Date: ${new Date().toLocaleDateString("en-IN")}`, 140, 44);
    doc.text("Customer Name: Test User", 140, 48);

    // Table
    const tableY = 95;
    const subtotal = 846.61;
    const gstAmount = 152.39;
    const totalAmount = 999.0;

    autoTable(doc, {
      head: [["Description", "Quantity", "Rate (₹)", "Amount (₹)"]],
      body: [
        [
          "Pre-booking advance with respect to membership at Drive FITT Club",
          "1",
          "846.61",
          "846.61",
        ],
        ["", "", "", ""],
        ["Subtotal (before GST)", "", "", subtotal.toFixed(2)],
        ["GST @18% (IGST/CGST+SGST)", "", "", gstAmount.toFixed(2)],
        ["Total Amount (₹)", "", "", totalAmount.toFixed(2)],
      ],
      startY: tableY,
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { fontStyle: "bold" },
      columnStyles: {
        0: { cellWidth: 70, halign: "left" },
        1: { cellWidth: 30, halign: "center" },
        2: { cellWidth: 30, halign: "center" },
        3: { cellWidth: 35, halign: "center" },
      },
      margin: { left: 20, right: 20 },
      didDrawPage: (data: any) => {
        (doc as any).lastAutoTable = data;
      },
    } as any);

    const tableEndY = (doc as any).lastAutoTable?.finalY || 150;
    const amountWordsY = tableEndY + 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Amount in Words:", 20, amountWordsY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Nine Hundred Ninety-Nine Rupees Only.", 20, amountWordsY + 6);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Terms:", 20, amountWordsY + 18);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      "Payment is due upon receipt of this invoice. This invoice is issued upon",
      20,
      amountWordsY + 24
    );
    doc.text(
      "successful pre-booking of your spot at Drive FITT Sports Club.",
      20,
      amountWordsY + 30
    );

    // Footer note
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(
      "*This invoice is computer-generated; no signature is required.",
      20,
      amountWordsY + 44
    );

    doc.save(`test-invoice-${new Date().toISOString()}.pdf`);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <button
        onClick={generate}
        className="px-6 py-3 rounded-lg bg-[#00DBDC] text-black font-medium shadow"
      >
        Generate Sample Invoice
      </button>
    </div>
  );
}
