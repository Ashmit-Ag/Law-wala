import {databaseconnect} from '../../../database/database'
import appointement from '../../../Schema/appointement';
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
    req.body=await JSON.parse(req.body)
    if(!req.body.find){
      console.log("INDED")
   const data= await appointement.create({
       clientid:req.body.clientid,
       advocateid:req.body.advocateid,
       date:req.body.date,
       time:req.body.time,
       topic:req.body.topic,
       place:req.body.place,
       status:true
    })
    return res.status(200).send("Data added")
  }
  }else{
    return res.status(500).send("Error")
  }

}
