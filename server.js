const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

const bcrypt = require('bcrypt')

const GameSession = require(__dirname+'/server/GameSession.js')
const Users = require(__dirname+'/server/Users.js')
let users = new Map()

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

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
    console.log(req.session)
    console.log(users)
    if(req.session.id && users.has(req.session.id) && users.get(req.session.id).state == Users.ADMIN) {
        //admin was allready logged in
        return res.sendFile(__dirname+'/frontend/admin/admin.html')
    }
    else {
        req.session.id = null
    }
    res.sendFile(__dirname+'/frontend/admin/login.html')
})

app.post('/admin/login', function(req, res) {

    console.log("Admin tries to login")
    if(!req.body.username || !req.body.PIN) {
        return res.send({userValid: false, PINvalid: false, reload: false})
    }
    //let admin login
    if(Users.VALID_ADMINS.has(req.body.username)) {
        //user is allowed to join
        //chekc if creators id is valid
        if(req.body.PIN == 'kartoffelsalat') {
            //create cookie id
            if(!req.session.id)bcrypt.hash(new Date().getTime().toString(), 1, (err, hash) => {
                console.log("New ID "+hash)
                //set hash
                req.session.id = hash
                users.set(hash, new Users.User(hash, req.body.username, Users.ADMIN))

                console.log(users)
                return res.send({userValid: true, PINvalid: true, reload: true})
            })
        }
        else {
            return res.send({userValid: true, PINvalid: false, reload: false})
        }
    }
    else return res.send({userValid: false, PINvalid: true, reload: false})

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



io.on('connection', function(socket) {

  //check if user is known
  console.log(socket.request)
    
})