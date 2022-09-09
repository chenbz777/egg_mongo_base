'use strict';

const baseService = require('./baseService');

const bcrypt = require('bcrypt');

class UserService extends baseService {
  get model() {
    return this.ctx.model.Users;
  }

  async create({ name, user, password, status }) {

    // 加密
    const salt = bcrypt.genSaltSync(10);
    // 对明文加密
    const encryption_password = bcrypt.hashSync(password, salt);

    return this.service.mongoService.create(this.model, { name, user, password: encryption_password, status });
  }

  async login({ user, password }) {

    const userData = await this.findOne({ user });

    if (!userData) {
      throw new Error('no_user');
    }

    const { password: encryption_password, status } = userData;

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

    const token = await this.service.token.create({ _id: userData._id });

    delete userData.password;
    delete userData._id;

    return { token, userData };
  }

}

module.exports = UserService;
