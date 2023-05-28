const ReportModel = require("./../models/Report");
const CheckModel = require("./../models/Check");
const mongoose = require("mongoose");

let reportController = {};

reportController.addReport = async(req,res)=>{
    try
    {
        let {email,checkId} = req.body;
        let report = await reportController.createReport(checkId);
        res.status(200).json({"report":report,"messgae":"Saved"});
        

    }
    catch(err)
    {
        res.status(404).json({"messgae":"Error"});
    }
}

reportController.createReport = async(checkId) =>{
    let check = await CheckModel.findById(checkId);
    try
    {
        const LogModel = require("./../models/Log");
        let report = await LogModel.aggregate([
            
            {
                $match: { check_id: new mongoose.Types.ObjectId(checkId) }
            },
            {
                $group:
                {
                    _id:null,
                    total_logs : {
                        $sum : 1
                    },
                    avg_response_time: { $avg: "$response_time" },
                    outages : {
                        $sum : {
                            $cond: [{ $eq: ["$is_up", false] }, 1, 0]
                        }
                    },
                    downtime: {
                        $sum:{
                            $cond: [{ $eq: ["$is_up", false] }, check.interval/1000, 0]
                        }
                    },
                    uptime: {
                        $sum:{
                            $cond: [{ $eq: ["$is_up", true] }, check.interval/1000, 0]
                        }
                    },
                    availability: {
                        $avg: {
                            $cond: [{ $eq: ["$is_up", true] }, 1, 0]
                        }
                    },
                    logs_history: {
                        $push:"$created_at"
                    }
                
                }
            }
        ]);
        report = report[0];
        report.check_id =  new mongoose.Types.ObjectId(checkId);
        let lastLog= await LogModel.findOne({check_id:checkId},{status:1}).sort({ _id: -1 });
        report.status = lastLog.status;
        report.url = check.url;
        let newReport = new ReportModel(report);
        newReport._id = undefined; // to generate a unique one
        await newReport.save();
        return newReport;
    }
    catch(err)
    {
        console.log(err);
    }
    
    
}

module.exports = reportController;