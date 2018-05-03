
/**
 * @type {SocketIO.Socket}
 */
const socket = io('/admin')
let contextMenu
let lastOpt



/**
 * @type {Player[]} alive players
 */
const alivePlayers = []


/**
 * @type {Player[]} alive players
 */
const deadPlayers = []

/**
 * @type {Player[]} players who join the game, need to be accepted
 */
const joinPlayers = []

/**
 * @param {Player} player the player to add
 */
alivePlayers.DOMid = '#pLa'
deadPlayers.DOMid = '#pLd'
alivePlayers.addPlayer = function(player) {
  if(!player) return

  if(this.find(v => v.name == player.name)) return //allready there
  this.push(player)
  
  const list = $('.playerList' + this.DOMid)

  const li = $('<li class="player">')
  li.append($(`<span>${player.name}</span>`))
  li.append($(`<span>${player.role}</span>`))
  li.append($('<div class="options">◄</div>'))
  $(this.DOMid).append(li)
  player.DOM = li


  //update alive and dead players
  $('#players h2:first').text(`Spieler | ${alivePlayers.length} ❤️ | ${deadPlayers.length} ⚰️`)

  //menu
  const opt = li.find('.options')
  opt.click(function(e) {
    if(lastOpt == opt) {
      contextMenu.removeClass('active')
      opt.text('◄')
      lastOpt = null
      return
    }

    contextMenu.setContext(player._MEntries)

    contextMenu.addClass('active')
    contextMenu.css('top', opt.offset().top + 'px')
    contextMenu.css('right', (window.innerWidth - opt.offset().left).toString() + 'px')
    opt.text('►')

    if(lastOpt)lastOpt.text('◄')

    lastOpt = opt
  })
}


/**
 * @param {number | Player} val The index or Player-object to remove
 */
alivePlayers.removePlayer = function(val) {
  let player 
  if(typeof val == 'number') {
    player = this.splice(val, 1)[0]
  }
  else {
    const index = this.indexOf(val)
    player = this.splice(index, 1)[0]
  }
  //console.log(player)
  player.DOM.remove()
  return player
}

deadPlayers.addPlayer = alivePlayers.addPlayer.bind(deadPlayers)
deadPlayers.removePlayer = alivePlayers.removePlayer.bind(deadPlayers)

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

$(function() {
  demo()


  contextMenu = $('.context-menu').first()

  /**
   * 
   * @param {MenuEntry[]} menuEntries 
   */
  contextMenu.setContext = function(menuEntries) {
    const ul = contextMenu.find('ul')
    ul.empty()
    
    if(!menuEntries) {
      ul.append($('<li>Nachricht senden</li>'))
      ul.append($('<li>Verlauf anzeigen</li>'))
      ul.append($('<li>Spieler entfernen</li>'))

      return
    }


    for(let entry of menuEntries) {
      
      const li = $(`<li>${entry.name}`)
      li.click(function() {
        entry.callback()
      })
      ul.append(li)
    }
  }
  
  let id = document.cookie.substring(3)
  
  socket.emit('identify', id, (data) => {
    //join successfull?
  })
})


function demo() {
  alivePlayers.addPlayer(new Player({
    name: 'Matthias',
    role: 'Werwolf',
    id: 'asdasd', 
    dom: undefined, 
    alive: true}))

  deadPlayers.addPlayer(new Player({
    name: 'Joseph',
    role: 'Werwolf',
    id: 'asdasd', 
    dom: undefined, 
    alive: false}))
  
}

socket.on('session.update', (data) => {
  console.log(data)
})