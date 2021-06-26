const express = require('express');
const app = express();
const http = require('http').createServer(app)

const PORT = process.env.PORT || 5000

app.use(express.static(__dirname + '/public'));

http.listen(PORT, () => {
    console.log('listening on port', PORT);
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    // res.send("Hello world")
})

// socket

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('connected...');

    socket.on('message', (msg) => {
        // console.log(msg);
        socket.broadcast.emit('message', msg)
    })
})
