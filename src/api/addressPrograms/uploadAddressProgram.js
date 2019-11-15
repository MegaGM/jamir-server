const XLSX = require('xlsx')

module.exports = async function ({ title, file }, callback) {
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
        throw new Error(`Отсутствует поле "Город" в строке ${JSON.stringify(entry)}`)
      }
      if (!entry['Адрес']) {
        throw new Error(`Отсутствует поле "Адрес" в строке ${JSON.stringify(entry)}`)
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
    const db = await require('../../getMongoDB')()
    const ap = {
      title: title.replace('.xlsx', ''),
      rowCount: DBDocuments.length,
      // the following values are being injected by "decorateAddressProgramsForBrowserClient" decorator
      // editable
      // humanReadableTimestamp
    }
    const res = await db.collection('address-programs').insertOne(ap)
    const apId = res.insertedId.toString()
    const res2 = await db.collection(apId).insertMany(DBDocuments)

    callback(null)
    this.scServer.exchange.publish('reloadAddressPrograms')
  } catch (err) {
    return callback({ message: `Не удалось сохранить файл "${title}" в базу данных, по причине: ${err.message}` })
  }
}
