const Message = require("../models/message.model")
// GET /users/:id/chat
module.exports.list = (req, res, next) => {
    Message.find({
        $or: [
            { from: req.user._id, to: req.params.id },
            { to: req.user._id, from: req.params.id }
        ]
    })
    .populate('from')
    .populate('to')
    .then((messages) => {
        res.render('messages/chat', {
            messages,
            to: req.params.id
        })
    })
    .catch(next)
}
module.exports.doCreate = (req, res, next) => {
    Message.create({
        from: req.user.id,
        to: req.params.id,
        message: req.body.message
    }).then(message => {
        res.redirect(`/users/${req.params.id}/chat`)
    })
}