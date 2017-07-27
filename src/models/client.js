"use strict"


//再封装客户端的socket
class Client{
    constructor(socket){
        this.id = socket.id
        this.socket = socket
        this.admin=false

        this.name='无名小卒'
        this.joinTime=new Date().getTime()
        this.ip=socket.handshake.address

        this.killed=0     //击杀数
        this.death=0    //被击杀数
        this.highestKillNumber=0 //最高连续击杀

        //初始化
        this.socket.on('init',(data)=>{
            if (data.userName){
                this.name = data.userName.replace(/[<>]/g,'').substring(0,10)
            }
            socket.emit('init',{

            })
        })

        //加入
        this.socket.on('join',(data)=>{
            console.log('join '+data)
        })

    }
}

module.exports=Client