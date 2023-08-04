// const mongoose = require("mongoose");

import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true},
//     description: { type: String, required: true },
//     made: { type: String, required: true },
//     features: { type: Array, required: true },
//     ProductType: { type: String, required: true },
//     price: { type: String, required: true },
//     brand: { type: String, required: true },
//     images: { type: Array, required: true },
//     sizes: { type: Array, required: true },
//     stock: { type: Number, required: true },
//     colors: { type: Array, required: true },
// });

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    price: {type: Number, required: true}
})

export const Product = mongoose.model("products", productSchema, "products")

// module.exports = product;