import InvoicePDF from "@/components/common/InvoicePDF";
import { sendMail } from "@/services/email";
import { IOrderFronted } from "@/types";
import { renderToBuffer } from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const order: IOrderFronted = body.order;

    const pdfBuffer = await renderToBuffer(<InvoicePDF order={order} />);
    const uint8Array = new Uint8Array(pdfBuffer);

    const subject = `Your order #${order.id} receipt.`;
    const html = `
      <p>Hi ${order.customer.firstName} ${order.customer.lastName},</p>
      <p>Thanks for your order. Your receipt is attached as a PDF.</p>
      <p>Order ID: <strong>#${order.id}</strong></p>
      <p>Best regards,<br/>FarmFresh</p>
    `;
    const text = `Hi ${order.customer.firstName} ${order.customer.lastName},

Thanks for your order. Your receipt is attached as a PDF.

Order ID: #${order.id}

Best regards,
FarmFresh`;

    await sendMail({
      to: order.customer.email,
      subject,
      text,
      html,
      attachments: [
        {
          filename: `invoice-${order.id}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Description": `attachment; filename=receipt-${order.id}.pdf`,
      },
    });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
};
