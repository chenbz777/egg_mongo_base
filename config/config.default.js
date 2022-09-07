/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1661093264376_494';

  config.middleware = ['errorHandler', 'authorization'];
  // 忽略注册和登陆的接口
  config.authorization = {
    ignore: ['/'],
  };

  const userConfig = {
  };

  // 关闭crsf,开启跨域
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [],
  };

  // 允许跨域方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET, PUT,  POST, DELETE, PATCH',
  };

  // 【插件】egg-jwt
  config.jwt = {
    secret: '123456', // 自定义 token 的加密条件字符串
  };

  // 【插件】mongo_db
  config.mongoose = {
    // 数据库没有密码
    // client: {
    //   url: 'mongodb://ip:端口/数据库',
    //   options: {
    //   },
    // },

    // 数据库有密码
    client: {
      url: process.env.MONGO_URL + process.env.MONGO_DB,
      options: {
        auth: { authSource: process.env.MONGO_AUTH_SOURCE },
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
