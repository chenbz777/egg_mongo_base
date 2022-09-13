'use strict';

const baseController = require('./baseController');

class UserController extends baseController {
  get serviceName() {

    return this.service.users;
  }

  async login() {
    const { ctx, app } = this;

    const data = ctx.request.body;

    const rules = {
      username: {
        type: 'string',
        required: true,
        desc: '账号',
      },
      password: {
        type: 'string',
        required: true,
        desc: '密码',
      },
    };

    const validateError = app.validator.validate(rules, data);
    if (validateError) {
      // 参数校验错误
      ctx.status = 400;
      ctx.body = { validateError };

      return false;
    }

    const { username, password } = data;

    ctx.result.success(await this.serviceName.login({ username, password }));
  }
}

module.exports = UserController;
