const XLSX = require('xlsx')
const fs = require('fs-extra')

module.exports = uploadAdressProgram

function uploadAdressProgram({ name, file }, callback) {
  const split = file.split(',')[1] // get rid of base64URL scheme header

  const parsed = XLSX.read(split, { type: 'base64' })
  const firstSheet = parsed.Sheets[parsed.SheetNames[0]]
  fs.writeFileSync('./.result.txt', JSON.stringify(firstSheet))
  // console.info('firstShieet: ', firstSheet)
  // const result = XLSX.utils.sheet_to_json(firstSheet)
  // console.info('result: ', result)
  // fs.writeFileSync('./.result.txt', JSON.stringify(result))

  // callback({ message: `Не удалось распарсить файл "${name}"` }, 'got your file')
  callback(null, 'got your file')
}
