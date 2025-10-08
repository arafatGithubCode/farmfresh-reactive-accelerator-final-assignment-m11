import blobStream from "blob-stream";
import PDFDocument from "pdfkit";

import { IOrderFronted } from "@/types";
import { getFormattedDate } from "./getFormattedDate";

export const generateReceiptPDF = (order: IOrderFronted) => {
  const doc = new PDFDocument();
  const stream = doc.pipe(blobStream());

  // ---- HEADER ----- //
  doc
    .fontSize(22)
    .text("FarmFresh - Order Receipt", { align: "center" })
    .moveDown();

  // ---- ORDER INFO ---- //
  doc.fontSize(14).text(`Order ID: ${order.id}`);
  doc.text(`Status: ${order.status}`);
  doc.text(`Booking Date: ${getFormattedDate(new Date(order.bookingDate))}`);

  if (order.sameDayDeliveryDate) {
    doc.text(
      `Same Day Delivery Date: ${getFormattedDate(
        order.sameDayDeliveryDate as Date
      )}`
    );
  }
  doc.moveDown();

  //   ---- CUSTOMER INFO ---- //
  doc
    .fontSize(16)
    .text("Customer Information", { underline: true })
    .moveDown(0.5);
  doc
    .fontSize(14)
    .text(`Name: ${order.customer.firstName} ${order.customer.lastName}`);
  doc.text(`Email: ${order.customer.email}`);
  doc.text(`Phone: ${order.customer.phone}`);
  doc.text(`Customer Address: ${order.deliveryAddress}`);
  doc.moveDown();

  // ---- DELIVERY INFO ---- //
  doc
    .fontSize(16)
    .text("Delivery Information", { underline: true })
    .moveDown(0.5);
  doc.fontSize(14).text(`Delivery Address: ${order.deliveryAddress}`);
  doc.moveDown(0.5);

  // ---- PAYMENT INFO ---- //
  doc
    .fontSize(16)
    .text("Payment Information", { underline: true })
    .moveDown(0.5);
  doc.fontSize(14).text(`Payment Method: ${order.paymentMethod.method}`);
  if (order.paymentMethod.method === "card") {
    const { nameOnCard, cardNumber, expiry } = order.paymentMethod.cardDetails;
    doc.text(`Name on Card: ${nameOnCard}`);
    doc.text(`Card Number: **** **** **** ${cardNumber.slice(-4)}`);
    doc.text(`Expiry: ${expiry}`);
  } else {
    doc.text(`Mobile Number: ${order.paymentMethod.mobileDetails.number}`);
  }
  doc.moveDown();

  // --- ITEMS TABLE ---
  doc.fontSize(16).text("Ordered Items", { underline: true }).moveDown(0.5);

  const tableTop = doc.y;
  const itemColWidth = 250;
  const qtyColWidth = 50;
  const priceColWidth = 80;
  const totalColWidth = 80;

  // table header
  doc
    .fontSize(14)
    .text("Item", 50, tableTop)
    .text("Qty", 50 + itemColWidth, tableTop)
    .text("Price", 50 + itemColWidth + qtyColWidth, tableTop)
    .text("Total", 50 + itemColWidth + qtyColWidth + priceColWidth, tableTop);

  doc.moveDown(0.5);
  let y = tableTop + 20;
  let grandTotal = 0;

  order.items.forEach((item: any, index: number) => {
    const itemName = item.product?.name || "Unknown Product";
    const quantity = item.quantity;
    const price = item.product?.price || 0;
    const total = quantity * price;
    grandTotal += total;

    doc
      .fontSize(12)
      .text(itemName, 50, y)
      .text(quantity.toString(), 50 + itemColWidth, y)
      .text(`৳${price}`, 50 + itemColWidth + qtyColWidth, y)
      .text(`৳${total}`, 50 + itemColWidth + qtyColWidth + priceColWidth, y);

    y += 20;
  });

  // --- GRAND TOTAL ---
  doc.moveDown(2);
  doc.fontSize(14).text(`Grand Total: ৳${grandTotal}`, { align: "right" });

  doc.moveDown(2);
  doc
    .fontSize(12)
    .text("Thank you for shopping with FarmFresh!", { align: "center" });

  // finalize PDF
  doc.end();

  // --- DOWNLOAD PDF ---
  stream.on("finish", () => {
    const blob = stream.toBlob("application/pdf");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FarmFresh-Receipt-${order.id}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  });
};
