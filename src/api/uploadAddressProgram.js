const XLSX = require('xlsx')

module.exports = uploadAddressProgram

async function uploadAddressProgram({ title, file }, callback) {
  const DBDocuments = []

  try {
    const split = file.split(',')[1] // get rid of base64URL scheme header
    const parsedXLSX = XLSX.read(split, { type: 'base64' })
    const base = parsedXLSX.Sheets['база']
    if (!base) {
      throw new Error('В файле отсутствует страница с названием "база"')
    }
    const baseJSON = XLSX.utils.sheet_to_json(base)

    for (const entry of baseJSON) {
      if (!entry['Город']) {
        throw new Error(`В строке ${JSON.stringify(entry)} отсутствует поле "Город"`)
      }
      if (!entry['Адрес']) {
        throw new Error(`В строке ${JSON.stringify(entry)} отсутствует поле "Адрес"`)
      }

      const DBDocument = {
        city: entry['Город'],
        address: entry['Адрес'],
      }
      DBDocuments.push(DBDocument)
    }
  } catch (err) {
    return callback({ message: `Не удалось распарсить файл "${title}", по причине: ${err.message}` })
  }

  try {
    const db = await require('../getMongoDB')()
    const res = await db.collection('address-programs').insertOne({ title, rows: DBDocuments.length })
    const newAddressProgramId = res.insertedId.toString()
    const res2 = await db.collection(newAddressProgramId).insertMany(DBDocuments)
  } catch (err) {
    return callback({ message: `Не удалось сохранить файл "${title}" в базу данных, по причине: ${err.message}` })
  }

  callback(null)
}
