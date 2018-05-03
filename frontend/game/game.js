

/**
 * @type {SocketIO.Socket}
 */
const socket = io('/player')
let vueApp



document.addEventListener('DOMContentLoaded', (e) => {
  vueApp = new Vue({
    el: '#app',
    data: {
      me: {name: 'test', id: 'aasdasd', role: 'Werwolf'},
      roleVisible: false,
      players: []
    },
    methods: {
      showRole() {
        this.roleVisible = true
        setTimeout(() => this.roleVisible = false, 1000)
      }
    },
    computed: {
      playersAlive() {
        return this.players.filter(p => p.state == 1)
      }
    }
  })

  demo()

  let id = document.cookie.substring(3)
  
  socket.emit('identify', id, (data) => {
    //join successfull?
  })
})

class Player {
  constructor({name, role, id, dom, state, MenuEntries}) {
    this._name = name
    this._role = role
    this._id = id
    this._DOM = dom
    /**
   * @type {Number} state - alive: 1, dead: 0, joining: -1
   */
    this._state = state
    this._MEntries = MenuEntries
  }

  get name() {return this._name}
  get role() {return this._role}
  get id() {return this._id}
  get DOM() {return this._DOM}
  get state() {return this._state}

  set name(newName) {
    this._name = newName
    this.DOM.find('span').first().text(newName)
  }

  set role(newRole) {
    this._role = newRole
    this.DOM.find('span:eq(1)').text(newRole)
  }

  set DOM(newDom) {
    this._DOM = newDom
    //this.DOM.find('span:eq(1)').text(newRole)
  }


  /**
   * @param {Number} state - alive: 1, dead: 0, joining: -1
   */
  set state(state) {
    this._state = state
    if(state == true) {
      //move to alive list
    }
  }  
}



function demo() {
  vueApp.alivePlayers.push(new Player({
    name: 'Matthias',
    role: 'Werwolf',
    id: 'asdasd', 
    dom: undefined, 
    alive: true}))

  vueApp.deadPlayers.push(new Player({
    name: 'Joseph',
    role: 'Werwolf',
    id: 'asdasd', 
    dom: undefined, 
    alive: false}))
  
}

socket.on('session.update', (data) => {
  console.log(data)
})