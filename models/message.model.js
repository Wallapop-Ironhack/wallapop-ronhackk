const mongoose = require("mongoose");
const schemaMessage = new mongoose.Schema (
    {
        message:{ type: String },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
       },
       chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
       }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Message", schemaMessage);