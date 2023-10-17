import {databaseconnect} from '../../../database/database'
import admin from '../../../Schema/admin'
const jwt=require('jsonwebtoken')
const secret='mynameisayushmaan'
const bcrypt=require('bcrypt')

export default async function handler(req, res) {
  await databaseconnect();
  req.body=await JSON.parse(req.body)
  if(req.method=="POST"){
    
    const user=await admin.find({email:req.body.email});
    console.log(user)
        if(user.length===0){
            console.log("nppp")
            return res.status(200).send("Not valid email");
        }
        
        const p=await bcrypt.compare(req.body.password,user[0].password) ;
        if(!p){
            console.log("invalid")
            return res.status(200).send("Not valid password");
        }
        const data={
            token:jwt.sign({data:user[0]},secret),
            mainuser:user[0]
        }
        const token=await jwt.sign({data:user[0]},secret)
        
        console.log("JDKJSDKJSDJSDJSDKJSJDKSDD")
       return  res.status(200).send(data);
    
  }else{
    return res.status(500).send("Error")
  }

}
