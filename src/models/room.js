"use strict"
let Rooms = require('./rooms'),
    uuid=require('uuid/v4')

class Room {
    //创建房间
    constructor(type, presist) {
        this.type = type
        this.presist = presist
        this.id = uuid().toString()
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
        rData.users = this.game.users || 0
        rData.type = this.type
        rData.presist=this.presist
        return rData
    }

}
module.exports = Room
