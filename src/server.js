const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const port = 4040; // must be fetched from env variables later
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(port,async()=>{
    try
    {
        await mongoose.connect("mongodb+srv://mark:1234@mycluster.s9dhhpp.mongodb.net/Bosta?retryWrites=true&w=majority");
        console.log("The server is running on port " + port);
        console.log("Database has connected successfully");
    }
    catch(err)
    {
        console.log(err);
        console.log("There is a problem in the database or in the server");
    }
});

const userController = require("./controller/User");
app.post("/users/signup",userController.addUser);
app.get("/users/verify/:email/:code",userController.verify);
app.post("/users/login",userController.login);