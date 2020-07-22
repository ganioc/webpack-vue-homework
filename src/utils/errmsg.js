export function getErrMsg(n) {
  if (n === 22000) {
    return '余额不足'
  } else if (n === 22001) {
    return '参数错误'
  } else {
    return '失败'
  }
}

export function guessErrMsg(str) {
  if (str.indexOf('duplicate') !== -1 && str.indexOf('E11000')) {
    return '用户已经存在'
  } else if (str.indexOf('usernotfound') !== -1) {
    return '您的账号不存在'
  } else if (str.indexOf('quota') !== -1) {
    return '您的账号余额不足'
  } else {
    return str
  }
}
