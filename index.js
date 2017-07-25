"use strict"

/**
 * http://183.175.12.157:80
 *
 * Apache Licensed. See LICENSE for full license.
 *
 * Usage : node index.js*/

let url = require('url'),
    uuid = require('uuid/v4'),
    rooms = require('./src/models/rooms'),

    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server)


//获取配置项目
let opts = {}
for (let key of process.argv.splice(2)) {
    let keys = key.split('=')
    opts[keys[0]] = keys[1]
}
//默认创建一个永久房间
for (let i = 0; i < (opts.room || 1); i++) {
    rooms.createRoom("大乱斗", true)
}

//开启服务器
app.use('/static', express.static(__dirname + 'static'))
server.listen(opts.port || 80, () => {
    console.log('Listening on port ' + server.address().port)
})
//游戏地址
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html')
})

//socket
