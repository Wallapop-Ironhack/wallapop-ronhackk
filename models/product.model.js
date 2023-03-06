const mongoose = require("mongoose");

const schemaProduct = new mongoose.Schema(
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
      lowercase: true,
    },

    description: {
      type: String,
      required: [true, "description is required"],
    },

    category: {
      type: String,
      required: [true, "title is required"],
      enum: ["fashion", "vehicle", "electronic", "music and books", "bikes", "phones", "homeware"],

    },

    likes: { 
        type: Number,
        default: 0 
    },

    address: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      }
    }
  },

  { timestamps: true }
);

schemaProduct.index({ location: '2dsphere' });

module.exports = mongoose.model("Product", schemaProduct);