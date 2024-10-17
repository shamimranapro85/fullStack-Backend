const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const registerScema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 31,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  verfiyed: {
    type: String,
    default: false,
  },
  password: {
    type: String,
    required: true,
    set: (password) => bcrypt.hashSync(password, 8),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBan: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Users_Register_model = mongoose.model(
  "Users_Register_model",
  registerScema
);

// =========================================================
const register_otp_scema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  payload: {
    type: Object,
    required: true,
  },
  expireAt: {
    type: Date,
    default: () => new Date(Date.now() + 60000),
  },
});
const register_otp_model = mongoose.model(
  "register_otp_model",
  register_otp_scema
);

module.exports = { Users_Register_model, register_otp_model };
