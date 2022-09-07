'use strict';
const resultCode = {
  404: {
    code: 7404,
    msg: '嘿 兄弟，请检查路径是否正确',
  },
  illegal_request: {
    code: 7001,
    msg: '非法请求!',
  },
  'invalid token': {
    code: 7002,
    msg: 'token无效',
  },
  'jwt expired': {
    code: 7003,
    msg: 'token过期',
  },
  'jwt must be provided': {
    code: 7004,
    msg: '必须提供token',
  },
  'invalid signature': {
    code: 7005,
    msg: 'token签名无效',
  },
  illegal_url: {
    code: 7006,
    msg: '无效域名',
  },
  illegal_ip: {
    code: 7007,
    msg: '无效IP',
  },
  no_permissions: {
    code: 7101,
    msg: '权限不足!',
  },
  parameter_verification_error: {
    code: 7102,
    msg: '参数错误',
  },
  no_user: {
    code: 7103,
    msg: '用户不存在',
  },
  error_password: {
    code: 7104,
    msg: '密码错误',
  },
  user_disable: {
    code: 7105,
    msg: '用户已被禁用',
  },
  user_no_role: {
    code: 7106,
    msg: '未分配用户角色,请联系管理员',
  },
};
module.exports = {
  resultCode,
};
