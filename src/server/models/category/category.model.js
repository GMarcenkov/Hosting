const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
      slug:{
          type: String,
          required: true,
          unique: true,
          trim: true,
          minlength: 3
      },
    parent_id: {
      type: String,
      trim: true
    },
    subcategory: []
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Category", categorySchema);

module.exports = Product;
