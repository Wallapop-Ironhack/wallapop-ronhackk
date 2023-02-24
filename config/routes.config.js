const express = require("express");

const common = require("../controllers/common.controller");
const products = require("../controllers/products.controller");
const users = require("../controllers/users.controller");
const secure = require("../middlewares/secure.mid");
const chat = require("../controllers/chat.controller");

const router = express.Router();


router.get("/", common.home),
router.get("/category-search", common.search);

router.get("/users/new", users.create);
router.post("/users", users.doCreate);



router.get("/login", users.login);
router.post("/login", users.doLogin);
router.post("/logout", users.logout);


router.get("/products", products.list);

router.get("/products/new", secure.isAuthenticated, products.create);
router.post("/products", secure.isAuthenticated, products.doCreate);

router.get("/products/:id", products.detail);
router.get("/products/:id/update", secure.isAuthenticated, products.update);
router.post("/products/:id", secure.isAuthenticated, products.doUpdate);
router.post("/products/:id/delete", secure.isAuthenticated, products.delete);

//router.post('/user-profile/chat/:id',secure.isAuthenticated, chat.doCreate)

module.exports = router;