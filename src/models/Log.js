const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  check_id: {type: mongoose.Schema.Types.ObjectId,ref: 'Check',required: true},
  user_id: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  url: {type: String,required: true},
  created_at: {type: Date,default: Date.now},
  status: {type: Number,required: true},
  response_time: {type: Number,required: true},
  is_up: {type: Boolean,required: true}

});

const LogModel = mongoose.model('Log', logSchema);

module.exports = LogModel;
