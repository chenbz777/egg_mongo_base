'use strict';

const Service = require('egg').Service;

class MongoService extends Service {

  async create(model, data) {

    if (!data) {
      return null;
    }

    // 剔除无用字段
    delete data.id;
    delete data._id;

    data.created_at = new Date();
    data.updated_at = new Date();

    return model.create(data);
  }

  async delete(model, data) {

    if (!data) {
      return null;
    }

    return model.deleteMany(data);
  }

  async update(model, dbWhere, data) {

    if (!dbWhere) {
      return null;
    }

    if (!data) {
      return null;
    }

    // 剔除无用字段
    delete data.id;
    delete data._id;

    data.updated_at = new Date();

    return model.updateMany(dbWhere, data);
  }

  async findAll(model, dbWhere, dbConfig = {}) {
    const { ctx: { helper: { utils } } } = this;

    const pipeline = [];

    let limitData = 1000;

    let dateFormat = 'yyyy-MM-dd hh:mm:ss';

    pipeline.push({
      $sort: {
        created_at: -1,
      },
    });

    const { sort, project, lookup, lookups, group, limit, skip, addFields, dateToString } = dbConfig;

    if (dateToString) {
      if ((typeof dateToString) === 'string') {
        dateFormat = dateToString;
      }
    }

    if (dbWhere) {

      for (const key in dbWhere) {
        const isId = key.indexOf('_id') !== -1;
        if (isId) {
          dbWhere[key] = this.app.mongoose.Types.ObjectId(dbWhere[key]);
        }
      }

      pipeline.push({ $match: dbWhere });
    }

    if (sort) {
      pipeline.push({
        $sort: sort,
      });
    }

    if (lookup) {
      pipeline.push({
        $lookup: lookup,
      });
    }

    if (lookups) {
      lookups.forEach(lookup => {
        pipeline.push({
          $lookup: lookup,
        });
      });
    }

    if (group) {
      pipeline.push({
        $group: group,
      });
    }

    if (addFields) {
      pipeline.push({
        $addFields: addFields,
      });
    }

    if (project) {
      pipeline.push({ $project: project });
    }

    if (skip) {
      pipeline.push({
        $skip: skip,
      });
    }

    if (limit) {
      limitData = limit;
    }

    pipeline.push({
      $limit: limitData,
    });

    const list = await model.aggregate(pipeline);

    const count = await model.aggregate([
      { $match: dbWhere },
      { $count: 'count' },
    ]);

    const total = count.length ? count[0].count : 0;

    if (dateToString) {
      list.map(item => {
        item.created_at = utils.date.getDateToString(item.created_at, dateFormat);
        item.updated_at = utils.date.getDateToString(item.updated_at, dateFormat);

        return item;
      });
    }

    return { list, total };
  }

  async find(model, dbWhere, dbConfig = {}) {

    const page = Number(dbConfig.page) || 1;
    const pageSize = Number(dbConfig.pageSize) || 10;

    dbConfig = Object.assign({
      limit: pageSize,
      skip: (page - 1) * pageSize,
    }, dbConfig);

    const { list, total } = await this.findAll(model, dbWhere, dbConfig);

    const totalPages = Math.ceil(total / pageSize);

    return { list, total, page, pageSize, totalPages };
  }

  async findOne(model, dbWhere, dbConfig = {}) {

    dbConfig.limit = 1;

    const { list, total } = await this.findAll(model, dbWhere, dbConfig);

    if (!total) {
      return null;
    }

    return list[0];
  }

}

module.exports = MongoService;
