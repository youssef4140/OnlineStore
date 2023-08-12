import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [{ _id: String, quantity: Number, color: String, size: String, price: Number}],
    paymentMethod: String,
    shippingMethod: String,
    userId: String,
    subTotal: Number,
    totalPrice: Number,
    status: String,
    date: Date,
    shippingInfo: {
        first_name: String,
        last_name: String,
        email: String,
        mobile_number: String,
        address1: String,
        address2: String,
        country: String,
        city: String,
        state: String,
        zip_code: String,
      }
});

const order = mongoose.model("order", orderSchema);

export default order;