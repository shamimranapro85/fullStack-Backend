const { body } = require("express-validator");
const { login } = require("../controllers/login");
const {
  user_join_controller,
  register_for_verify,
} = require("../controllers/register_for_verify");
const { user_reset } = require("../controllers/user_reset");
const { verificationRegister } = require("../controllers/verificationRegister");
const {
  Users_Register_model,
  register_otp_model,
} = require("../middleware/db/userScema");
const { isLogin } = require("../middleware/user_join/islogin");
const {
  validateLogin,
  runvalidation,
} = require("../service/express_validation_register_data");
const {
  res_error_handller,
  res_success_handller,
} = require("../service/response_handler");

const User_join_router = require("express").Router();

const LogOut = (req, res) => {
  try {
    res.clearCookie("isLogin");
    res.send("success");
    return;
  } catch (error) {
    console.log(error);

    res_error_handller(res);
    return;
  }
};
//  ========================/user==============================
User_join_router.get("/reset", user_reset);
User_join_router.post(
  "/register/otp",
  validateLogin,
  runvalidation,
  register_for_verify
); // রেজিস্টার .................--------------------------------------------------------------------------------
User_join_router.post("/verification/register", verificationRegister); // ওটিপি দিয়ে ভেরিফিক্যাশন.................--------------------------------------------------------------------------------
User_join_router.post("/login", isLogin, login); // লগিন.................--------------------------------------------------------------------------------
User_join_router.get("/logout", LogOut); // লগিন.................--------------------------------------------------------------------------------

// User_join_router.get("/token", tokenSaveCookie);
User_join_router.get("/cookie", (req, res) => {
  res.cookie("cookie", "cookieValue", {
    credentials:true,
    domain: "http://localhost:3000",
    expires: Date.now()
  });
  console.log("success");
  
  res.json({
    name: "success"
  })
});

module.exports = { User_join_router };
