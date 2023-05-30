const UserModel = require("../models/User");
const helper = require("../utils/helper");
const notifications = require("../utils/notifications");

let userController = {};

userController.addUser = async(req,res)=>{
    try
    {
        let {name,email,password,phone} = req.body;
        let users = await UserModel.find({"email":email});
        if(users.length !== 0){ // no user with this email
            return res.status(404).json({"message":"this user is already exist"});
        }
        let hashedPassword = helper.encrypt(password);
        let verificationCode = helper.getRandomString();
        let newUser = new UserModel(
            {
                name:name,
                email:email,
                password:hashedPassword,
                phone:phone,
                verification_code:verificationCode
            }
        );
        await newUser.save();
        // sending the verification mail
        const link = "http://localhost:4040" + "/users/verify/"+ email +"/"+ verificationCode;
        let htmlContent = "<p> Hello," + name + "</p>";
        htmlContent += "<p> please visit this link to verify your Account</p>";
        htmlContent = htmlContent + "<a href='"+ link + "'> link </a>";
        await notifications.sendEmail(
            email,
            "Verification Mail",
            htmlContent
        )
        return res.status(200).json({"message":"user created"});
    }
    catch(err)
    {
        //console.log(err);
        return res.status(404).json({"message":"Error"});
    }
}

userController.verify = async(req,res)=>{
    try
    {
        let {email,code} = req.params;
        let verificationCode = await UserModel.findOne({email:email},{verification_code:1});
        verificationCode = verificationCode.verification_code;
        if(verificationCode === code)
        {
            await UserModel.updateOne({email:email},{verified:true});
            return res.status(200).json({"message" : "Verified Successfully"});
        }
    }
    catch(err)
    {
        console.log(err);
        return res.status(404).json({"message":"Error"});
    }
}

userController.login = async(req,res)=>{
    try
    {
        const {email,password} = req.body;
        const user = await UserModel.findOne({email:email});
        if(user === null)
        {
            return res.status(404).json({"message":"This email doesn't exist"});
        }
        const correctPassword = user.password;
        const bcrypt = require("bcrypt");
        const checkPassword = bcrypt.compareSync(password, correctPassword);
        if(checkPassword === false)
        {
            return res.status(404).json({"message": "Wrong password"});
        }
        if(user.verified === false)
        {
            return res.status(404).json({"message": "This user is not verified yet, please check your email."});
        }
        let payload = {
            email:email,
            phone:user.phone
        };
        let token = helper.generateJwt(payload);
        return res.json({"message":"Success login","token":token});
    }
    catch(err)
    {
        //console.log(err);
        return res.status(404).json({"message":"Error"});
    }
}

// this is endpoint is just used while testing to delete the user after creating it.
userController.remove = async(req,res)=>{
    try
    {
        let email = req.params.email;
        let result = await UserModel.deleteOne({email:email});
        if(result.deletedCount != 1)
        {
            return res.status(404).json({"message":"This email is not exist"});
        }
        return res.status(200).json({"message":"Account Deleted"});
    }
    catch(err)
    {
        //console.log(err);
        return res.status(404).json({"message":"Error"});
    }
}

module.exports = userController;