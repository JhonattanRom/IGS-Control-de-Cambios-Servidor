const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "kollon01@gmail.com", // generated ethereal user
      pass: "Obtenerayuda1" // generated ethereal password
    }
  });
module.exports = transporter;