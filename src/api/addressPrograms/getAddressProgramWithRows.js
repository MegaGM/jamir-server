const ObjectId = require('mongodb').ObjectId

module.exports = async function ({ _id, offset, order, limit }, callback) {
  try {
    const db = await require('../../getMongoDB')()
    const addressProgram = await db.collection('address-programs').findOne({ _id: ObjectId(_id) })
    const addressProgramRows = await db.collection(_id).find().skip(offset).sort(order).limit(limit).toArray()
    addressProgram.rows = addressProgramRows
    callback(null, addressProgram)
  } catch (err) {
    return callback({ message: `Не удалось получить Адресную Программу из базы данных, по причине: ${err.message}` })
  }
}
