const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  check_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Check',
    required: true
  },
  /*
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  */
  url: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  availability: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  outages: {
    type: Number,
    required: true
  },
  avg_response_time: {
    type: Number,
    required: true
  },
  downtime: {
    type: Number,
    required: true
  },
  uptime: {
    type: Number,
    required: true
  },
  logs_history: [{
    type: Date,
  }]
});

const ReportModel = mongoose.model('Report', reportSchema);

module.exports = ReportModel;
