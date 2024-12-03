import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net", // Outgoing server
  port: 465,
  secure: true,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

const sendMail = async ({ email, subject, body }) => {
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: subject,
    html: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw the error so it can be caught by the calling function
  }
};

export { sendMail };
