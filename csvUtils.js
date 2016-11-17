var CsvUtils = function () {
};

// toHashMap
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
