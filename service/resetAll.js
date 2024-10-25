const { register_otp_model, Users_Register_model } = require("../middleware/db/userScema");

const FullControlRouter = require("express").Router()
const resetAll = ()=>{
    
}


FullControlRouter.get("/reset", async (req, res) => {
    const result = await register_otp_model.deleteMany({});
    const result1 = await Users_Register_model.deleteMany({});
    res.json({ result, result1 });
    // const {token} = req.body
    // res.json(token)
  });


module.exports = { 
    FullControlRouter
}