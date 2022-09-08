'use strict';

const baseService = require('./baseService');

class ReqLogService extends baseService {
  get model() {
    return this.ctx.model.ReqLog;
  }

}

module.exports = ReqLogService;
