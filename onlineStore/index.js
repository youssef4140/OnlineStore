
import dotnav from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import registerRouter from './routes/registerRouter.js'
import loginRouter from './routes/loginRouter.js'
import lastActive from './middlewares/lastActive.js'
import {router as productsRouter } from "./routes/shoproutes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotnav.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static('public'))


mongoose
    .connect(process.env.CONNECTION_STRING, {})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((e) => {
        console.log(e);
    });

app.use(lastActive);

app.use("/shop", productsRouter);

app.use("/register", registerRouter);
app.use("/login", loginRouter);


app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/public/views/index.html');
})


app.listen(PORT, err => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    console.log(`Server isrunning on http://localhost:${PORT}/`);
  });
  
