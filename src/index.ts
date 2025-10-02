
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req:any, res:any) => {
    let message ='kiryl 22'
    res.send(message)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})