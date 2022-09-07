'use strict';

/**
 * @param permissions
 * @description 鉴权中间件
 * @author chenbingze
 * @date 2022/3/30
 */
module.exports = () => {
  return async function authentication(ctx, next) {

    /**
     * 先说一下这里逻辑
     * 3、校验用户状态：0正常、1禁用
     * 4、查询用户的角色
     * 5、根据角色查询权限
     * 6、判断接口是否在权限中
     */
    console.log('我是鉴权中间件');

    await next();
  };
};
