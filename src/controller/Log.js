const LogModel = require("./../models/Log");

let logController = {};

logController.addLog = (logData)=>{
    try
    {
        let {checkId,userId,url,status,responseTime,isUp} = logData;
        let newLog = new LogModel({
            check_id:checkId,
            user_id:userId,
            url:url,
            status:status,
            response_time:responseTime,
            is_up:isUp
        });
        newLog.save();
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = logController;