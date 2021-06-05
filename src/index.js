import CsvUtils from './csvUtils.js'

const csvString = `id,name,profile.birth.year,profile.birth.day,profile.blood,profile.address
1,ito,1990,06-06,O,Minato-Ku Tokyo
2,ito,1991,06-06,O,Minato-Ku Tokyo
3,ito,1991,06-06,O,Minato-Ku Tokyo
`

const csv = new CsvUtils(csvString);
const entries = csv.toObjectList()
console.log('entries_list:', JSON.stringify(entries, null, 2))

const duplicateResult = csv.checkDuplicateValue(
  entries, ['id']
);
console.log('duplicate_result', JSON.stringify(duplicateResult, null, 2));
