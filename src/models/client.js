"use strict"
let Gunfighter = require('./Gunfighter')
let Saber = require('./Saber')
let console = require('tracer').console()

//再封装客户端的socket
class Client {
    constructor(socket) {
        this.id = socket.id
        this.socket = socket
        this.admin = false

        this.name = '无名小卒'
        this.joinTime = new Date().getTime()
        this.ip = socket.handshake.address

        this.killed = 0     //击杀数
        this.death = 0    //被击杀数
        this.highestKillNumber = 0 //最高连续击杀

        this.characterID = null
        this._character = null


        //初始化
        this.socket.on('init', (data) => {
            if (!data) {
                data = {}
            }
            this.characterID = data.characterID || 1
            this.setCharacter(this.characterID)
        })

    }

    //获取id
    getID() {
        return this.socket.id
    }

    getSocket() {
        return this.socket
    }

    setCharacter(value) {
        switch (value) {
            case 1:
                this._character = new Saber()
                break
            case 2:
                this._character = new Gunfighter()
                break
            default:
                this._character = new Saber()
        }
        console.log('创建了' + this._character.getTypeName())
    }

    getCharacter() {
        return this._character
    }

    getPlayerData() {
        if (this.getCharacter()) {
            let ID = this.getID()
            let data = {ID}
            data.data = this.getCharacter().getMsg()
            return data
        }
        return null
    }

}

module.exports = Client