const express = require('express')
const moment = require('moment')
const morgan = require('morgan')
const errorHandler = require('errorhandler')
const multerMiddleware = require('./multer')
const path = require('path')
const cors = require('cors')
// const client = require('./mongodb')
// const ObjectId = require('mongodb').ObjectId

require('./mongoose')
const User = require('./models/User')
const app = express()
const {users} = require('./exercise4/users')




app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'PUT']
}))

// MIDDLEWARE LOG
const middleware1 = (req, res, next) => {
    console.log('Middleware')
    next()
}
const middleware2 = (req, res, next) => {
    console.log(moment().format('MMMM DD YYYY, hh:mm:ss a'))
    console.log(req.originalUrl + ' '+req.ip)
    next()
}


app.use(middleware1, middleware2)
app.use(morgan('combined'))



// ROUTE

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(200).send('This is the home page')
})

app.get('/about', (req, res) => {
    res.setHeader('Content-Type', 'text/json')
    res.status(200).json({
        status: 'success',
        message: 'response success',
        description: 'Exercise #2',
        date: moment().format()
    })
})

app.put('/about', (req, res) => {
    res.setHeader('Content-Type', 'text/json')
    res.status(200).json({
        status: 'success',
        message: 'response success',
        description: 'Exercise #2',
        date: moment().format()
    })
})

// app.get('/users', (req, res) => {
//     res.setHeader('Content-Type', 'text/json')
//     if(users.length > 0) {
//         res.status(200).json(users)
//     }else {
//         res.status(404).json({
//             status: "error",
//    	        message: "terjadi kesalahan pada server",
//         })
//     }
// })


// MONGOOSE
app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json({
            message: 'List Users',
            status: 'Success',
            data: users
        })
    } catch (error) {
        res.status(501).json({
            message: 'Terjadi kesalahan',
            status: 'Error'
        })
    }
})



// MONGODB
// app.get('/users', async (req, res) => {
//     try {
//         const db = client.db('latihan')
//         const users = await db.collection('users').find().toArray()
//         res.json({
//             message: 'List Users',
//             status: 'Success',
//             data: users
//         })
//     } catch (error) {
//         res.status(501).json({
//             message: 'Terjadi kesalahan',
//             status: 'Error'
//         })
//     }
// })

app.get('/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const db = client.db('latihan')
        const user = await db.collection('users').findOne({_id: ObjectId(id)})
        console.log(id)
        res.status(200).json({
            message: 'Berhasil',
            data: user
        })

    } catch (error) {
        res.status(401).json({
            message: 'Terjadi kesalahan'
        })
    }
})

// app.post('/users', async (req, res) => {
//     try {
//         const {name, age} = req.body
//         console.log(name, age)
//         const db = client.db('latihan')
//         const createUser = await db.collection('users').insertOne({name, age})
//         res.status(201).json({
//             messaeg: 'Berhasil Menambahkan Data',
//             status: 'Success'
//         })
        
//     } catch (error) {
//         res.status(401).json({
//             message: 'Terjadi Kesalahan',
//             status: 'Error'
//         })
//     }
        
// })


// INSERT
app.post('/users',async (req, res) => {
    try {
        const {name, age} = req.body
        const db = client.db('latihan')
        const createUser = await db.collection('users').insertOne({
            name,
            age: Number(age)
        })
        console.log(createUser.acknowledged)
        if(createUser.acknowledged) {
            res.status(201).json({
                message: 'berhasil menambahkan'
            })
            
        }
    } catch (error) {
        res.status(401).json({
            message: 'Terjadi Kesalahan',
            status: 'Error'
        })
    }
})


// UPDATE
app.put('/users/:id', (req, res) => {
    try {
        const {name, age} = req.body
        const {id} = req.params
        const db = client.db('latihan')
        const updateUser = db.collection('users').updateOne({_id: ObjectId(id)}, {$set:{
            name, age
        }})
    } catch (error) {
        res.status(401).json({
            message: 'Terjadi Kesalahan',
            status: 'Error'
        })
    }
})


// DELETE


// JOIN TO ORDER


// Download 
app.get('/download', (req, res) => {
    const fileName = 'Poster_IG.jpg'
    res.download(path.join(__dirname, 'public', fileName), "PosterDown.jpg")
})



// Middleware Multer
app.use('/upload', multerMiddleware)



// MIDDLEWARE NOT FOUND

app.use((req, res, next) => {
    res.status(404).json({
        status: 'Error',
        message: 'Resource tidak di temukan!'
    })
})


const hostname = '127.0.0.1'
const port = 3002

app.listen(port, hostname, () => {
    console.log(`Server is running to http://${hostname}:${port}`)
})