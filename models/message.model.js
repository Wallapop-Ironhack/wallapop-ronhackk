const mongoose = require("mongoose");
const schemaMessage = new mongoose.Schema (
    {
        message:{
            type: String
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
       },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        // product: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Product'
        // }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Message", schemaMessage);