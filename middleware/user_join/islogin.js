const { tokenverify } = require("../../service/jsonwebToken");
const { res_success_handller } = require("../../service/response_handler");
const { jsonKey } = require("../../service/secreate");
const { Users_Register_model } = require("../db/userScema");

const isLogin_cmponents = async (req, res, next) => {
  try {
    const { token = "" } = req.body;

    const tokenArray = token?.split("aisrlvsjs");

    const data = await tokenverify(tokenArray[0], jsonKey);

    if (Boolean(data.user?.email)) {
      console.log("test");

      dbUser = await Users_Register_model.findOne(
        { email: data.user.email },
        { password: 0 }
      );
      if (dbUser) {
        res_success_handller(res, {
          message: "already login",
          payLoad: dbUser,
        });
        return;
      } else {
        res_success_handller(res, { message: "expired login" });
        return;
      }
    } else {
      next();
    }
  } catch (error) {
    console.log("isLogin faild erorr:" + error);
  }
};

module.exports = { isLogin_cmponents };
