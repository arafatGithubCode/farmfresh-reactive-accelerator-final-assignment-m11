import { sendMail } from "@/services/email";
import { IOrderFronted } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const order: IOrderFronted = body.order;

    const subject = `Order update on #${order.id}`;
    const html = `
      <p>Hi ${order.customer.firstName} ${order.customer.lastName},</p>
      <p>Your order status has been updated:</p>
      <p>Order ID: <strong>#${order.id}</strong></p>
      <p>Status: <strong>${order.status}</strong></p>
      <p>Best regards,<br/>FarmFresh</p>
    `;
    const text = `Hi ${order.customer.firstName} ${order.customer.lastName},

Please be careful about your order's update..

Order ID: #${order.id}

Best regards,
FarmFresh`;

    await sendMail({
      to: order.customer.email,
      subject,
      text,
      html,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Order status update email sent to ${order.customer.email}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to send order status update email." },
      { status: 400 }
    );
  }
};
