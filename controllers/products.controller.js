const Products = require("../models/product.model");
const mongoose = require("mongoose");
const User = require("../models/user.model");

module.exports.list = (req, res, next) => {
  const { lat, lng, search, user } = req.query;
  const criterial = {};

  if (user) {
    criterial.user = user;
  }

  if (search) {
    criterial.title = new RegExp(search);
  }

  
  if (lat && lng) {
    criterial.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: 100000
      }
    }
  }

  Products.find(criterial)
    .populate('user')
    .sort({ createdAt: req.query.sort || "desc" })
    .then((products) => {
      res.render("products/list", { products });
    })
    .catch(next)
};

module.exports.detail = (req, res, next) => {
  Products.findById(req.params.id)
    .populate('user')
    .then((product) => res.render("products/detail", { product }))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  res.render("products/new");
};

module.exports.doCreate = (req, res, next) => {

  const { lat, lng } = req.body;

  const product = req.body;
  product.user = req.user.id;

  if (req.file) {
    product.image = req.file.path;
  }

  if (lat && lng) {
    product.location = {
      type: 'Point',
      coordinates: [lng, lat]
    }
  }

  Products.create(product)
    .then(() => {
      res.redirect("/products");
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.render("products/new", { errors: err.errors, product: req.body });
      } else {
        next(err);
      }
    });
}


module.exports.update = (req, res, next) => {
  Products.findById(req.params.id)
    .then((product) => {
      res.render("products/update", { product });
    })
    .catch(next);
}

module.exports.doUpdate = (req, res, next) => {
  Products.findByIdAndUpdate(req.params.id, req.body,)
    .then((product) => {
      res.redirect("/products");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("products/update", { errors: error.errors, product: req.body });
      } else {
        next(error);
      }
    })
}

module.exports.delete = (req, res, next) => {
  Products.findById(req.params.id)
    .then(product => {
      if (!product) {
        res.redirect("/products")
      } else if (product.user == req.user.id) {
        console.log('deleting product');
        product.delete()
          .then(() => res.redirect("/products"))
          .catch(next)
      } else {
        res.redirect("/products")
      }
    })
    .catch(next);
}


