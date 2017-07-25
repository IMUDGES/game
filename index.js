"use strict"
let express = require('express')
let url=require('url')
let app = express()
let server = require('http').Server(app)
let WebSocketServer = require('ws').Server
let wss = new WebSocketServer({server})
let room=require('./src/models/room')

//获取配置项目
let opts = {}
for (let key of process.argv.splice(2)) {
    let keys = key.split('=')
    opts[keys[0]] = keys[1]
}
//开启服务器
app.use('/static', express.static(__dirname + 'static'))
server.listen(opts.port || 8080, () => {
    console.log('Listening on port ' + server.address().port)
})
//游戏地址
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html')
})

wss.on('connection', (WebSocket) => {
    let location=url.parse(WebSocket.upgradeReq.url,true)

})