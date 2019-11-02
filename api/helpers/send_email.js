const nodemailer = require("nodemailer");

exports.sendMail = function(req, res, next) {
  const transporter = nodeMailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, //true for 465 port, false for other ports
    auth: {
      user: "ishara11rathnayake@gmail.com",
      pass: "930713058ish"
    }
  });
  const mailOptions = {
    from: '"Ishara Rathnayake" ishara11rathnayake@gmail.com', // sender address
    to: "sandalukalpanee@gmail.com", // list of receivers
    subject: "Hello ", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).send({ success: false });
    } else {
      next();
    }
  });
};
