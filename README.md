
## How to use
```
var header_line = "id,name,profile.birth.year,profile.birth.day,profile.blood,profile.address";
var lines = [
  "1,ito,1990,06-06,O,Minato-Ku Tokyo",
  "2,ito,1991,06-06,O,Minato-Ku Tokyo"
];
var entries_list = CsvUtils.prototype.toHashMap(header_line, lines);
console.log("entries_list: ", JSON.stringify(entries_list, null, 2));
```
