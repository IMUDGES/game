"use strict"
let Room = require('./room')
let console=require('tracer').console()

class Server {
    //构造函数
    constructor() {
        this.rooms = []
        this.roomsNumber = 0
    }

    //创建房间
    createRoom(type, presist) {
        let room = new Room(type, presist)
        this.roomsNumber++
        this.rooms.push(room)
    }

    //定时收回空闲的房间
    cleanFreeRooms() {
        setInterval(() => {
            for (let i = 0; i < this.roomsNumber; i++) {
                let data = this.rooms[i].getRoomData()
                if (data.users == 0 && !data.presist) {
                    /*if (rooms[i].dead > 10) {
                     rooms.splice(i, 1);
                     } else if (rooms[i].dead > 0) {
                     rooms[i].dead++;
                     } else {
                     rooms[i].dead = 1;
                     }*/
                    this.rooms.splice(i, 1)
                    this.roomsNumber--
                    console.log('收回房间 ' + data.id)
                }
            }

        }, 1000)
    }

    //获取所有房间信息
    getRoomData() {
        let roomsData=[]
        for (let room of this.rooms) {
            roomsData.push(room.getRoomData())
        }
        return roomsData
    }

    //匹配房间，返回房间
    findRoom(ID) {
        for (let i = 0; i < this.roomsNumber; i++) {
            if (this.rooms[i].getRoomID() == ID) {
                return this.rooms[i]
            }
        }
        return null
    }

    //获取缺省的房间ID
    getDefaultRoomID() {

        if (this.rooms.length > 0) {
            return this.rooms[0].getRoomID()
        }

        else return 0
    }

    //客户端连接
    connect(client){
        console.log('connection established. ip: '+client.conn.remoteAddress)

        //向客户端返回房间信息
        client.emit('rooms',this.getRoomData())
        // let roomID=client.handshake.query.roomID||this.getDefaultRoomID()
        // let room=this.findRoom(roomID)
        // room.addClient(client)
        //room.removeClient(client)
        // setTimeout(()=>{
        //     console.log(this.getRoomData())
        // },500)

        //加入游戏事件
        client.on('join',(data)=>{
             let roomID=client.handshake.query.roomID||data.roomID||this.getDefaultRoomID()
             let room=this.findRoom(roomID)

            room.addClient(client)

            client.on('disconnect',()=>{
                console.log('客户端断开连接')
                room.removeClient(client)
            })
        })
    }

}
let server = new Server()
server.cleanFreeRooms()

module.exports = server