import fs from 'fs'
import CsvUtils from './csvUtils.js'

const fileBody = fs.readFileSync('./data/success.csv', 'utf-8')
console.log('fileBody', fileBody)

const csv = new CsvUtils(fileBody)
const usres = csv.toObjectList()
console.log('usres:', JSON.stringify(usres, null, 2))

// カラム数などチェックする場合これ
// const duplicateResult = csv.checkDuplicateValue(usres, ['id', 'name'])
// console.log('duplicateResult', JSON.stringify(duplicateResult, null, 2))
