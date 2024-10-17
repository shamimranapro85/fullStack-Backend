const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "mdshamimrana20@gmail.com",
    pass: "yyjf hicp mxod vums",
  },
});

const sendEmailler = async ({
  email = "shamimranaprofessional@gmail.com",
  html = `<h1>your otp</h1>
  `,
  subject = "hellow",
}) => {
  try {
    await transporter.sendMail({
      from: '"shamim your server" <maddison53@ethereal.email>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: "welcome our site", // plain text body
      html: `${html}`, // html body
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmailler };
