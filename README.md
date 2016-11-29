
## How to use
```
var header_line = "id,name,profile.birth.year,profile.birth.day,profile.blood,profile.address";
var lines = [
  "1,ito,1990,06-06,O,Minato-Ku Tokyo",
  "1,ito,1991,06-06,O,Minato-Ku Tokyo",
  "3,ito,1991,06-06,O,Minato-Ku Tokyo"
];
var entries_list = CsvUtils.prototype.toHashMap(header_line, lines);
console.log("entries_list: ", JSON.stringify(entries_list, null, 2));

var duplicate_result = CsvUtils.prototype.checkDuplicateValue(entries_list, [
  "id"
]);
console.log("duplicate_result: ", JSON.stringify(duplicate_result, null, 2));
```

## Log
```
entries_list:  [
  {
    "id": "1",
    "name": "ito",
    "profile": {
      "birth": {
        "year": "1990",
        "day": "06-06"
      },
      "blood": "O",
      "address": "Minato-Ku Tokyo"
    }
  },
  {
    "id": "1",
    "name": "ito",
    "profile": {
      "birth": {
        "year": "1991",
        "day": "06-06"
      },
      "blood": "O",
      "address": "Minato-Ku Tokyo"
    }
  },
  {
    "id": "3",
    "name": "ito",
    "profile": {
      "birth": {
        "year": "1991",
        "day": "06-06"
      },
      "blood": "O",
      "address": "Minato-Ku Tokyo"
    }
  }
]
duplicate_result:  {
  "is_duplicate": true,
  "messages": [
    {
      "index": 1,
      "key": "id",
      "value": "1",
      "message": "Duplicate entries"
    }
  ]
}
```
