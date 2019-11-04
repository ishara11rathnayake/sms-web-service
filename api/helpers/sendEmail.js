const nodemailer = require("nodemailer");

/**
 * sending mails
 * @param {*} sendingTo senders mail address
 * @param {*} subject subject of the email
 * @param {*} output mail body format
 */
const sendMail = async (sendingTo, subject, output) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dream11crusher@gmail.com",
        pass: "930713058Ish"
      }
    });

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: "dream11crusher@gmail.com",
    //     pass: "930713058Ish"
    //   }
    // });

    let info = await transporter.sendMail({
      from: '"Ishara Rathnayake" <noreply.dream11crusher@gmail.com>',
      replyTo: "noreply.dream11crusher@gmail.com",
      to: sendingTo,
      subject: subject,
      html: output
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
};

module.exports.sendMail = sendMail;
