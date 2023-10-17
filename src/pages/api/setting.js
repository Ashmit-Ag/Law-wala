import {databaseconnect} from '../../../database/database'
import courttype from '../../../Schema/courttype';
import judgetype from '../../../Schema/judge';
import admin from '../../../Schema/admin';
import clienttype from '../../../Schema/client';
import advocatetype from '../../../Schema/advocate';
const bcrypt=require('bcrypt')
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
    
    req.body=await JSON.parse(req.body)
    if(req.body.password){
    const salt=await bcrypt.genSalt(10);
    const a=await bcrypt.hash(req.body.password,salt)
    req.body.password=a}
   if(req.body.judgeupdate){
    const judge=await  judgetype.findByIdAndUpdate(req.body.id,req.body)

    
}else if(req.body.adminupdate){
const admin1=await  admin.findByIdAndUpdate(req.body.id,req.body)
}
  else if(req.body.clientupdate){
    const client=await  clienttype.findByIdAndUpdate(req.body.id,req.body)

  }else{
    const advocate=await  advocatetype.findByIdAndUpdate(req.body.id,req.body)

  }
}
}
