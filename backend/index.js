const express=require('express')
const app=express()
const server=require('http').createServer(app)
const io=require('socket.io')(server,{
    cors:{
        origin:'*'
        ,
        methods:["GET","POST"]
    }
})
var map=new Map()
io.on('connection', (socket) => {
    socket.on('new-user',({name})=>{
        map.set(name,socket.id)
        console.log(map)
      })
      socket.on('new-message',({to,from,message})=>{
        if(map.get(to)){
            console.log(message)
            socket.to(map.get(to)).emit('receive-message',{message1:message,to1:to,from1:from})
            socket.to(map.get(from)).emit('message-sent',{message1:message,to1:to,from1:from})
        }
      })
  });
server.listen(3001,console.log("Listening"))
