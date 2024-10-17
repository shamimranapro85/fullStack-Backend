const { Users_Register_model } = require("../middleware/db/userScema");
const { user_dami_data } = require("../models/user dami data");
const { res_success_handller } = require("../service/response_handler");
const user_reset = async (req, res) => {
  try {
    const delete_result = await Users_Register_model.deleteMany({});
    const resultMessage = await Users_Register_model.insertMany(user_dami_data);
    res_success_handller(res, {
      status_code: 201,
      message: "user reset",
      payLoad: resultMessage,
    });
  } catch (error) {
    throw error;
  }
};
module.exports = { user_reset };
