import { sendMail } from "@/services/email";
import { IOrderFronted, TOrderStatus } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const order: IOrderFronted = body.transformOrder;
    const { status, customer, id } = order;

    const fullName = `${customer.firstName} ${customer.lastName}`;

    // Dynamic subject and message
    const statusMessages: Record<TOrderStatus, string> = {
      PLACED: "Your order has been placed successfully!",
      CONFIRMED: "Your order has been confirmed by the farmer.",
      SHIPPED: "Your order is on the way!",
      DELIVERED: "Your order has been delivered successfully.",
      CANCELED: "Your order has been canceled.",
    };

    const subject = `Order #${id} - ${statusMessages[status]}`;
    const html = `
      <p>Hi ${fullName},</p>
      <p>${statusMessages[status]}</p>
      <p><strong>Order ID:</strong> #${id}</p>
      <p><strong>Current Status:</strong> ${status}</p>
      <p>Thank you for choosing <strong>FarmFresh</strong>!<br/>
      Stay tuned for more updates.</p>
    `;

    const text = `
Hi ${fullName},

${statusMessages[status]}

Order ID: #${id}
Current Status: ${status}

Thank you for choosing FarmFresh!
`;

    await sendMail({
      to: customer.email,
      subject,
      text,
      html,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Order status update email sent to ${customer.email}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send order status update email." },
      { status: 400 }
    );
  }
};
