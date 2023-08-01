// require("dotenv").config();
// const express = require('express');
// const mongoose = require("mongoose");


// import { URL } from 'url';

// const __filename = new URL('', import.meta.url).pathname;
// const __dirname = new URL('.', import.meta.url).pathname;

import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import {router as productsRouter } from "./routes/shoproutes.js"
dotenv.config()


const PORT = "8080";

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'))


mongoose
    .connect(process.env.CONNECTION_STRING, {})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((e) => {
        console.log(e);
    });


app.use("/shop", productsRouter);


app.listen(PORT, err => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    console.log(`Server isrunning on http://localhost:${PORT}/`);
  });
  
