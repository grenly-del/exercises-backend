const MongoClient = require('mongodb').MongoClient
const connectingString = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(connectingString)

const connected = async () => {
    try {
        await client.connect()
        console.log('Connection Success')
    } catch (error) {
        console.error(error)
    }
}

connected()
module.exports = client