const MongoClient = require('mongodb').MongoClient
let db = null

module.exports = getMongoDB

async function getMongoDB() {
  if (db) {
    return db
  } else {
    db = await connectToDB()
    return db
  }
}

async function connectToDB() {
  const mongoURL = `mongodb://${process.env.IN_DOCKER_CONTAINER === 'true' ? 'mongodb' : 'localhost'}:27017`
  const options = { useNewUrlParser: true, useUnifiedTopology: true }
  const mongodb = await MongoClient.connect(mongoURL, options)
  const btlDB = await mongodb.db('btl')
  return btlDB
}