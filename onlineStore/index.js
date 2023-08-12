import dotnav from "dotenv";
import express from "express";
import mongoose from "mongoose";
import adminPanelRouter from './routes/adminPanelRouter.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import registerRouter from './routes/registerRouter.js'
import loginRouter from './routes/loginRouter.js'
import lastActive from './middlewares/lastActive.js'
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

app.use(lastActive);
app.use(cookieParser());
app.use("/views/admin.html", authentication.verify, authorization.adminVerify);

app.use(express.static('public'))

app.use('/adminPanel', adminPanelRouter);

app.use("/register", registerRouter);
app.use("/login", loginRouter);


app.get("/", (req,res)=>{
    res.sendFile(__dirname + '/public/views/index.html');
})

app.listen(PORT, err => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    console.log(`Server is Listening on port: ${PORT}`);
  });