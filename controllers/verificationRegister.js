const jwt = require("jsonwebtoken");
const {
  register_otp_model,
  Users_Register_model,
} = require("../middleware/db/userScema");
const { res_success_handller, res_error_handller } = require("../service/response_handler");
const { jsonKey } = require("../service/secreate");
const { tokenCreate } = require("../service/jsonwebToken");

const verificationRegister = async (req, res, next) => {

  


  try {
    const { token = "", otp = "", email } = req.body;

    await register_otp_model.deleteMany({
      expireAt: { $lt: Date.now() },
    }); //ডিলিট এক্সপাইর হওয়া ওটিপি

    const option =
      otp == "" ? { "payload.email": email } : { "payload.email": email, otp }; //  অপশন তৈরি ( সার্চ করার জন্যে )
    const alreadyUser = await Users_Register_model.findOne({ email }); // ইউজার আগে থেকেই রেজিস্টার কিনা খুজে বের করা

    if (alreadyUser) {
      next(new Error("you are already register please log in")); // ইউজার আগে থেকেই থাকলে ইরর
      return;
    }

    const user = await register_otp_model.findOne(option); // অপশন দিয়ে ইউজার এর ডাটা পাওয়া

    try {
      if (option["otp"]) {
        if (!user) {
          next(new Error("user not register or incorrect otp"));
          return;
        } // ওটিপি বা ইমেইল খুজে না পেলে ইরর
        if (user.otp === otp) {
          await Users_Register_model(user.payload)
            .save()
            .then(async () => {
              await register_otp_model.deleteOne(option); // ইউজার েএর ওটিপি ডাটা ডিলিট ( ইউজার সাকসেস রেজিস্সটার )
              const token = await tokenCreate({ user }, jsonKey, "1d");
              try {
                res.cookie("isLogin", token );
            
               } catch (error) {
                res_error_handller(res,{message:error.message})
                console.log("cookie not set error " + error.message);
                
                return
               }
              res_success_handller(res, {
                message: "User Registered Successfully",
              });
              return;
            });
        } else {
          res_success_handller(res, "Invalid OTP band alert");
        }
      } else {
        const result = await jwt.verify(token.split("aisrlvsjs")[0], jsonKey);
        await Users_Register_model(result.payload)
          .save()
          .then(async () => {
            await register_otp_model.deleteOne(option);
            const token = await tokenCreate({ user }, jsonKey, "1d");
              try {
                res.cookie("isLogin", token );
            
               } catch (error) {
                res_error_handller(res,{message:error.message})
                console.log("cookie not set error " + error.message);
                
                return
               }
            res_success_handller(res, {
              message: "User Registered Successfully",
            });
            return;
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
