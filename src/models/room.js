"use strict"
let Rooms = require('./rooms')

class Room {
    //创建房间
    constructor(type, presist) {
        this.type = type
        this.presist = presist
        global.roomID++
        this.id = global.roomID
        this.game = {}

        //配置
        //this.max
    }

    setConfig(code) {
        this.code = code
    }

    getRoomData() {
        let rData = {}
        rData.id = this.id
        rData.user = this.game.users || 0
        rData.type = this.type
        return rData
    }

}
module.exports = Room
