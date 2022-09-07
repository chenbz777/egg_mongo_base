'use strict';

const baseController = require('./baseController');

class UserController extends baseController {
  get serviceName() {

    return this.service.user;
  }

}

module.exports = UserController;
