require("dotenv").config();
const { app } = require("./app");
const { port } = require("./service/secreate");

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
