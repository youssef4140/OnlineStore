
import dotnav from "dotenv";
import express from "express";
import mongoose from "mongoose";
import adminPanelRouter from './routes/adminPanelRouter.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import registerRouter from './routes/registerRouter.js'
import loginRouter from './routes/loginRouter.js'
import lastActive from './middlewares/lastActive.js'
import {router as productsRouter } from "./routes/shoproutes.js"
import authentication from './middlewares/authentication.js'
import authorization from './middlewares/authorization.js'
import cookieParser from 'cookie-parser'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotnav.config();

const PORT = process.env.PORT || 8080;

const app = express();

mongoose
    .connect(process.env.CONNECTION_STRING, {})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((e) => {
        console.log(e);
    });

    
app.use(cookieParser());
app.use(lastActive);
app.use("/views/admin.html", authentication.verify, authorization.adminVerify);
app.use("/views/adminPanelPages/users.html", authentication.verify, authorization.superAdminVerify);
app.use("/javascript/adminPanel/users.js", authentication.verify,authorization.superAdminVerify);

app.use(express.static('public'))

app.use("/shop", productsRouter);

app.use('/adminPanel', adminPanelRouter);

app.use("/register", registerRouter);
app.use("/login", loginRouter);


app.get("/", (req,res)=>{
    res.sendFile(__dirname + '/public/views/index.html');
})
app.get("/admin", authentication.verify, authorization.adminVerify, (req,res)=>{
    res.sendFile(__dirname + '/public/views/admin.html');
})


app.listen(PORT, err => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    console.log(`Server isrunning on http://localhost:${PORT}/`);
  });
  
