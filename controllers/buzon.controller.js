const Message = require("../models/message.model")
const User = require('../models/user.model')
// GET /users/:id/chat
/*module.exports.list = (req, res, next) => {
    Message.find({
        $or: [
            { from: req.user._id, to: req.params.id },
            { to: req.user._id, from: req.params.id }
        ]
    })
    .populate('from')
    .populate('to')
    .then((messages) => {
        res.render('messages/buzon', {
            messages,
            to: req.params.id
        })
    })
    .catch(next)
} */
module.exports.list = (req, res, next) => {
    Message.find({
        $or: [
            { from: req.user.id },
            { to: req.user.id }
        ]
    })
    .populate('from')
    .populate('to')
    .then((messages) => {
        const users = []
        messages.forEach(message => {
            const currentIds = users.map(u => u.id)
            if (!currentIds.includes(message.from.id)) {
                users.push(message.from)
            }
            if (!currentIds.includes(message.to.id)) {
                users.push(message.to)
            }
        })
        res.render("messages/buzon", { users });
    })
    .catch(next)
}