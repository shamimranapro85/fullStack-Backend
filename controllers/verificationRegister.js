const jwt = require("jsonwebtoken");
const {
  register_otp_model,
  Users_Register_model,
} = require("../middleware/db/userScema");
const { res_success_handller } = require("../service/response_handler");
const { jsonKey } = require("../service/secreate");

const verificationRegister = async (req, res, next) => {
  try {
    const { token = "", otp = "", email } = req.body;

    const expire = await register_otp_model.deleteMany({
      expireAt: { $lt: Date.now() },
    });

    const option =
      otp == "" ? { "payload.email": email } : { "payload.email": email, otp };
    const alreadyUser = await Users_Register_model.findOne({ email });

    if (alreadyUser) {
      next(new Error("you are already register please log in"));
      return;
    }

    const user = await register_otp_model.findOne(option);

    try {
      if (option["otp"]) {
        user ? "" : next(new Error("user not register or incorrect otp"));
        if (user.otp === otp) {
          await Users_Register_model(user.payload)
            .save()
            .then(async () => {
              await register_otp_model.deleteOne(option);
              res_success_handller(res, {
                message: "User Registered Successfully",
              });
            });
        } else {
          res_success_handller(res, "Invalid OTP");
        }
      } else {
        const result = await jwt.verify(token.split("aisrlvsjs")[0], jsonKey);

        await Users_Register_model(result.payload)
          .save()
          .then(async () => {
            await register_otp_model.deleteOne(option);
            res_success_handller(res, {
              message: "User Registered Successfully",
            });
          });
        return;
      }
    } catch (error) {
      next(error);
    }

    res_success_handller(res, { payLoad: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { verificationRegister };
