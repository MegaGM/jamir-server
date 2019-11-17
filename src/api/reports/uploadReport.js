const ObjectId = require('mongodb').ObjectId
const fs = require('fs-extra')
const path = require('path')

module.exports = async function ({ files, addressProgramId, rowId }, callback) {
  try {
    const workerId = '521ewf98wef9v3vashya' || this.socket.authToken.user._id
    const addressProgramRowFiles = await Promise.all(files.map(async (file, index) => {
      const split = file.base64.split(',')[1] // get rid of base64URL scheme header
      const rowFile = {
        fs: `${++index}${path.parse(file.name).ext}`,
        name: file.name,
        size: Math.ceil(split.length / 4 * 3),
      }
      await fs.outputFile(`/btl/reports/${addressProgramId}/${rowId}/${rowFile.fs}`, split, { encoding: 'base64' })
      return rowFile
    }))

    const db = await require('../../getMongoDB')()
    const res = await db
      .collection(addressProgramId)
      .updateOne({ _id: ObjectId(rowId) }, {
        $set: {
          reported: true,
          timeOfReport: new Date().getTime(),
          checked: false,
          workerId,
          comment: '',
          valid: true,
          duplicate: false,
          files: addressProgramRowFiles,
        }
      })

    callback(null)
    // this.scServer.exchange.publish('reloadAddressPrograms')
  } catch (err) {
    return callback({ message: `Не удалось сохранить файл "${title}" в базу данных, по причине: ${err.message}` })
  }
}
