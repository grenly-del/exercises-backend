const express = require('express')
const moment = require('moment')
const app = express()
const {users} = require('./users')

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
    res.status(200).json(users)
})



const hostname = '127.0.0.1'
const port = 3002

app.listen(port, hostname, () => {
    console.log(`Server is running to http://${hostname}:${port}`)
})