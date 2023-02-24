const Chat = require('../models/chat.model')
const Message = require('../models/message.model')
module.exports.doCreate = (req, res, next) => {
    const newChat = new Chat({ users: [req.params.id, req.user.id]})
    Chat.find({ users: { $all: [req.params.id, req.user.id]}})
        .then(chat => {
            if (chat.length) {
                res.redirect(`/user-profile/chat/${chat[0].id}`)
            } else {
                return newChat.save()
                    .then(chat => res.redirect(`/user-profile/chat/${chat.id}`))
            }
        })
        .catch(next)
}