"use strict"
let Rooms = require('./server'),
    uuid = require('uuid/v4'),
    Client = require('./client')

class Room {
    //创建房间
    constructor(type, presist) {
        this.type = type
        this.presist = presist
        this.ID = uuid().toString()
        this.clients = []

        //配置
        this.maxUser = 10
    }

    setConfig(code) {
        this.code = code
    }

    //添加玩家
    addClient(socket) {

        if (this.clients.length >= this.maxUser) {
            socket.emit('joinFail', '加入失败，服务器已满')
            return
        }

        let client = new Client(socket)

        this.clients.push(client)

    }

    //获取玩家socket
    findClientSocket(client){
        for (let i in this.clients){
            if (this.clients[i].getID()==client.id){
                return this.clients[i].socket
            }
        }
    }

    //删除玩家
    removeClient(client) {
       console.log(1)
    }

    //获取本房间信息
    getRoomData() {
        let rData = {}
        rData.ID = this.ID
        rData.users = this.clients.length || 0
        rData.type = this.type
        rData.presist = this.presist
        return rData
    }

    //获取本房间ID
    getRoomID() {
        return this.ID
    }

}
module.exports = Room
