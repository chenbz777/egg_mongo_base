'use strict';

/**
 * @description 授权中间件
 * @author chenbingze
 * @date 2022/3/30
 */
module.exports = () => {
  return async function authorization(ctx, next) {

    console.log('我是授权中间件');

    /**
     * 先说一下这里逻辑
     * 1、判断请求url是否为白名单
     * 2、判断请求ip是否为白名单
     * 3、获取token
     * 4、验证 token
     */

    // 1、判断请求url是否为白名单
    // const reqUrl = ctx.request.header.origin || '';
    // if (reqUrl !== 'http://localhost:8080') {
    //   throw new Error('illegal_url');
    // }

    // 2、判断请求ip是否为白名单
    // const ip = ctx.request.header['x-real-ip'] || '';
    // if (ip !== '127.0.0.1') {
    //   throw new Error('illegal_ip');
    // }

    // 3、判断是否携带 token
    const token = ctx.get('Authorization');
    if (!token) {
      // 抛出"非法请求"异常
      throw new Error('illegal_request');
    }

    // 4、验证 token
    ctx.tokenValue = await ctx.service.token.getValue(token);

    await next();
  };
};
