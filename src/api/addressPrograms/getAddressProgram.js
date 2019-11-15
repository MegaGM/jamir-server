module.exports = async function ({ _id, title }, callback) {
  // try {
  //   const db = await require('../../getMongoDB')()

  //   let rows = null
  //   if (_id) {
  //     rows = await db.collection(_id).find().toArray()
  //   }
  //   else if (title) {
  //     const addressProgram = await db.collection('address-programs').findOne({ title })
  //     rows = await db.collection(addressProgram._id.toString()).find().toArray()
  //   }

  //   callback(null, addressProgram)
  // } catch (err) {
  //   return callback({ message: `Не удалось сохранить файл "${title}" в базу данных, по причине: ${err.message}` })
  // }
}
