import { Reset } from "@/models/resetPasswordModel";
import { sendMail } from "@/services/email";
import { catchErr } from "@/utils/catchErr";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { email, userName } = body;

    const resetKey = randomUUID();

    const subject = "Reset Your Password - FarmFresh";

    const html = `
      <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <h2 style="color: #2e7d32;">Hello ${userName || "there"},</h2>

          <p style="color: #333; font-size: 15px;">
            We received a request to reset the password for your account associated with <strong>${email}</strong>.
          </p>

          <p style="color: #333; font-size: 15px;">
            If you did not make this request, please ignore this email or contact our support team immediately at 
            <a href="mailto:support@farmfresh.com" style="color: #2e7d32; text-decoration: none;">support@farmfresh.com</a>.
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

          <p style="color: #333; font-size: 15px;">
            To reset your password, please follow these steps:
          </p>

          <ol style="color: #333; font-size: 15px; line-height: 1.6;">
            <li>Copy your unique reset key shown below:</li>
          </ol>

          <div style="background: #f1f3f4; padding: 10px 15px; border-radius: 6px; display: inline-block; margin: 8px 0; font-weight: bold; color: #2e7d32;">
            ${resetKey}
          </div>

          <p style="color: #555; font-size: 13px; margin-top: 30px;">
            This message was sent to <strong>${email}</strong> by FarmFresh.<br/>
            Please do not share your reset key with anyone.
          </p>

          <p style="color: #999; font-size: 12px; margin-top: 10px;">
            © ${new Date().getFullYear()} FarmFresh. All rights reserved.
          </p>
        </div>
      </div>
    `;

    await Reset.create({ email, resetKey });

    await sendMail({
      to: email,
      subject,
      html,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Reset key email sent successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    const errMsg = catchErr(error);
    return NextResponse.json(
      { success: false, message: errMsg.error },
      { status: 500 }
    );
  }
};
