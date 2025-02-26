const express = require('express')
const moment = require('moment')
const morgan = require('morgan')
const errorHandler = require('errorhandler')
const path = require('path')

const app = express()
const {users} = require('./exercise4/users')




app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))


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


app.get('/users', (req, res) => {
    res.setHeader('Content-Type', 'text/json')
    if(users.length > 0) {
        res.status(200).json(users)
    }else {
        res.status(404).json({
            status: "error",
   	        message: "terjadi kesalahan pada server",
        })
    }
})

app.get('/download', (req, res) => {
    const fileName = 'Poster_IG.jpg'
    res.download(path.join(__dirname, 'public', fileName), "PosterDown.jpg")
})




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