const db = null
const MongoClient = require('mongodb').MongoClient

module.exports = getMongoDB

async function getMongoDB() {
  if (db) {
    return db
  } else {
    db = await connectToDB()
    return db
  }
}

const mongoURL = `mongodb://${process.env.IN_DOCKER_CONTAINER ? 'mongodb' : 'localhost'}:27017`

async function connectToDB() {
  const mongodb = await MongoClient.connect(mongoURL, { useNewUrlParser: true })
  const btlDB = await mongodb.db('btl')
  return btlDB
}