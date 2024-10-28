const bcryptjs = require("bcryptjs");
const { Users_Register_model } = require("../middleware/db/userScema");
const { tokenCreate, tokenverify } = require("../service/jsonwebToken");
const {
  res_success_handller,
  res_error_handller,
} = require("../service/response_handler");
const { jsonKey } = require("../service/secreate");
// =================================/login==================================
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users_Register_model.findOne({email}) 

    if (user) {
      const isMatch = await bcryptjs.compare(password, user.password);
      
      if (isMatch) {
        const token = await tokenCreate({ user }, jsonKey, "1d");

        res.cookie("isLogin", token, {
          httpOnly: true,
          sameSite: "None",
          domain: "localhost",
          maxAge: 24 * 60 * 60 * 1000,
          credentials: true,
        });
        console.log("shamim");

        console.log(email);

        return res_success_handller(res, {
          message: "username and password successfully match",
          payLoad: token,
        });
      } else {
        return res_error_handller(res, {
          status_code: 404,
          message: "incorrect password try again latter",
        });
      }
    } else {
    

      return res_error_handller(res, {
        status_code: 404,
        message: "email not found please register now",
      });
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
};

module.exports = { login };
