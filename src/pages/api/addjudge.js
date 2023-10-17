import {databaseconnect} from '../../../database/database'
import admin from '../../../Schema/admin'
import judgetype from '../../../Schema/judge'
const bcrypt=require('bcrypt')
export default async function handler(req, res) {
  await databaseconnect();
  
  if(req.method=="POST"){

    req.body=await JSON.parse(req.body) 

    if(req.body.find){
    req.body.judgesid.push(req.body.id)
    console.log("tHE JUDGE IS",req.body.judgesid)
    console.log(req.body.type)
    await judgetype.findOneAndUpdate({_id:req.body.id},req.body)
    await admin.findByIdAndUpdate(req.body._id1,req.body)
    
    return res.status(200).send("Data added")
    }else{
      let array=[]
    for(let i=0;i<req.body.judgesid.length;i++){
     const data= await judgetype.findOne({_id:req.body.judgesid[i]})
     array.push(data)

    }
    return res.status(200).json(array)
    }
  }else{
    console.log("Error")
    return res.status(500).send("Error")
  }

}
