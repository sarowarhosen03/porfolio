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
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    console.log(contactState.email);
    
    // Create beautiful HTML email template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f8f9fa;
            padding: 20px;
          }
          .email-container {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg,rgb(12, 125, 33) 0%,rgb(11, 66, 5) 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
          }
          .content {
            padding: 40px 30px;
          }
          .sender-info {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            border-left: 4px solidrgb(15, 138, 42);
          }
          .sender-info h3 {
            margin: 0 0 15px 0;
            color:rgb(29, 152, 70);
            font-size: 18px;
          }
          .info-row {
            display: flex;
            margin-bottom: 10px;
            align-items: center;
          }
          .info-label {
            font-weight: 600;
            min-width: 80px;
            color: #555;
          }
          .info-value {
            color: #333;
            margin-left: 10px;
          }
          .message-section {
            background-color: #ffffff;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 25px;
          }
          .message-section h3 {
            margin: 0 0 20px 0;
            color: #333;
            font-size: 20px;
          }
          .message-content {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #28a745;
            white-space: pre-wrap;
            line-height: 1.8;
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
            font-size: 14px;
          }
          .timestamp {
            color:rgb(22, 136, 19);
            font-size: 12px;
            text-align: center;
            margin-top: 20px;
          }
          @media (max-width: 600px) {
            body {
              padding: 10px;
            }
            .header, .content {
              padding: 20px;
            }
            .info-row {
              flex-direction: column;
              align-items: flex-start;
            }
            .info-value {
              margin-left: 0;
              margin-top: 5px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>📧 New Contact Message</h1>
            <p>You have received a new message from your portfolio website</p>
          </div>
          
          <div class="content">
            <div class="sender-info">
              <h3>👤 Sender Information</h3>
              <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">${contactState.name}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">
                  <a href="mailto:${contactState.email}" style="color:rgb(32, 192, 59); text-decoration: none;">
                    ${contactState.email}
                  </a>
                </span>
              </div>
              <div class="info-row">
                <span class="info-label">Subject:</span>
                <span class="info-value">${contactState.subject}</span>
              </div>
            </div>
            
            <div class="message-section">
              <h3>💬 Message</h3>
              <div class="message-content">${contactState.message}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This message was sent from your portfolio contact form</p>
            <p>Reply directly to this email to respond to ${contactState.name}</p>
          </div>
        </div>
        
        <div class="timestamp">
          Sent on ${new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          })}
        </div>
      </body>
      </html>
    `;
    
    const mailOptions = {
      from: `"${contactState.name}" <${contactState.email}>`,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${contactState.subject}`,
      text: `
        New contact message from your portfolio:
        
        Name: ${contactState.name}
        Email: ${contactState.email}
        Subject: ${contactState.subject}
        
        Message:
        ${contactState.message}
        
        Sent on: ${new Date().toLocaleString()}
      `,
      html: htmlTemplate,
    };
    
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully" };
  } catch (e) {
    console.error("Email sending error:", e);
    return { success: false, message: "Failed to send email" };
  }
}
