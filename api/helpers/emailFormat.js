const { sendMail } = require("../helpers/sendEmail");

/**
 * send email when creating account with credentials
 * @param {*} sendTo senders email
 * @param {*} name name of the sender
 * @param {*} password new password
 */
const sendNewPasswordEmail = async (sendTo, name, password) => {
  try {
    const output = `
        <h2>Hi ${name},</h2>
        <h3></h3>
        <p>Thanks for joining with us. You can find your user name and password below.</>
        <ul> 
          <li>username: ${sendTo}</li>
          <li>password: ${password}</li>
        </ul>
        <p>Thank you,<br> SMS</p>
      `;

    const subject = "New account credentials";
    sendMail(sendTo, subject, output).catch(console.error);
  } catch (error) {
    console.log(error);
  }
};

const sendStudentCredentials = async (
  sendTo,
  name,
  addmissionNumber,
  password
) => {
  try {
    const output = `
        <h2>Hi ${name},</h2>
        <h3></h3>
        <p>Thanks for joining with us. You can find your child's user name and password below.</>
        <ul> 
          <li>username: ${addmissionNumber}</li>
          <li>password: ${password}</li>
        </ul>
        <p>Thank you,<br> SMS</p>
      `;

    const subject = "New account credentials";
    sendMail(sendTo, subject, output).catch(console.error);
  } catch (error) {
    console.log(error);
  }
};

const sendUserProfileUpdateEmail = async (sendTo, name) => {
  try {
    const output = `
        <h2>Hi ${name},</h2>
        <h3></h3>
        <p>Your profile sucessfully updated.</>
        <p>Thank you,<br> SMS</p>
      `;

    const subject = "New account credentials";
    sendMail(sendTo, subject, output).catch(console.error);
  } catch (error) {
    console.log(error);
  }
};

module.exports.sendNewPasswordEmail = sendNewPasswordEmail;
module.exports.sendStudentCredentials = sendStudentCredentials;
module.exports.sendUserProfileUpdateEmail = sendUserProfileUpdateEmail;
