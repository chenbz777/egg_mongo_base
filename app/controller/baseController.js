'use strict';

// app/controller/baseController.js
const Controller = require('egg').Controller;

class BaseController extends Controller {

  /**
     * @description service名称(对应service对象)
     * @author chenbingze
     * @date 2022/4/7
     */
  get serviceName() {
    return {};
  }

  /**
     * @description 参数校验-新增
     * @author chenbingze
     * @date 2022/4/7
     */
  get ruleCreate() {
    return {};
  }

  /**
     * @description 参数校验-修改
     * @author chenbingze
     * @date 2022/4/7
     */
  get ruleUpdate() {
    return {
      _id: {
        type: 'string',
        required: true,
      },
    };
  }

  /**
     * @description 参数校验-删除
     * @author chenbingze
     * @date 2022/4/7
     */
  get ruleDelete() {
    return {
      _id: {
        type: 'string',
        required: true,
      },
    };
  }

  /**
     * @description 查询
     * @author chenbingze
     * @date 2022/4/7
     */
  async index() {
    const { ctx } = this;

    const dbConfig = {};
    const data = ctx.query;

    if (data.page) {
      dbConfig.page = data.page;

      delete data.page;
    }
    if (data.pageSize) {
      dbConfig.pageSize = data.pageSize;

      delete data.pageSize;
    }

    const result = await this.serviceName.find(data, dbConfig);

    ctx.result.success(result);
  }

  /**
     * @description 查询单条
     * @author chenbingze
     * @date 2022/4/7
     */
  async show() {
    const { ctx } = this;

    const { id: _id } = ctx.params;

    const result = await this.serviceName.findOne({ _id });

    ctx.result.success(result);
  }

  /**
     * @description 新增
     * @author chenbingze
     * @date 2022/4/7
     */
  async create() {
    const { ctx, app } = this;

    const data = ctx.request.body;

    const validateError = app.validator.validate(this.ruleCreate, data);
    if (validateError) {
      // 参数校验错误
      ctx.status = 400;
      ctx.body = { validateError };

      return false;
    }

    const result = await this.serviceName.create(data);

    ctx.result.success(result);
  }

  /**
     * @description 修改
     * @author chenbingze
     * @date 2022/4/7
     */
  async update() {
    const { ctx, app } = this;

    const { id: _id } = ctx.params;
    const data = ctx.request.body;

    const validateError = app.validator.validate(this.ruleUpdate, { _id, ...data });
    if (validateError) {
      // 参数校验错误
      ctx.status = 400;
      ctx.body = { validateError };

      return false;
    }


    const result = await this.serviceName.update({ _id }, data);

    ctx.result.success(result);
  }

  /**
     * @description 删除
     * @author chenbingze
     * @date 2022/4/7
     */
  async destroy() {
    const { ctx, app } = this;

    const { id: _id } = ctx.params;

    const validateError = app.validator.validate(this.ruleDelete, { _id });
    if (validateError) {
      // 参数校验错误
      ctx.status = 400;
      ctx.body = { validateError };

      return false;
    }


    const result = await this.serviceName.delete({ _id });

    ctx.result.success(result);
  }

  /**
     * @description 聚合查询
     * @author chenbingze
     * @date 2022/4/7
     */
  async find() {
    const { ctx } = this;

    const { where: dbWhere, config: dbConfig } = ctx.request.body;

    const result = await this.serviceName.find(dbWhere, dbConfig);

    ctx.result.success(result);
  }

  async findAll() {
    const { ctx } = this;

    const { where: dbWhere, config: dbConfig } = ctx.request.body;

    const result = await this.serviceName.findAll(dbWhere, dbConfig);

    ctx.result.success(result);
  }

}

module.exports = BaseController;
