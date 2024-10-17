const {
  Users_Register_model,
  register_otp_model,
} = require("../middleware/db/userScema");
const { user_dami_data } = require("../models/user dami data");
const { tokenCreate } = require("../service/jsonwebToken");
const { sendEmailler } = require("../service/node_mailer");

const {
  res_success_handller,
  res_error_handller,
} = require("../service/response_handler");
const { jsonKey, mainURL } = require("../service/secreate");

// =============================================================================
const register_for_verify = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const expire = await register_otp_model.deleteMany({
      expireAt: { $lt: Date.now() },
    });

    const alreadyUser = await Users_Register_model.findOne({
      email,
    });

    if (alreadyUser) {
      next(new Error("email alredy registered"));
      return;
    }

    const user = await register_otp_model.findOne({ "payload.email": email });
    exprited_second = Math.floor((Number(user?.expireAt) - Date.now()) / 1000);

    if (!user?.payload.email) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      let newUser = {
        otp,
        payload: { name, email, password },
      };
      let token = "";
      try {
        token = await tokenCreate(newUser, jsonKey, "1m");
      } catch (error) {
        console.log("ths is token err ", error);
      }

      await new register_otp_model(newUser).save();

      html = `
     <h1><strong>Verify or get OTP</strong></h1>
    <form action="${mainURL}/user/verification/register" method="post">
      <input type="text" value="${token}" name="token" style="display: none" />
      <input type="text" value="${email}" name="email" style="display: none" />
      <h1><strong>${otp}</strong></h1>
      
      <button
        style="
          padding: 10px;
          border: none;
          border-radius: 20px;
          text-decoration: capitalize;
          background: green;
          color: white;
        "
        type="submit"
      >
        Verify
      </button>
    </form>
    `;

      // otp email sending ===========================================
      try {
        await sendEmailler({ email, html }).then(() =>
          console.log("email sended")
        );
        // console.log(email,token);
      } catch (error) {
        console.log("email sent err : ", error);

        res_error_handller(res, {
          status_code: error.status,
          message: error.message,
        });
      }

      res_success_handller(res, {
        payLoad: newUser.payload,
        message: "user sended otp successfully check email",
      });
    } else {
      res_success_handller(res, {
        message: `already sent otp try again after ${exprited_second} second`,
        payLoad: { err: true },
      });
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
};
module.exports = { register_for_verify };
