const socket = io.connect() 

$(function() {
  let id = document.cookie.substring(3)
  
  socket.emit('identify', id, (data) => {
    //join successfull?
  })
})