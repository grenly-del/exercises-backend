const http = require('http')
const moment = require('moment')
const {users} = require('./users')

const server = http.createServer((req, res) => {
    const {url} = req
    
    if(url === '/') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.write('This is the home page')
        res.end()
    }else if (url === '/about') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/json')
        res.write(JSON.stringify({
            status: 'success',
            message: 'response success',
            description: 'Exercise #2',
            date: moment().format()
        }))
        res.end()
    }else if (url === '/users') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/json')
        res.write(JSON.stringify(users))
        res.end()
    }
})

const hostname = '127.0.0.1'
const port = 3001

server.listen(port, hostname, () => {
    console.log(`Server is running to http://${hostname}:${port}`)
})