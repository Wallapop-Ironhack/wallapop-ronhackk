const Product = require("../models/product.model")
module.exports.home = (req, res) => {
    res.render('common/home');
};

module.exports.search = (req, res, next) => {
    const criterial = {} 

    if (req.query.search) {
        criterial.category = req.query.search;
    }

    Product.find(criterial)
    .then((products) => res.render("products/list", { products })) 
    .catch(next)
}
