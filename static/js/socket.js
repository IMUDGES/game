"use strict"

const socket=io.connect('http://localhost')

socket.on('connect',()=>{
    socket.emit('join','Hello World from client')
})

