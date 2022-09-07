'use strict';

const baseService = require('./baseService');

class UserService extends baseService {
  get model() {
    return this.ctx.model.User;
  }

}

module.exports = UserService;
