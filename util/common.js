$.fn.serializeObject = function() {
  var o = {}
  var a = this.serializeArray()
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]]
      }
      o[this.name].push(this.value || '')
    } else {
      o[this.name] = this.value || ''
    }
  })
  return o
}

const Cookie = {
  //分装获取的方法 Cookie.get('name')
  get: function(key) {
    var cookiestr = document.cookie //读取本地的cookie
    var list = cookiestr.split('; ')
    for (var i = 0; i < list.length; i++) {
      var kvs = list[i].split('=')
      if (kvs[0] == key) {
        return kvs[1] //查询是否存在 存在返回 否则返回null
      }
    }
    return null
  },
  //封装写入cookie的方法 包括内容、有效期、路径，是否安全传输
  set: function(key, value, expires, path) {
    if (typeof expires == 'number' || typeof expires == 'string') {
      expires = Number(expires)
      if (isNaN(expires)) {
        expires = undefined
      } else {
        var d = new Date()
        d.setDate(d.getDate() + expires)
        expires = d
      }
    }
    if (!(expires instanceof Date) && typeof expires == 'object') {
      expires = undefined
    }
    //cookie的写入 用json字符串形式 调用的时候用Cookie.set('name','zhangsan','/')
    document.cookie =
      key +
      '=' +
      value +
      ';' +
      (expires ? 'expires=' + expires + ';' : '') +
      (path ? 'path=' + path + ';' : '')
  }
}

const SessionStorage = {
  /**
   * 根据键值获取sessionStorage
   * @param key 键
   * @returns 失败false,成功对象
   */
  getSession(key) {
    if (typeof Storage !== 'undefined' || typeof key != 'string') {
      var value = sessionStorage.getItem(key)
      try {
        value = JSON.parse(value)
      } catch (e) {}
      return value
    } else {
      return false
    }
  },
  /**
   * 设置sessionStorage
   * @param key 键
   * @param value 值   String或者JSON或者ARRAY
   * @returns {boolean}
   */
  setSession(key, value) {
    if (typeof Storage !== 'undefined' || typeof key != 'string') {
      if (typeof value !== 'string') {
        value = JSON.stringify(value)
      }
      sessionStorage.setItem(key, value)
      return true
    } else {
      return false
    }
  },
  /**
   * 移除sessionStorage
   * @param key
   * @returns {boolean}
   */
  removeSession(key) {
    if (typeof Storage !== 'undefined' || typeof key != 'string') {
      sessionStorage.removeItem(key)
      return true
    } else {
      return false
    }
  },
  /**
   * 清空所有
   * @returns {boolean}
   */
  clearSession() {
    if (typeof Storage !== 'undefined') {
      sessionStorage.clear()
      return true
    } else {
      return false
    }
  }
}
