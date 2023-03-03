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
        // req.user.id es 2
        // messages [{ from: {id:1}, to:{id:2},{ from:{ id:1}, to:{id:2}}, { from:{ id:3 }, to:{ id:2 }]
        // quiero [{id:1}, {id:3}]
        //const users = []
        //users = messages.filter((item, index) => (messages.indexOf(item) === index))
        res.render("messages/buzon", { messages });
    })
    .catch(next)
}