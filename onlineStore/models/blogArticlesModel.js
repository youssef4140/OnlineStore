// const mongoose = require("mongoose");

import mongoose from "mongoose";


const blogArticleSchema = new mongoose.Schema({
    title: String,
    header: String,
    image: String,
    body: String,
    date: Date,
    auther: String
});

export const blogArticle = mongoose.model("blogArticle", blogArticleSchema);

// module.exports = blogArticle;