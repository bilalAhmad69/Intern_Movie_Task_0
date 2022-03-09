const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MYEMAIL,
    pass: process.env.PASSWORD,
  },
});

module.exports = mailSender = async (recieverEmail, subject, text) => {
  const mailOption = {
    from: process.env.MYEMAIL,
    to: recieverEmail,
    subject: subject,
    text: text,
  };
  try {
    await transporter.sendMail(mailOption);
    return "Message Sent";
  } catch (e) {
    return e.message;
  }
};
