const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    minlength: [3, "A name must have 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Your password must contain atleast 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please fill up the password confirm field"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message:
        "Both passwords are not the same , please fill passwords correctly",
    },
    select: false,
  },
  age: {
    type: Number,
    minlength: [
      14,
      "Your age should be greater or equal than 14 in order to use this application",
    ],
    required: [true, "Please fill up your age field"],
  },
  weight: {
    type: Number,
    required: [true, "Please provide your weight"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "You can choose either of male, female or other",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.comparePasswords = async (
  requestedPassword,
  existedPassword
) => {
  return await bcrypt.compare(requestedPassword, existedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
