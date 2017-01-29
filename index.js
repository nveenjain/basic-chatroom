var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var o = 0;
app.get('/', function(req, res){

    res.sendfile(__dirname +'/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected' + ++o);
    socket.on('disconnect', function(){
        console.log('user disconnected' + --o);
    });
});
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
