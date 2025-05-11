const fs = require('fs')
const {Router} = require('express')
const multer = require('multer')

const store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


const upload = multer({
    storage: store,
    limits: {
        fileSize: 4000000 
    },
    fileFilter: (req, file, cb) => {
        if(!file.mimetype.includes("image")) {
            return cb(null, false)
        }else {
            return cb(null, true)
        }
    }
})















const route = Router()


route.post('/', upload.single('file'), (req, res) => {
    try {
        const file = req.file
        console.log(file)
        res.send('berhasil')
    } catch (error) {
        res.send('Gagal')
    }
})


module.exports = route