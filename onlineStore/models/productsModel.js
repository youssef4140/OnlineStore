import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true},
//     description: { type: String, required: true },
//     made: { type: String, required: true },
//     features: { type: Array, required: true },
//     ProductType: { type: String, required: true },
//     price: { type: Number, required: true },
//     brand: { type: String, required: true },
//     images: { type: Array, required: true },
//     colors: { type: Array, required: true },
//     sizes: { type: Array, required: true },
//     stock: { type: Number, required: true },
// });

const productSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { 
        rate: Number,
        count: Number 
     }
});

const product = mongoose.model("product", productSchema);

export default product;