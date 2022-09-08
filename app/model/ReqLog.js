'use strict';

// model -> user.js
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // const ObjectId = mongoose.Schema.Types.ObjectId;

  const ModelSchema = new Schema({
    date: {
      type: String,
      required: true,
    },
    ua: {
      type: String,
      required: true,
    },
    tokenValue: {
      type: Object || String,
      required: true,
    },
    distinctId: {
      type: String,
      required: false,
    },
    ip: {
      type: String,
      required: false,
    },
    ips: {
      type: Array,
      required: true,
    },
    reqUrl: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    reqData: {
      type: Object,
      required: true,
    },
    resBody: {
      type: Object,
      required: true,
    },
    timeConsuming: {
      type: Number,
      required: true,
    },
    error: {
      type: String,
      required: false,
    },
    created_at: {
      type: Date,
      required: true,
    },
    updated_at: {
      type: Date,
      required: true,
    },
  }, {
    versionKey: false,
  });

  // 映射到egg-mongo db 库的user表中（不区分大小写）
  // (命名, 数据库对象, 数据库名)
  return mongoose.model('ReqLog', ModelSchema, 'req_log');
};
