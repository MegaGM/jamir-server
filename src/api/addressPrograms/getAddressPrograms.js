module.exports = async function ({ offset, order, limit }, callback) {
  try {
    const db = await require('../../getMongoDB')()
    const c = await db.collection('address-programs').find()
    const addressProgramsCount = await c.count()
    let addressPrograms = await c.skip(offset).sort(order).limit(limit).toArray()
    addressPrograms = addressPrograms.map(require('./decorateAddressProgramsForBrowserClient'))
    callback(null, { addressProgramsCount, addressPrograms })
  } catch (err) {
    return callback({ message: `Не удалось получить Адресные Программы из базы данных, по причине: ${err.message}` })
  }
}