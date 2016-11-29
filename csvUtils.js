var CsvUtils = function () {
};

/**
 * カンマ区切りの文字列を連想配列のリストにして返します。
 * @param {String} header_line
 * @param {String} lines
 * @returns {Array}
 */
CsvUtils.prototype.toHashMap = function (header_line, lines) {
  try {
    var createEntries = function (headers, columns) {
      var entries = {};
      for (var i = 0; i < columns.length; i++) {
        var key = headers[i];
        var value = columns[i];
        if (key.split(".").length <= 1) {
          entries[key] = value;
          continue;
        }

        var split_keys = key.split(".");
        var target = entries;
        key = split_keys.pop();
        for (var j = 0; j < split_keys.length; j++) {
          var split_key = split_keys[j];
          if (!target[split_key]) {
            target[split_key] = {};
          }
          target = target[split_key];
        }
        target[key] = value;
      }
      return entries;
    };

    var headers = header_line.split(",");
    var entries_list = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var columns = line.split(",");
      var entries = createEntries(headers, columns);
      entries_list.push(entries);
    }

    return entries_list;
  } catch (e) {
    throw e;
  }
};

/**
 * 連想配列のリストから任意のキーで重複した値があるかチェックします
 * @param list
 * @param keys Array
 * @returns {{is_duplicate: boolean, messages: Array}}
 */
CsvUtils.prototype.checkDuplicateValue = function (list, keys) {

  try {
    var is_duplicate = false;
    var messages = [];
    var keys_list = (function (keys) {
      var keys_list = {};
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        keys_list[key] = [];
      }
      return keys_list;
    })(keys);


    for (var i = 0; i < entries_list.length; i++) {
      var entries = entries_list[i];

      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        var in_array = keys_list[key].some(function(v) {
          return v === entries[key]
        });
        if (in_array === true) {
          is_duplicate = true;
          var message = {
            "index": i,
            "key": key,
            "value": entries[key],
            "message": "Duplicate entries"
          };
          messages.push(message);
        }
        keys_list[key].push(entries[key]);
      }
    }
    return {
      "is_duplicate": is_duplicate,
      "messages": messages
    };
  } catch (e) {
    throw e;
  }
};
