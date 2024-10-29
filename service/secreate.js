 require("dotenv").config()



 const port = process.env.port
 const jsonKey = process.env.jsonWEbToken
 const mainURL = process.env.mainUrl
//  const FrontEndUrl = process.env.FrontEndUrl
 const FrontEndUrl = "http://localhost:3000"
 const mongoConnect_URI  = process.env.mongoConnect_URI
 const Uri  = process.env.mongoConnect_URI



 


 module.exports = { port , jsonKey,mainURL, mongoConnect_URI, FrontEndUrl}