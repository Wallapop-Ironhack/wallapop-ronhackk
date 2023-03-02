const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ADMIN_USERS = (process.env.ADMIN_USERS || 'admin@example.org')
  .split(',')
  .map(email => email.trim())

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      equired: [true, "name is required"]
    },
    email: {
      type: String,
      required: [true, "email is required"],
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "min length: 8"],
    },
    role: {
      type: String,
      enum: ['admin', 'guest'],
      default: 'guest'
    }
  },
  { timestamps: true }
);

schema.pre("save", function (next) {
  const user = this;

  if (ADMIN_USERS.includes(user.email)) {
    user.role = 'admin';
  }

  if (user.isModified("password")) {
    bcrypt
      .hash(user.password, 10)
      .then((encryptedPassword) => {
        user.password = encryptedPassword;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

module.exports = mongoose.model("User", schema);