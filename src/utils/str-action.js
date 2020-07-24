export function strAction(str) {
  if (str === 1) {
    return '创建账户'
  } else if (str === 2) {
    return '修改账户'
  } else if (str === 3) {
    return '删除账户'
  } else if (str === 4) {
    return '返还账户'
  } else {
    return '未知操作'
  }
}

export function strVerb(verb) {
  if (verb === 'status') {
    return '状态'
  } else if (verb === 'unused') {
    return '短信条数'
  } else {
    return verb
  }
}

export function strEdit(verb, oldstate, newstate) {
  if (verb) {
    if (oldstate) {
      return '修改' + strVerb(verb) + '从' + oldstate + '到' + newstate
    } else {
      return '修改' + strVerb(verb) + '为' + newstate
    }
  } else {
    if (oldstate) {
      return '修改' + oldstate + '到' + newstate
    } else {
      return '修改为' + newstate
    }
  }
}
export function strContent(action, verb, oldstate, newstate) {
  if (action === 1) {
    return '成功创建账户'
  } else if (action === 2) {
    return strEdit(verb, oldstate, newstate)
  } else if (action === 3) {
    return '成功删除账户'
  } else if (action === 4) {
    return '短信发送失败，返回' + newstate + '条'
  } else {
    return ''
  }
}
