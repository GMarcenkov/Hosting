const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      minlength: 3
    },
    password: {
      type: String,
      trim: true,
      minlength: 3
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    secondName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    familyName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      minlength: 3
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
      minlength: 3
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    schoolYears: {
      type: Array
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
