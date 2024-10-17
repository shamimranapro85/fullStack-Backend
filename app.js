const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");
const {
  res_error_handller,
  res_success_handller,
} = require("./service/response_handler");
const { default: mongoose } = require("mongoose");
const { User_join_router } = require("./router/user_join_router");

// -----------------------------------------------------
// -----------------------------------------------------
const winston = require("winston");


winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
// -----------------------------------------------------
// -----------------------------------------------------

app.use(morgan("tiny"));
app.use(cors({origin:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// db connection =======================================================================
app.use(async (rq, rs, next) => {
  console.log(rq.body);
  
  await mongoose.connect("mongodb://localhost:27017/userDatabase_sherpur");
  console.log("db is connected");
  next();
});
// routing=======================================================================

app.get("/", (req, res) => {
  res_success_handller(res, { message: " I AM HOME ROUTER ..." });
});
app.use("/user", User_join_router);

// error handle client(404) or server(500)=======================================================================
app.use((req, res, next) => {
  let error = new Error("router not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res_error_handller(res, { status_code: err.status, message: err.message });
  return
});

module.exports = { app };
