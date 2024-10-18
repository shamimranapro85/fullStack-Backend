 require("dotenv").config()



 const port = process.env.port
 const jsonKey = process.env.jsonWEbToken
 const mainURL = process.env.mainUrl
 const mongoConnect_URI  = process.env.mongoConnect_URI
 const Uri  = process.env.mongoConnect_URI
 


 module.exports = { port , jsonKey,mainURL, mongoConnect_URI}