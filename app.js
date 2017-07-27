"use strict"

/**
 * http://183.175.12.157:80
 *
 * Apache Licensed. See LICENSE for full license.
 *
 * Usage : node app.js*/

let url = require('url'),
    uuid = require('uuid/v4'),

    express = require('express'),
    app = express(),
    httpServer = require('http').createServer(app),
    io = require('socket.io')(httpServer),

    server = require('./src/models/server')


//获取配置项目
let opts = {}
for (let key of process.argv.splice(2)) {
    let keys = key.split('=')
    opts[keys[0]] = keys[1]
}
//默认创建一个永久房间
for (let i = 0; i < (opts.room || 1); i++) {
    server.createRoom("大乱斗", true)
}

//开启服务器 ipv4模式
app.use(express.static('static'))
httpServer.listen(opts.port || 80,'0.0.0.0', () => {
    console.log('Listening on port ' + httpServer.address().port)
})
//游戏地址
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html')
})

//socket
io.on('connect', (client) => {

    server.connect(client)

})