"use strict"
let Room = require('./room')


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

    getRoomData() {
        for (let room of this.rooms) {
            console.log(room.getRoomData())
        }
    }

    findRoom(ID) {
        for (let i = 0; i < this.roomsNumber; i++) {
            if (this.rooms[i].getRoomID() == ID) {
                return this.rooms[i]
            }
        }
        return null
    }

    getDefaultRoomID() {

        if (this.rooms.length > 0) {
            return this.rooms[0].getRoomID()
        }

        else return 0
    }

    //客户端连接
    connect(client){
        console.log('connection established. ip: '+client.handshake.address)

        let roomID=client.handshake.query.roomID||this.getDefaultRoomID()
        let room=this.findRoom(roomID)

        room.addClient(client)
    }

}
let server = new Server()
server.cleanFreeRooms()

module.exports = server