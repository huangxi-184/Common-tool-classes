// 设置用户token 封装了 cookie

import Cookies from 'js-cookie'

const TokenKey = 'tofflonPmsMobileLoginToken' // 后台传过来得字段

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
