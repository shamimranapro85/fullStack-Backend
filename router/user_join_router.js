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
const { res_error_handller } = require("../service/response_handler");

const User_join_router = require("express").Router();

//  ========================/user==============================
User_join_router.get("/reset", user_reset);
User_join_router.post(
  "/register/otp",
 validateLogin,
  runvalidation,
  register_for_verify 
);
User_join_router.post("/verification/register", verificationRegister);
User_join_router.post("/login", isLogin, login);
User_join_router.get("/test", async (req, res) => {
  const result = await register_otp_model.deleteMany({});
  const result1 = await Users_Register_model.deleteMany({});
  res.json({ result, result1 });
  // const {token} = req.body
  // res.json(token)
});

module.exports = { User_join_router };
