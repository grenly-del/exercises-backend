const mongoose = require('mongoose')

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/latihan')
        console.log('Berhasil tekoneksi ke database')
    } catch (error) {
        console.log('Koneksi database terputus')
    }
}

main()