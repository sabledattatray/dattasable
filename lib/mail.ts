import nodemailer from "nodemailer";

const domain = process.env.NEXTAUTH_URL || "http://localhost:3000";

// Configure SMTP transport
// NOTE: These should be provided in .env.local for production
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  auth: {
    user: process.env.EMAIL_SERVER_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_SERVER_PASSWORD || "your-app-password",
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/admin/auth/verify?token=${token}&email=${email}`;

  await transporter.sendMail({
    from: `"Datta Sable Admin" <${process.env.EMAIL_FROM || "no-reply@dattasable.com"}>`,
    to: email,
    subject: "Verify your email - Datta Sable Admin",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000; color: #fff; border-radius: 10px;">
        <h2 style="color: #c9f31d; text-align: center;">Verify Your Account</h2>
        <p>Hello,</p>
        <p>Thank you for signing up for the Datta Sable Admin Dashboard. To complete your registration and secure your account, please click the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${confirmLink}" style="background-color: #c9f31d; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Email & Login</a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #888;">${confirmLink}</p>
        <p>This link will expire in 1 hour.</p>
        <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;">
        <p style="font-size: 12px; color: #666; text-align: center;">If you didn't create an account, you can safely ignore this email.</p>
      </div>
    `,
  });
};
