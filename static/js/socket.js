"use strict"

//socket地址 填127.0.0.1则其他设备无法使用socket
const socket=io.connect('http://183.175.12.157')

socket.on('connect',()=>{
    socket.on('rooms',(data)=>{
        console.log(data)
        socket.emit('join')
        socket.emit('init',{})

    })
})

socket.on('back',(data)=>{
    console.log(data)
})

function test() {
    socket.emit('join','sdsd')
}
