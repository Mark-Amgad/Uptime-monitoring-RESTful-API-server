let helper = {};

helper.encrypt = (text)=>{
    const bcrypt = require("bcrypt");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(text, salt);
    return hash;
} 


helper.generateJwt = (payloadData)=>{
    // payloadData must be an object
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(payloadData,"KEY");
    return token;
}


helper.getRandomString = ()=>{
  const crypto = require('crypto');
  const bytes = crypto.randomBytes(10);
  return bytes.toString('hex');
}

module.exports = helper;