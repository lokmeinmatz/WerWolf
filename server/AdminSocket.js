const gameSession = require('./GameSession')

/**
 * @type {SocketIO.Socket}
 */
let AdminSocket

/**
 * 
 * @param {SocketIO.Server} io 
 */
function initAdminSocket(io) {
  AdminSocket = io.of('/admin')
  //console.log(AdminSocket)
  AdminSocket.on('connection', (socket) => {
    
    socket.emit('session.update', {id: gameSession.id})
  })
}

function getAdminSocket() {
  return AdminSocket
}

module.exports.initAdminSocket = initAdminSocket
module.exports.getAdminSocket = getAdminSocket