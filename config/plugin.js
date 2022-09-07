'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 路由分组插件
  routerGroup: {
    enable: true,
    package: 'egg-router-group',
  },
  mongoose: {
    enable: true, // 开启插件
    package: 'egg-mongoose',
  },
};