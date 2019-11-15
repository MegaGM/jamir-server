const ObjectId = require('mongodb').ObjectId

module.exports = async function ({ _id, title }, callback) {
  try {
    _id = ObjectId(_id)
    const db = await require('../../getMongoDB')()
    const res = await db.collection('address-programs').updateOne({ _id }, { $set: { title } })

    callback(null)
    this.scServer.exchange.publish('reloadAddressPrograms')
  } catch (err) {
    return callback({ message: `Не удалось обновить название Адресной Программы, по причине: ${err.message}` })
  }
}
