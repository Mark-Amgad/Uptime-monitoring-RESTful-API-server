


let notifications = {};

notifications.sendEmail = async(email , subject , htmlContent)=>{
    try
    {
        const nodemailer = require("nodemailer");
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            },
          });
        let info = await transporter.sendMail({
        from: 'Observer app', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: htmlContent // html body
        });

        //console.log(info);
    }
    catch(err)
    {
        console.log(err);
        console.log("error in sending email");
    }
};



module.exports = notifications;