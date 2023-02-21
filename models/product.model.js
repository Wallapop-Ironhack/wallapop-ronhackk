const mongoose = require("mongoose");

const schemaProduct = new mongoose.Schema (
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,  
            ref: 'User',          
            required: [true, "user is required"],
        },
        image: { type: String },

        price: {
            type: String,
            required: [true, "price is required"],
        },

        title: {
            type: String,
            required: [true, "title is required"],
        },

        description: {
            type: String,
            required: [true, "description is required"],
        },

        category: {
            type: String,
            required: [true, "title is required"],
            enum: ["fashion", "vehicle", "electronic"],

        }
        
    },

    { timestamps: true }
);

module.exports = mongoose.model("Product", schemaProduct);