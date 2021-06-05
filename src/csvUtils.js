export default class {
  constructor(csvString) {
    const lines = this._trimEmptyLine(csvString).split('\n')
    this.headers = lines.shift().split(',')
    this.lines = lines
    this._validateColumns()
  }

  _trimEmptyLine (linesString) {
    const lines = []
    linesString.split('\n').forEach((line) => {
      if (line === '') return true;
      lines.push(line)
    })
    return lines.join('\n')
  }

  _validateColumns () {
    let diff = false
    const messages = [
      { headerLength: this.headers.length }
    ]
    this.lines.forEach((line) => {
      const columns = line.split(',')
      if (this.headers.length === columns.length) return true
      const message = {
        id: line[0],
        columnLength: columns.length,
        message: 'It does not match number of headers and columns.'
      }
      diff = true
      messages.push(message)
    })
    if (diff) throw new Error(JSON.stringify(messages, null, 2))

  }
  /**
   * カンマ区切りの文字列をObjectの配列にして返します。
   * @param {String} csvString
   * @returns {Array}
   */
  toObjectList() {
    const createEntries = (values) => {
      var entries = {}
      values.forEach((value, i) => {
        var key = this.headers[i]
        if (key.split('.').length <= 1) {
          entries[key] = value
        } else {
          var split_keys = key.split('.')
          var target = entries
          key = split_keys.pop()
          for (var j = 0; j < split_keys.length; j++) {
            var split_key = split_keys[j]
            if (!target[split_key]) {
              target[split_key] = {}
            }
            target = target[split_key]
          }
          target[key] = value
        }
      })
      return entries
    }
    // trim empty line
    (function (lines) {
      var empty_lines = []
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i]
        if (line === '') empty_lines.push(i)
      }
      for (var index = empty_lines.length - 1; index >= 0; index--) {
        var target = empty_lines[index]
        lines.splice(target, 1)
      }
    })(this.lines)
    var result_match_columns = (function (headers, lines) {
      let is_match = true
      var messages = []
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i]
        var columns = line.split(',')
        if (headers.length === columns.length) {
          continue
        }
        var message = {
          index: i,
          headers_length: headers.length,
          columns_length: columns.length,
          message: 'It does not match number of headers and columns.'
        }
        messages.push(message)
        is_match = false
      }
      return {
        is_match: is_match,
        messages: messages
      }
    })(this.headers, this.lines)
    if (result_match_columns.is_match === false) {
      console.log(JSON.stringify(result_match_columns.messages, null, 2))
      return null
    }
    var entries = this.lines.map((line) => {
      return createEntries(line.split(','))
    })
    return entries
  }

  /**
   * 任意のキーで重複した値があるかチェックします
   * @param list
   * @param keys Array
   * @returns {{is_duplicate: boolean, messages: Array}}
   */
  checkDuplicateValue(entries_list, keys) {
    var is_duplicate = false
    var messages = []
    var keys_list = (function (keys) {
      var keys_list = {}
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        keys_list[key] = []
      }
      return keys_list
    })(keys)
    for (var i = 0; i < entries_list.length; i++) {
      var entries = entries_list[i]
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j]
        var in_array = keys_list[key].some(function (v) {
          return v === entries[key]
        })
        if (in_array === true) {
          is_duplicate = true
          var message = {
            index: i,
            key: key,
            value: entries[key],
            message: 'Duplicate entries'
          }
          messages.push(message)
        }
        keys_list[key].push(entries[key])
      }
    }
    return {
      is_duplicate: is_duplicate,
      messages: messages
    }
  }
}
