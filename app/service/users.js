'use strict';

const baseService = require('./baseService');

const bcrypt = require('bcrypt');

class UserService extends baseService {
  get model() {
    return this.ctx.model.Users;
  }

  async create({ nickname, username, password, status, avatar }) {

    // 加密
    const salt = bcrypt.genSaltSync(10);
    // 对明文加密
    const encryption_password = bcrypt.hashSync(password, salt);

    return this.service.mongoService.create(this.model, { nickname, username, password: encryption_password, status, avatar });
  }

  async login({ username, password }) {

    const userInfo = await this.findOne({ username });

    if (!userInfo) {
      throw new Error('no_user');
    }

    const { password: encryption_password, status } = userInfo;

    // 验证
    // encryption_password 是数据库加密后的密码
    // 验证比对,返回布尔值表示验证结果 true表示一致，false表示不一致
    const isOk = bcrypt.compareSync(password, encryption_password);

    if (!isOk) {
      throw new Error('invalid_password');
    }

    if (!status) {
      throw new Error('invalid_status');
    }

    const token = await this.service.token.create({ _id: userInfo._id });

    delete userInfo.password;
    delete userInfo._id;

    return { token, userInfo };
  }

}

module.exports = UserService;
