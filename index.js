
const express = require('express')
const app = express()


// Routing
app.get('/', (req, res) => {
    res.write('Hello World')
    res.end()
})

app.get('/about', (req, res) => {
    res.status(200).json({
        status: "success",
        message: "About page",
        data: []
    })
})

app.patch('/contoh', (req, res) => {
    res.send('Request contoh dengan method PATCH')  
})
app.post('/contoh', (req, res) => {
    res.send('Request contoh dengan method POST')
})

app.put('/contoh', (req,res) => {
    res.send('Request contoh dengan PUT')
})

app.delete('/contoh', (req, res) => {
    res.send('Request contoh dengan Delete')
})

// Routing Semua Method
app.all('/universal', (req, res) => {
    res.send(`Request method ${req.method}`)
})

// Routing Dinamis
// 1. Menggunakan params

app.get('/post/:id', (req, res) => {
    res.send(`Artikel ke - ${req.params.id}`)
})

// 2. Menggunakan Query String

app.get('/post', (req, res) => {
    const {page, sort} = req.query
    res.send(`Artikel di page - ${page} dan sort - ${sort}`)
})




// Config Server

const hostname = '127.0.0.1'
const port = 3002

app.listen(port, hostname, () => {
    console.log(`Server is running to http://${hostname}:${port}`)
})