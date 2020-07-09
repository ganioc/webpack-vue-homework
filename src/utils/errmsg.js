export function getErrMsg(n) {
  if (n === 22000) {
    return '余额不足'
  } else if (n === 22001) {
    return '参数错误'
  } else {
    return '失败'
  }
}
