const express = require('express')

const app = express()

//static : all from parcel dist
app.use(express.static('dist'))

app.get('/', function(req, res) {
    console.log('req')
    res.sendFile('dist/index.html')
})

app.listen(3000, () => console.log('Listening on port 3000'))