const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const port = 4040; // must be fetched from env variables later
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('dotenv').config();

app.listen(port,async()=>{
    try
    {
        const mongoAddress = process.env.MONGODB;
        await mongoose.connect(mongoAddress);
        //console.log(process.env.NODE_ENV);
        if(process.env.NODE_ENV !== "testing")
        {
            console.log("The server is running on port " + port);
            console.log("Database has connected successfully");
        }
        
    }
    catch(err)
    {
        console.log(err);
        console.log("There is a problem in the database or in the server");
    }
});

const auth = require("./middlewares/Auth");
const userRoute = require("./routes/UserRoutes");
const checkRoute = require("./routes/CheckRoutes");
const reportRoute = require("./routes/ReportRoutes");

app.use(checkRoute);
app.use(userRoute);
app.use(reportRoute);

const poll = require("./poll");
poll.manager(); // to start to record logs and check on every URL

module.exports = app;