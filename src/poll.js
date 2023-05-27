const axios = require('axios');
const { performance } = require('perf_hooks');
const notifications = require("./utils/notifications");


let poll = {};

poll.pollRequest = (requestDetails,checkDetails,prevState)=> {
    const startTime = performance.now();
    axios(requestDetails)
        .then(response => {
            if(prevState !== 1)
            {
                // send Notification
                let emailSubject = "your URL '" + checkDetails.url_name + "' state is up";
                let htmlContent = "<h3> your URL : " +checkDetails.url +" is UP</h3>";
                notifications.sendEmail(checkDetails.user_email,emailSubject,htmlContent);
            }
            const { status, statusText, headers } = response;
            const responseTime = performance.now() - startTime;

            console.log("Url : " + checkDetails.url)
            console.log('Response Status:', status);
            console.log('Response Status:', statusText);
            console.log('Response Time:', responseTime.toFixed(2), 'ms');
            //console.log('Headers:', headers);
            //store the log
            const logController = require("./controller/Log");
            const logDate = {
                checkId:checkDetails._id,
                userId:checkDetails.user_id,
                url:checkDetails.url,
                status:status,
                responseTime:responseTime,
                isUp:true
            };
            logController.addLog(logDate)

            setTimeout(()=>{poll.pollRequest(requestDetails,checkDetails,1)}, checkDetails.interval); // Recursive call for polling
        })
        .catch(error => {
            if(prevState !== 0)
            {
                // send Notification
            }
            console.error('Error:', error.message);
            const logController = require("./controller/Log");
            const logDate = {
                checkId:checkDetails._id,
                userId:checkDetails.user_id,
                url:checkDetails.url,
                status:404,
                responseTime:-1,
                isUp:false
            };
            logController.addLog(logDate)
            setTimeout(()=>{poll.pollRequest(requestDetails,checkDetails,0)}, checkDetails.interval); // Recursive call for polling
        });
}

poll.manager = async ()=>{
    // get all urls
    let allChecks = await poll.getAllChecks();
    allChecks.forEach((check)=>{
        const requestDetails = {
            url: check.url,
            method: 'GET',
          };

        poll.pollRequest(requestDetails,check,-1);
    });
    // iterate on them using forEach
    // put everyone on pollRequest
}

poll.getAllChecks = async ()=>{
    const CheckModel = require("./models/Check");
    let allChecks = await CheckModel.find();
    return allChecks;
}

module.exports = poll;