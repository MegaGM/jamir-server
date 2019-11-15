const ObjectId = require('mongodb').ObjectId

module.exports = async function ({ _id }, callback) {
  try {
    _id = ObjectId(_id)
    const db = await require('../../getMongoDB')()
    const res = await db.collection('address-programs').deleteOne({ _id })

    callback(null)
    this.scServer.exchange.publish('reloadAddressPrograms')
  } catch (err) {
    return callback({ message: `Не удалось удалить Адресную Программу, по причине: ${err.message}` })
  }
}
