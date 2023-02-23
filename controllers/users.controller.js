const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")

module.exports.create = (req, res) => {
  res.render("users/new");
}

module.exports.doCreate = (req, res, next) => {
  User.create(req.body)
    .then((user) => res.redirect("/login"))
    .catch(next)
}

/*   User.create(req.body)
     .then(() => {
       res.redirect("/login");
     })
     .catch((err) => {
       if (err instanceof mongoose.Error.ValidationError) {
        res.render("users/new", { error: err.errors, user: req.body}); 
       } else {
         next(err);
       }
     });   */


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
}