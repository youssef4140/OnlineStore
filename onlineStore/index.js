import dotnav from "dotenv";
import express from "express";
import mongoose from "mongoose";
import dashboardRouter from './routes/dashboardRouter.js';

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

app.use(express.static('public'))

app.use('/getDashboard', dashboardRouter);

app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/public/views/index.html');
})

app.listen(PORT, err => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    console.log(`Server is Listening on port: ${PORT}`);
  });