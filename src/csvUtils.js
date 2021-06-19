export default class {
  /**
   * CSV文字列を素に項目をthis.headersにと実データをthis.linesに格納します
   *
   * @param {String} csvString
   */
  constructor(csvString) {
    const lines = this._trimEmptyLine(csvString).split('\n')
    this.headers = lines.shift().split(',')
    this.lines = lines
    this._validate()
  }

  _validate() {
    this._validateColumns()
  }

  /**
   * 空行を削除して配列で返します
   * @param {String} linesString
   * @returns {Array}
   */
  _trimEmptyLine (linesString) {
    const lines = []
    linesString.split('\n').forEach((line) => {
      if (line === '') return true;
      lines.push(line)
    })
    return lines.join('\n')
  }

  /**
   * headerの項目数とlinesの項目数を比較します
   *
   * @throws 不一致のレコードが一つでも存在した場合
   */
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

  _convertedLines () {
    const lines = this.lines.map((line) => {
      return this._convertedLine(line.split(','))
    })
    return lines
  }

  _convertedLine (values) {
    const entries = {}
    values.forEach((value, i) => {
      let key = this.headers[i]
      if (key.split('.').length === 1) { // 階層がない場合
        entries[key] = value
      } else {
        const splitKeys = key.split('.')
        let target = entries
        key = splitKeys.pop()
        for (let j = 0; j < splitKeys.length; j++) {
          const split_key = splitKeys[j]
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

  /**
   * カンマ区切りの文字列をObject{}の配列[]にして返します。
   * @returns {Array}
   */
  toObjectList() {
    return this._convertedLines()
  }

  /**
   * 任意のキーで重複した値があるかチェックします
   * @param list
   * @param keys Array
   * @returns {duplicated: boolean, messages: Array}
   */
  checkDuplicateValue(rows, keys) {
    const keysList = (function (keys) {
      var keys_list = {}
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        keys_list[key] = []
      }
      return keys_list
    })(keys)
    let duplicated = false
    const messages = []
    rows.forEach((entries, i) => {
      keys.forEach((key) => {
        const in_array = keysList[key].some(function (v) {
          return v === entries[key]
        })
        if (in_array === true) {
          duplicated = true
          messages.push({
            index: i,
            key: key,
            value: entries[key],
            message: 'There are duplicates'
          })
        }
        keysList[key].push(entries[key])
      })
    })
    return {
      duplicated: duplicated,
      messages: messages
    }
  }
}
