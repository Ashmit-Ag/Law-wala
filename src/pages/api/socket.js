import {databaseconnect} from '../../../database/database'
import judgetype from '../../../Schema/judge'
import { Server } from 'socket.io';
import { createServer } from 'http'; 
 
const bcrypt=require('bcrypt')
export default async function handler(req, res) {
  await databaseconnect();
  var map=new Map()
if(!res)
    const io = new Server(res.socket.server)
    
    io.on('connection', socket => {
      socket.on('new-user',({name})=>{
        map.set(name,socket.id)
        console.log(map)
      })
      socket.on('newmessage',({to,from,message})=>{
        if(map.get(to)){
            console.log(message)
            socket.to(map.get(to)).emit('receivemessage',{message:message})

        }
      })
      socket.on('hello', msg => {
        console.log('hello', 'world!')
      })
    })

    res.socket.server.io = io
 
  res.end()
return res.status(200).send()
}
