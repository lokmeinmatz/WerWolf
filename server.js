const express = require('express')
const bodyParser = require('body-parser')

const GameSession = require(__dirname+'/GameSession.js')

let gameSessions = new Map()

const app = express()

//static : all from parcel dist
app.use(express.static(__dirname+'/frontend'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
//parse json data from post
app.use(bodyParser.json())

app.get('/', function(req, res) {
    console.log('req')
    res.sendFile(__dirname+'/frontend/join/join.html')
})


app.get('/create', function(req, res) {
    console.log('req')
    res.sendFile(__dirname+'/frontend/create/create.html')
})


app.post('/join', function(req, res) {
    console.log('join rquest')
    if(!req.body || !req.body.groupID || !req.body.nickname) return res.sendStatus(400)

    if(!gameSessions.has(req.body.groupID)) {
        //wrong session
        return res.send({groupValid: false, nameValid: req.body.nickname == 'Mat'})
    }

    console.log(`Joining ${req.body.groupID} as ${req.body.nickname}`)
})

app.listen(3000, () => console.log('Listening on port 3000'))