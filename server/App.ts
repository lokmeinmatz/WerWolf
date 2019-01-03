import * as sio from 'socket.io'


class App {
  public socket : sio.Server

  constructor() {
    this.socket = sio.listen(3000)
    console.log(`SocketIO listening on ${this.socket.path()}`)
    this.socket.on('connection', client => {
      console.log("new client")
    })

  }
}

export default new App()