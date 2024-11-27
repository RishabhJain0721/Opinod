import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net", // Outgoing server
  port: 465,
  secure: true,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

const sendVerificationMail = async (verificationToken, email, username) => {
  const baseUrl = process.env.BASE_URL;
  const verificationLink = `${baseUrl}/verify-email?token=${verificationToken}`;
  let status = false;

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: "Verify Your Email for Opinod.com",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <p>Hello ${username}</p>
        <p>Welcome to <a href="https://opinod.com">opinod.com</a> - where genuine opinions matter.</p>
        <p>To verify your email, please click the link below:</p>
        <p>
          <a href="${verificationLink}" target="_blank" 
             style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">
            Verify Email Address
          </a>
        </p>
        <p>If you didn’t sign up, please ignore this email.</p>
        <p>Thank you,<br>The Opinod Team</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    status = true;
  } catch (error) {
    console.error("Error sending email:", error);
  }

  return status;
};

export { sendVerificationMail };
