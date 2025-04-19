const express = require('express')
const app = express()
const cors = require("cors")
const morgan = require('morgan')
const client = require('../mongodb')
const moment = require('moment')
const ObjectId = require('mongodb').ObjectId



app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'PUT']
}))

// MIDDLEWARE LOG
const middleware2 = (req, res, next) => {
    console.log(moment().format('MMMM DD YYYY, hh:mm:ss a'))
    console.log(req.originalUrl + ' '+req.ip)
    next()
}


app.use(middleware2)

// Middleware Morgan
app.use(morgan('combined'))



// Check API
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Berhasil"
    })
})


// READ USER
app.get('/users', async (req, res) => {
    try {
        const db = client.db('latihan')
        const users = await db.collection('users').find().toArray()
        res.json({
            message: 'List Users',
            status: 'Success',
            data: users,
            length: users.length
        })
    } catch (error) {
        res.status(501).json({
            message: 'Terjadi kesalahan',
            status: 'Error'
        })
    }
})


app.get('/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        
        const db = client.db('latihan')
        const user = await db.collection('users').findOne({_id: new ObjectId(id)})
        
        res.status(200).json({
            message: 'Berhasil',
            data: user
        })

    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: 'Terjadi kesalahan'
        })
    }
})




// INSERT USER
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



// UPDATE ORDER
app.post('/orders/:id', async (req, res) => {
    try {
        const {product, price} = req.body
        const {id} = req.params
        const db = client.db('latihan')
        const createOrder = await db.collection('order').insertOne({
            userId: new ObjectId(id),
            product: product,
            price: Number(price)
        })
        if(createOrder.acknowledged) {
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


// UPDATE USER
app.put('/users/:id', async (req, res) => {
    try {
        const {name, age} = req.body
        const {id} = req.params
        const db = client.db('latihan')
        const updateUser = await db.collection('users').updateOne({_id: new ObjectId(id)}, {$set:{
            name, age: Number(age)
        }})

        if(updateUser.acknowledged && updateUser.matchedCount > 0) {
            res.status(200).json({
                message: 'Berhasil merubah'
            })
        }

    } catch (error) {
        res.status(401).json({
            message: 'Terjadi Kesalahan',
            status: 'Error'
        })
    }
})




// DELETE USER
app.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const db = client.db('latihan')
        const deleteUser = await db.collection('users').deleteOne({_id: new ObjectId(id)})
        console.log(deleteUser)
        if(deleteUser.acknowledged && deleteUser.deletedCount > 0) {
            res.status(200).json({
                message: 'Berhasil menghapus data'
            })
        }
    } catch (error) {
        res.status(401).json({
            message: 'Terjadi kesalahan!'
        })
    }
})




app.get('/orders/:id', async (req, res) => {
    try {
        const db = client.db('latihan')
        const orders = await db.collection('order').aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            }
        ]).toArray()
        console.log(orders)
        if(orders.length > 0) {
            res.status(200).json({
                message: 'Berhasil melakukan join',
                data: orders
            })
        }else {
            res.status(200).json({
                message: 'Berhasil melakukan join'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: 'Terjadi kesalahan!'
        })
    }
})

app.use((req, res, next) => {
    res.status(404).json({
        status: 'Error',
        message: 'Resource tidak di temukan!'
    })
})


const port = 3002

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})