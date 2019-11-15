module.exports = async function ({ offset, limit, order }, callback) {
  try {
    const db = await require('../../getMongoDB')()
    const c = await db.collection('address-programs').find()
    const addressProgramsCount = await c.count()
    const addressPrograms = await c.skip(offset).limit(limit).sort(order).toArray()
    callback(null, { addressProgramsCount, addressPrograms })
  } catch (err) {
    return callback({ message: `Не удалось получить Адресные Программы из базы данных, по причине: ${err.message}` })
  }
}