'use strict';

// model -> user.js
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = mongoose.Schema.Types.ObjectId;

  const ModelSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
  return mongoose.model('User', ModelSchema, 'user');
};
