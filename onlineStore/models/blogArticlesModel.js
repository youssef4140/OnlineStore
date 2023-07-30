const mongoose = require("mongoose");

const blogArticleSchema = new mongoose.Schema({
    title: String,
    header: String,
    image: String,
    body: String,
    date: Date,
    auther: String
});

const blogArticle = mongoose.model("blogArticle", blogArticleSchema);

module.exports = blogArticle;