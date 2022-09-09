'use strict';

const baseController = require('./baseController');

class UserController extends baseController {
  get serviceName() {

    return this.service.users;
  }

  async login() {
    const { ctx } = this;

    const data = ctx.request.body;

    const rules = {
      user: {
        type: 'string',
        required: true,
      },
      password: {
        type: 'string',
        required: true,
      },
    };

    const validateError = this.app.validator.validate(rules, data);
    if (validateError) {
      // 参数校验错误
      ctx.status = 400;
      ctx.body = { validateError };

      return false;
    }

    const { user, password } = data;

    ctx.result.success(await this.serviceName.login({ user, password }));
  }
}

module.exports = UserController;
