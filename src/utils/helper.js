let helper = {};

helper.encrypt = (text)=>{
    const bcrypt = require("bcrypt");
    const saltRound = Number(process.env.SALT_ROUND || 10);
    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(text, salt);
    return hash;
} 


helper.generateJwt = (payloadData)=>{
    // payloadData must be an object
    const jwt = require("jsonwebtoken");
    const key = process.env.JWT_KEY || "KEY";
    const token = jwt.sign(payloadData,key);
    return token;
}


helper.getRandomString = ()=>{
  const crypto = require('crypto');
  const bytes = crypto.randomBytes(10);
  return bytes.toString('hex');
}

module.exports = helper;