const CheckModel = require("../models/Check");
const UserModel = require("../models/User");
const helper = require("../utils/helper");
const notifications = require("../utils/notifications");

let checkController = {};

checkController.add = async(req,res)=>{
    try
    {
        let {email,urlName,url,method,protocol,ignoreSSLFlag} = req.body;
        let user = await UserModel.findOne({email:email},{_id:1});
        let userId = user._id;
        let newCheck = new CheckModel({
            user_id:userId,
            url_name:urlName,
            url:url,
            protocol:protocol,
            method:method,
            ignoreSSL_flag:ignoreSSLFlag,
            user_email:email
        });
        await newCheck.save();
        // add this check to the poll
        const poll = require("./../poll");
        const requestDetails = {
            url: newCheck.protocol + "://"+newCheck.url,
            method: newCheck.method,
          };
        poll.pollRequest(requestDetails,newCheck,-1);
        return res.status(200).json({"message":"URL check added successfully","URL check":newCheck});

    }
    catch(err)
    {
        console.log(err);
        return res.status(404).json({"message":"Error"});
    }
}

checkController.update = async(req,res)=>{
    try
    {
        let {checkId,urlName,url,protocol,ignoreSSLFlag} = req.body;
        let result = await CheckModel.updateOne({_id:checkId},{
            url_name : urlName,
            url : url,
            protocol:protocol,
            ignoreSSL_flag:ignoreSSLFlag
        });
        if(result.matchedCount === 0)
        {
            return res.status(404).json({"message":"This check Id is not exist"});
        }
        let updatedCheck = await CheckModel.findById(checkId);
        return res.status(200).json({"message":"URL check updated.","URL check":updatedCheck});
    }
    catch(err)
    {
        console.log(err);
        return res.status(404).json({"message":"Error"});
    }
}


checkController.delete = async(req,res)=>{
    try
    {
        let checkId = req.params.check_id;
        let result = await CheckModel.deleteOne({_id:checkId});
        if(result.deletedCount != 1)
        {
            return res.status(404).json({"message":"This check Id is not exist"});
        }
        return res.status(200).json({"message":"URL Check Deleted"});
    }
    catch(err)
    {
        console.log(err);
        return res.status(404).json({"message":"Error"});
    }
}


checkController.getByEmail = async(req,res)=>{
    try
    {
        let email = req.params.email;
        let user = await UserModel.findOne({email:email},{_id:1});
        let userId = user._id;
        let checks = await CheckModel.find({user_id:userId});
        return res.status(200).json({"checks" : checks});
    }
    catch(err)
    {
        console.log(err);
        return res.status(404).json({"message":"Error"});
    }
}


checkController.getAll = async(req,res)=>{
    try
    {
        let allChecks = await CheckModel.find();
        return res.status(200).json({"checks":allChecks});
    }
    catch(err)
    {
        console.log(err);
        return res.status(404).json({"message":"Error"});
    }
}

module.exports = checkController;