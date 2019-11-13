const XLSX = require('xlsx')

module.exports = uploadAddressProgram

async function uploadAddressProgram({ name, file }, callback) {
  try {
    const db = await require('../getMongoDB')()

    const split = file.split(',')[1] // get rid of base64URL scheme header
    const parsedXLSX = XLSX.read(split, { type: 'base64' })
    const base = parsedXLSX.Sheets['база']

    const DBDocuments = []
    for (const entry of base) {
      const DBDocument = {
        city: entry['Город'],
        address: entry['Адрес'],
      }
      DBDocuments.push(DBDocument)
    }
    // db.collection('address-program-0')
  } catch (err) {
    callback({ message: `Не удалось распарсить файл "${name}", по причине: ${err.message}` })
  }

  callback(null, 'got your file')
}
