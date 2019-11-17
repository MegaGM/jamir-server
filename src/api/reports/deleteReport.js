const ObjectId = require('mongodb').ObjectId
const fs = require('fs-extra')

module.exports = async function ({ addressProgramId, rowId }, callback) {
  try {
    await fs.remove(`/btl/reports/${addressProgramId}/${rowId}`)

    const db = await require('../../getMongoDB')()
    const res = await db
      .collection(addressProgramId)
      .updateOne({ _id: ObjectId(rowId) }, {
        $unset: {
          reported: null,
          timeOfReport: null,
          checked: null,
          workerId: null,
          comment: null,
          valid: null,
          duplicate: null,
          files: null,
        }
      })

    callback(null)
    // this.scServer.exchange.publish('reloadAddressPrograms')
  } catch (err) {
    return callback({ message: `Не удалось сохранить файл "${title}" в базу данных, по причине: ${err.message}` })
  }
}
