
const express = require('express')
const app = express()





const hostname = '127.0.0.1'
const port = 3002

app.listen(port, hostname, () => {
    console.log(`Server is running to http://${hostname}:${port}`)
})