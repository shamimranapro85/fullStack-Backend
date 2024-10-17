 require("dotenv").config()



 const port = process.env.port
 const jsonKey = process.env.jsonWEbToken
 const mainURL = process.env.mainUrl


 module.exports = { port , jsonKey,mainURL}