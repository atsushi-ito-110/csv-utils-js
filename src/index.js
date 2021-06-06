import CsvUtils from './csvUtils.js'

// TODO: ファイルを読み込む的な感じにするのもありかも
const csvString = `
id,name,profile.birth.year,profile.birth.day,profile.blood,profile.address,hoge.fuga.hoge.fuga
1,ito,1990,06-06,O,Minato-Ku Tokyo,aaa
2,ito,1991,06-06,O,Minato-Ku Tokyo,aaa
3,ito,1991,06-06,O,Minato-Ku Tokyo,bbb
3,ito,1991,06-06,O,Minato-Ku Tokyo,bbb
3,ito,1991,06-06,O,Minato-Ku Tokyo,bbb
`

const csv = new CsvUtils(csvString)
const usres = csv.toObjectList()
// console.log('usres:', JSON.stringify(usres, null, 2))

const duplicateResult = csv.checkDuplicateValue(usres, ['id'])
console.log('duplicateResult', JSON.stringify(duplicateResult, null, 2))
