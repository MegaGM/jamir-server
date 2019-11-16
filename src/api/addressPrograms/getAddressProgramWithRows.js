const ObjectId = require('mongodb').ObjectId

module.exports = async function ({ _id, query, offset, order, limit }, callback) {
  try {
    const db = await require('../../getMongoDB')()
    const addressProgram = await db.collection('address-programs').findOne({ _id: ObjectId(_id) })

    const c = await db.collection(_id).find(query)
    addressProgram.queriedRowCount = await c.count()
    addressProgram.rows = await c.skip(offset).sort(order).limit(limit).toArray()

    callback(null, addressProgram)
  } catch (err) {
    return callback({ message: `Не удалось получить Адресную Программу из базы данных, по причине: ${err.message}` })
  }
}
