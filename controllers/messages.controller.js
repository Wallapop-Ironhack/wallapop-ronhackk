const Message = require("../models/message.model")
// GET /products/:id/users/:ûserId/chat
module.exports.list = (req, res, next) => {
  Message.find({
    product: req.params.id,
    user: req.params.userId
  })
    .then((messages) => {
      res.render('messages/chat', { messages })
    })
    .catch(next)
}
module.exports.doCreate = (req, res, next) => {
  Message.create({
    product: req.params.id,
    user: req.params.userId,
    message: req.body.message,
    author: req.user.id,
  })
    .then(message => {
      res.redirect(`/products/${message.product}/users/${message.user}/chat`)
    })
    .catch(next)
}