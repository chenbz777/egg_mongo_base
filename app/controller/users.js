'use strict';

const baseController = require('./baseController');

class UserController extends baseController {
  get serviceName() {

    return this.service.users;
  }

  async login() {
    const { ctx } = this;

    const { user, password } = ctx.request.body;

    ctx.result.success(await this.serviceName.login({ user, password }));
  }
}

module.exports = UserController;
