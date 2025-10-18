import { sendMail } from "@/services/email";
import { catchErr } from "@/utils/catchErr";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { email, userName } = body;

    const subject = "Your password has been updated successfully";

    const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <h2 style="color: #2e7d32;">Hi ${userName || "there"},</h2>

      <p style="color: #333; font-size: 15px;">
        We wanted to let you know that the password for your account associated with 
        <strong>${email}</strong> has been <strong>successfully updated</strong>.
      </p>

      <p style="color: #333; font-size: 15px;">
        If you made this change, no further action is needed. You can now sign in using your new password.
      </p>

      <p style="color: #333; font-size: 15px;">
        However, if you did <strong>not</strong> request this password change, please contact our support team immediately at
        <a href="mailto:support@farmfresh.com" style="color: #2e7d32; text-decoration: none;">support@farmfresh.com</a>.
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

      <p style="color: #555; font-size: 13px;">
        This message was sent to <strong>${email}</strong> by FarmFresh.<br/>
        For your security, please do not share your password with anyone.
      </p>

      <p style="color: #999; font-size: 12px; margin-top: 10px;">
        © ${new Date().getFullYear()} FarmFresh. All rights reserved.
      </p>
    </div>
  </div>
`;

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
