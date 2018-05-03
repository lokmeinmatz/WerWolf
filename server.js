const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const sha1 = require('sha1')

const GameSession = require(__dirname+'/server/GameSession.js')
GameSession.reset()


const Users = require(__dirname+'/server/Users.js')

//load admin manager
const admin = require('./server/AdminSocket')


/**
 * @type {Users.User[]}
 */
let users = []

const app = express()

const socket = require('socket.io')

//static : all from parcel dist
app.use(express.static(__dirname+'/frontend'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
//parse json data from post
app.use(bodyParser.json())

//Security
app.use(helmet())

app.use(cookieParser())

/*

    Server Code

*/

//update server cookies???
function getUser(id) {
  return users.find(u => u.id == id)
}

app.get('/', function(req, res) {

  console.log('req')
  if(!req.cookies.id || getUser(req.cookies.id) == undefined){
    return res.sendFile(__dirname+'/frontend/join/join.html')
  }
  else{
    return res.sendFile(__dirname+'/frontend/game/game.html')
  }
  
})

app.get('/admin', function(req, res) {
    //console.log(req.cookies)
    //console.log(users)
    let id = req.cookies.id
    if(id && getUser(id) != undefined && getUser(id).state == Users.ADMIN) {
        //admin was allready logged in
        return res.sendFile(__dirname+'/frontend/admin/admin.html')
    }
    else {
        res.clearCookie('id')
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
            if(!req.cookies.id){
              const hash = sha1(new Date().getTime().toString())

              //console.log("New ID "+hash)
              //set hash
              res.cookie('id', hash)
              users.push(new Users.User(hash, req.body.username, Users.ADMIN))

              //console.log(users)
              return res.send({userValid: true, PINvalid: true, reload: true})
            }
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

    if(req.body.groupID != GameSession.id || getUser(req.cookies.id) != undefined) {
        //wrong session
        return res.send({groupValid: false, nameValid: getUser(req.cookies.id) == undefined})
    }

    console.log(`Joining ${req.body.groupID} as ${req.body.nickname}`)

    //generate user id
    const uID = sha1(req.body.nickname + new Date().toDateString())

    res.cookie('id', uID)
    users.push(new Users.User(uID, req.body.username, Users.PLAYER))

    return res.send({groupValid: true, nameValid: true})
})


const server = app.listen(3000, () => console.log('Visit on http://localhost:3000/'))
const io = socket(server)

admin.initAdminSocket(io)

//console.log(admin.getAdminSocket())
