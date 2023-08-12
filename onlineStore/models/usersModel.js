import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastActive: Date,
    role: String
});

const user = mongoose.model("user", userSchema);

export default user;