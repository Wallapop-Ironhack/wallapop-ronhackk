const mongoose = require("mongoose");
const schemaMessage = new mongoose.Schema (
    {
        message:{ type: String },
        product:{type: mongoose.Schema.Types.ObjectId,
              ref: 'Product'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
       },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Message", schemaMessage);