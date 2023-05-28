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


const checkController = require("./controller/check");
app.post("/checks/add",checkController.add);
app.get("/checks/",checkController.getAll);
app.get("/checks/:email",checkController.getByEmail);
app.put("/checks/update",checkController.update);
app.delete("/checks/delete/:check_id",checkController.delete);

const reportController = require("./controller/Report");
app.post("/reports/add",reportController.addReport);



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