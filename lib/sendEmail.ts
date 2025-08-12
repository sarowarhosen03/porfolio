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
      host: process.env.EMAIL_SMTP,
      port: parseInt(process.env.EMAIL_PORT || "465"),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });


    
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
      from: `"${contactState.name}" <portfolio@sarowar.dev>`,
      to: "hi@sarowar.dev",
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
    


    // Auto-reply to the sender
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Thanks for reaching out</title>
        </head>
        <body style="margin:0;padding:0;background:#f8f9fa;font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;color:#333;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center" style="padding:24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.08);">
                  <tr>
                    <td style="padding:28px 24px;text-align:center;background:linear-gradient(135deg,rgb(12,125,33) 0%, rgb(11,66,5) 100%);color:#fff;">
                      <div style="font-size:22px;font-weight:700;">Thanks for reaching out, ${contactState.name}!</div>
                      <div style="opacity:0.9;margin-top:6px;font-size:14px;">We've received your message and will get back to you soon.</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px 24px 6px 24px;">
                      <div style="font-size:16px;margin-bottom:8px;">Hi ${contactState.name},</div>
                      <div style="font-size:14px;line-height:1.7;color:#555;">
                        Thanks for contacting me via my portfolio. I usually reply within 24–48 hours.
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 24px;">
                      <div style="font-weight:600;margin-bottom:8px;color:#333;">Your message</div>
                      <div style="background:#f8f9fa;border-left:4px solid #28a745;padding:12px 14px;border-radius:6px;white-space:pre-wrap;color:#555;">
                        ${contactState.message}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 24px 24px 24px;color:#6c757d;font-size:12px;border-top:1px solid #e9ecef;">
                      This is an automated acknowledgement from my portfolio. If you need to follow up, reply to this email.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const autoReplyOptions = {
      from: `"Sarowar Hossain" <hi@sarowar.dev>`,
      to: contactState.email,
      replyTo: "hi@sarowar.dev",
      subject: `Re: ${contactState.subject}`,
      text: `Hi ${contactState.name},\n\nThanks for reaching out! I've received your message and will reply within 24–48 hours.\n\nYour message:\n${contactState.message}\n\n— Sarowar`,
      html: autoReplyHtml,
    };

    await Promise.all([transporter.sendMail(mailOptions), transporter.sendMail(autoReplyOptions)]);

    return { success: true, message: "Email sent successfully" };
  } catch (e) {
    console.error("Email sending error:", e);
    return { success: false, message: "Failed to send email" };
  }
}
