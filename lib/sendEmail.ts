"use server";
import nodemailer from "nodemailer";
export default async function sendEmail(contactState: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: `"${contactState.name}" <${contactState.email}>`,
      to: "hi@sarowar.dev",
      subject: `portfolio contact: ${contactState.subject}`,
      text: contactState.message,
    };
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully" };
  } catch (e) {
    return { success: false, message: "Failed to send email" };
  }
}
