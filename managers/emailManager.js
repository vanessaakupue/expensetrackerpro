const nodemailer = require("nodemailer");

const emailManager = async (to, text, html, subject) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d7d7a81d66564c",
      pass: "01df19f6ea0b0f",
    },
  });

  await transport.sendMail({
    to: to,
    from: "info@expensetrackerpro.com", //you can change this to be dynamic and add it to the parameters above
    text: text,
    html: html,
    subject: subject,
  });
};

module.exports = emailManager;
