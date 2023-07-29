const express = require('express');

PORT = "8080";

const app = express();

app.use(express.static('public'))

app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/public/views/index.html');
})

app.listen(PORT, err => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    console.log(`Server is Listening on port: ${PORT}`);
  });