'use strict';

const Service = require('egg').Service;

class BaseService extends Service {

  get model() {

    return this.ctx.model;
  }

  get dbConfig() {

    return {};
  }

  async create(data) {

    return this.service.mongoService.create(this.model, data);
  }

  async delete(data) {

    return this.service.mongoService.delete(this.model, data);
  }

  async update(dbWhere, data) {

    return this.service.mongoService.update(this.model, dbWhere, data);
  }

  async findAll(dbWhere, dbConfig) {

    dbConfig = Object.assign(this.dbConfig, dbConfig);

    return this.service.mongoService.findAll(this.model, dbWhere, dbConfig);
  }

  async find(dbWhere, dbConfig) {

    dbConfig = Object.assign(this.dbConfig, dbConfig);

    return this.service.mongoService.find(this.model, dbWhere, dbConfig);
  }

  async findOne(dbWhere, dbConfig) {

    dbConfig = Object.assign(this.dbConfig, dbConfig);

    return this.service.mongoService.findOne(this.model, dbWhere, dbConfig);
  }

}

module.exports = BaseService;
