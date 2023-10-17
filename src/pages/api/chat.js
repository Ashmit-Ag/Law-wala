import {databaseconnect} from '../../../database/database'
import clienttype from '../../../Schema/client';
import chat from '../../../Schema/chat';
const bcrypt=require('bcrypt')
export default async function handler(req, res) {
  await databaseconnect();

  if(req.method=="POST"){
    req.body=await JSON.parse(req.body)
    
   console.log(req.body)
   if(!req.body.find)
   {
    await chat.create({
      sender:req.body.sender,
      receiver:req.body.receiver,
      message:req.body.message
      })
    return res.status(200).send("Data added")
   }else{
    let array=[]
   let data=await chat.find({sender:req.body.sender,receiver:req.body.receiver})
   const data1=await chat.find({receiver:req.body.sender,sender:req.body.receiver})
data.map((d)=>{
  array.push(d)
})
data1.map(d=>{
  array.push(d)
})
   array.sort((a,b)=>{
    let datea=new Date(a.createdAt)
    let dateb=new Date(b.createdAt)
    return datea-dateb;
   })
   data=array;
   console.log(data)
   return res.status(200).send(data)
   }
  }else{
    return res.status(500).send("Error")
  }

}
