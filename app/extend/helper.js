'use strict';

const getUtils = require('../utils');
const utils = Symbol('Helper#utils');

// app/extend/helper.js
module.exports = {
  get utils() {
    if (!this[utils]) {
      this[utils] = getUtils;
    }
    return this[utils];
  },

  requestLog(data) {
    const { ctx } = this;

    const ips = ctx.request.header['x-forwarded-for'] ? ctx.request.header['x-forwarded-for'].replace(/\s*/g, '')
      .split(',') : [];

    const query = ctx.query || {};
    const params = ctx.params || {};
    const reqBody = ctx.request.body || {};

    let reqData = {};

    if (Object.keys(query).length) {
      reqData = ctx.query;
    }
    if (Object.keys(params).length) {
      reqData = ctx.query;
    }
    if (Object.keys(reqBody).length) {
      reqData = ctx.request.body;
    }

    const requestData = {
      date: getUtils.date.getDateToString(),
      ua: ctx.request.header['user-agent'],
      tokenValue: ctx.tokenValue || '',
      distinctId: ctx.tokenValue ? ctx.tokenValue.unionid : '',
      ip: ctx.request.header['x-real-ip'],
      ips,
      reqUrl: ctx.request.header.origin || '',
      url: ctx.request.url,
      method: ctx.request.method,
      reqData,
      resBody: ctx.response.body,
      timeConsuming: Date.now() - ctx.startReq,
      ...data,
    };

    return requestData;
  },
};
