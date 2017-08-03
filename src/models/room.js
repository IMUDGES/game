"use strict"
let Rooms = require('./server'),
    uuid = require('uuid/v4'),
    Client = require('./client'),
    console=require('tracer').console()

class Room {
    //创建房间
    constructor(type, presist) {
        this.type = type
        this.presist = presist
        this.ID = uuid().toString()
        this.clients = []

        //配置
        this.maxUser = 10
        this.map
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
        console.log(client.getID()+' 加入了房间 '+this.getRoomID())
        this.clients.push(client)
        console.log(this.getRoomData())
    }

    //获取玩家socket
    findClient(client){
        for (let i in this.clients){
            if (this.clients[i].getID()==client.id){
                return this.clients[i].socket
            }
        }
    }

    //删除玩家
    removeClient(client) {
       for(let i in this.clients){
           if (this.clients[i].getID()==client.id){
               this.clients.splice(i, 1)
           }
       }
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

    //获取本房间所有玩家信息与操作
    getPlayersData(){
        let data=[]
        for(let i in this.clients){
            let playerData=this.clients[i].getPlayerData()
            if (playerData){
                data.push(playerData)
            }
        }
        return data
    }

}
module.exports = Room
