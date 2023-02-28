const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")

module.exports.create = (req, res) => {
  res.render("users/new");
}

/*module.exports.doCreate = (req, res, next) => {
  User.create(req.body)
    .then((user) => res.redirect("/login"))
    .catch(next)
} */

module.exports.doCreate = (req, res, next) => {

  function renderWithErrors(errors) {
    res.render('users/new', { errors, user: req.body });
  }

  delete req.body.role;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        renderWithErrors({ email: 'email already registered' })
      } else {
        return User.create(req.body)
          .then(() => res.redirect('/login'))
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors)
      } else {
        next(error);
      }
    })
};


module.exports.login = (req, res) => {
  res.render("users/login");
}

const sessions = {};

module.exports.doLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((ok) => {
          if (ok) {
            req.session.userId = user.id;
            res.redirect("/products");
          }
        })
        .catch(next);
    })
    .catch(next);
};



module.exports.logout = (req, res, next) => {
  req.session.destroy()
  res.redirect("/login");
};