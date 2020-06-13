/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // eslint-disable-next-line
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return true
}

/**
 * @param {string} str
 * @returns {number}
 */
export function validText(str) {
  let byteLen = 0
  let hanLen = 0
  for (let i = 0; i < str.length; i++) {
    let ch = str.charCodeAt(i)
    if (ch > 127) {
      hanLen += 2
    } else {
      byteLen += 1
    }
  }
  let remain = 1120 - hanLen * 2 * 8 - byteLen * 7

  if (remain < 0) {
    return Math.round(-remain / 7)
  } else {
    return 0
  }
}
/**
 *
 * @param {*} str
 * @returns {Boolean}
 */
export function validMobiles(str) {
  return true
}
/**
 *
 * @param {*} ch  character
 */
export function validNumber(ch) {
  return /^[1234567890]$/.test(ch)
}

export function validMobile(str) {
  let r = /^1[3456789]\d{9}$|^861[3456789]\d{9}$/
  return r.test(str.toString())
}
