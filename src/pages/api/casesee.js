import {databaseconnect} from '../../../database/database'
import admin from '../../../Schema/admin'
import judgetype from '../../../Schema/judge'
import casead from '../../../Schema/casebyadvocate'
import caseadd from '../caseadd'
const jwt=require('jsonwebtoken')
const secret='mynameisayushmaan'
const bcrypt=require('bcrypt')

export default async function handler(req, res) {
  await databaseconnect();
  let data={}
  req.body=await JSON.parse(req.body)
  if(req.method=="POST"){
    if(req.body.client){
    data= await casead.find({clientid:req.body._id})}
   else if(req.body.advocate){
     data= await casead.find({advocateid:req.body._id})}

   else if(req.body.judge){
     data= await casead.find({judge:req.body._id})

   }
   else{
     data= await casead.find({adminid:req.body._id})

   }
   console.log(data)
    return res.status(200).json(data)


}

}