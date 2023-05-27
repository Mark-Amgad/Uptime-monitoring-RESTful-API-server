const mongoose = require('mongoose');

const checkSchema = new mongoose.Schema({
  url_name: {type: String,required: true},
  url: {type: String,required: true},
  user_id: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  user_email:{type: String,required:true},
  created_at: {type: Date,default: Date.now},
  protocol: {type: String,required: true, default:"HTTP"},
  time_out: {type: Number,required: true,default:5000},
  interval: {type: Number,required: true,default:5000},
  ignoreSSL_flag: {type: Boolean,default: false}

});

const CheckModel = mongoose.model('Check', checkSchema);

module.exports = CheckModel;
