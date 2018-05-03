

/**
 * @type {SocketIO.Socket}
 */
const socket = io('/admin')

/**
 * @type {HTMLLIElement}
 */
let lastOpt

let vueApp

document.addEventListener('DOMContentLoaded', (e) => {
  vueApp = new Vue({
    el: '#content',
    data: {
      optX: 0,
      optY: 0,
      players: [],
      optionVisible: false,
      options: [new MenuEntry('Nachricht senden'),
                new MenuEntry('Spieler töten')]
    },
    methods: {
      //Toggle context menu
      opt: function(e) {
        if(e.target == lastOpt){
          //toggle
          this.optionVisible = !this.optionVisible
        }
        else {
          this.optionVisible = true
        }
        //Set position
        if(this.optionVisible) {
          
          //get position on page
          let bb = e.target.getBoundingClientRect()
          let top = bb.top + window.pageYOffset
          let right = window.innerWidth - bb.left
          console.log(bb)
          this.optX = right
          this.optY = top
        }
        lastOpt = e.target
      }
    },
    computed: {
      alivePlayers() {
        return this.players.filter(p => p.state == 1)
      },
      deadPlayers() {
        return this.players.filter(p => p.state == 0)
      },
      joinedPlayers() {
        return this.players.filter(p => p.state == -1)
      }
    }
  })

  demo()

  let id = document.cookie.substring(3)
  
  socket.emit('identify', id, (data) => {
    //join successfull?
  })
})


class MenuEntry {
  constructor(name, callback) {
    this.name = name
    this.callback = callback
  }
}

class Player {
  constructor({name, role, id, dom, state, MenuEntries}) {
    this._name = name
    this._role = role
    this._id = id
    this._DOM = dom
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
   * @param {Numver} state - alive 1 dead 0 joining -1
   */
  set state(state) {
    this._state = state
  }  
}




function demo() {
  vueApp.players.push(new Player({
    name: 'Matthias',
    role: 'Werwolf',
    id: 'asdasd', 
    dom: undefined, 
    state: 1}))

  vueApp.players.push(new Player({
    name: 'Joseph',
    role: 'Werwolf',
    id: 'asdasd', 
    dom: undefined, 
    state: 0}))

  vueApp.players.push(new Player({
    name: 'kasa',
    role: 'Werasdasdaswolf',
    id: 'asdasd', 
    dom: undefined, 
    state: -1}))
  
}

socket.on('session.update', (data) => {
  console.log(data)
})