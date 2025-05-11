const mongoose = require('mongoose')

// Buat Schema
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    status: String
})

// Buat Model
const User = mongoose.model('user', UserSchema)

module.exports = User