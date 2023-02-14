var app = require('express')();
var http = require('http').Server(app);
// var io = require('socket.io')(http);
var bodyParser = require('body-parser')
var cors = require('cors');
app.use(cors())
require('dotenv').config();
const connectDB = require('./db');
connectDB()
const io = require('socket.io')(http, { cors: { origin: "*" } });
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const { addUser, removeUser, getUser} = require('./users.js')
io.on('connection', function (socket) {
  socket.on('sendMessage', (message,from,time,seennBy, name, callback) => {
    io.to(user.room).emit('message', { name:name,from:from, message: message, time: time,seenBy:seennBy});
    callback();
  });
  socket.on('disconnect', () => {
    console.log('user diconnect')
    const user = removeUser(socket.id)
    if (user) {
      socket.broadcast.emit('end', { user: 'admin', text: `${user.name} has left.`, email: `${user.room}` })
      // io.to(user.room).emit('end', { user: 'admin', message: `${user.name} has left.`, email: `${user.room}` })
    }
  })
});
const entityRoutes = require('./routes/user.controller')
const groupRoutes = require('./routes/groups.controller')
app.use('/api', entityRoutes);
app.use('/api', groupRoutes);
const port = process.env.PORT || 6000
http.listen(port, function () {
  console.log('listening on localhost:5000',port);
});

