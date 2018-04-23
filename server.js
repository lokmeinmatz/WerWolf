const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

const GameSession = require(__dirname+'/server/GameSession.js')
const User = require(__dirname+'/server/User.js')

let gameSessions = new Map()
let users = new Map()

const app = express()

//static : all from parcel dist
app.use(express.static(__dirname+'/frontend'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
//parse json data from post
app.use(bodyParser.json())

//Security
app.use(helmet())

app.use(cookieSession({
    name: 'session',
    secret: 'Alba12323',
    maxAge: 1000*60*20
}))

/*

    Server Code

*/

//update server cookies???


app.get('/', function(req, res) {

    console.log('req')
    res.sendFile(__dirname+'/frontend/join/join.html')
})


app.get('/admin', function(req, res) {
    console.log('req')
    if(req.session.id && users.has(req.session.id) && users.get(req.session.id)) {
        //admin was allready logged in
        return res.sendFile(__dirname+'/admin/admin.html')
    }
    res.sendFile(__dirname+'/frontend/create/create.html')
})

app.post('/login', function(req, res) {

    //let admin login

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

app.listen(3000, () => console.log('Visit on http://localhost:3000/'))