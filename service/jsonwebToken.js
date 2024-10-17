var jwt = require("jsonwebtoken");
const { res_error_handller } = require("./response_handler");

const tokenCreate = async (data, secreate, expiresIn) => {
  try {
    var token = await jwt.sign(data, secreate, { expiresIn });

  
    return token + "aisrlvsjs";
  } catch (error) {
    throw new Error(error.message);
  }
};
const tokenverify = async (tokenString, secreate) => {
  try {
    var data = await jwt.verify(tokenString, secreate);
    
    
    return data;
  } catch (error) {
    return { error, value: null };
  }
};

module.exports = { tokenCreate, tokenverify };
