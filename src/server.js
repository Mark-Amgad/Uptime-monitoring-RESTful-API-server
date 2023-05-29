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
/*
const userController = require("./controller/User");
app.post("/users/signup",userController.addUser);
app.get("/users/verify/:email/:code",userController.verify);
app.post("/users/login",userController.login);
app.delete("/users/delete/:email",userController.remove);

const checkController = require("./controller/check");
app.post("/checks/add",auth.authenticateUser,checkController.add);
app.get("/checks/",auth.authenticateUser,checkController.getAll);
app.get("/checks/:email",auth.authenticateUser,checkController.getByEmail);
app.put("/checks/update",auth.authenticateUser,checkController.update);
app.delete("/checks/delete/:check_id",auth.authenticateUser,checkController.delete);

const reportController = require("./controller/Report");
app.post("/reports/add",auth.authenticateUser,reportController.addReport);
app.get("/reports/:check_id",auth.authenticateUser,reportController.getReportsByCheckId);
app.get("/reports/",auth.authenticateUser,reportController.getAll);

*/

/*
const axios = require('axios');
const { performance } = require('perf_hooks');

//const url = 'http://localhost:4040/checks/';
const url = 'https://www.facebook.com';
//const url = "http://localhost:4040/questions/";
const pollingInterval = 5000; // milliseconds (e.g., 5000 = 5 seconds)
const requestDetails = {
    url: url, // Specify the full URL with the protocol
    method: 'GET',
    headers: {
      // Optional: Add custom headers if needed
    },
    // Additional request options as needed
  };
function pollRequest(requestDetails) {
    const startTime = performance.now();
    axios(requestDetails)
        .then(response => {
            const { status, statusText, headers } = response;
            const responseTime = performance.now() - startTime;

            console.log('Response Status:', status);
            console.log('Response Status:', statusText);
            console.log('Response Time:', responseTime.toFixed(2), 'ms');
            //console.log('Headers:', headers);

            // Additional processing or analysis based on the response

            setTimeout(()=>{pollRequest(requestDetails)}, pollingInterval); // Recursive call for polling
        })
        .catch(error => {
            console.error('Error:', error.message);
            setTimeout(()=>{pollRequest(requestDetails)}, pollingInterval); // Recursive call for polling
        });
}

pollRequest(requestDetails);
*/

const poll = require("./poll");
poll.manager();

module.exports = app;