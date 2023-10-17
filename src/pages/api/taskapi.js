import {databaseconnect} from '../../../database/database'
import task from '../../../Schema/task'; 
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
    req.body=await JSON.parse(req.body)
    if(req.body.find){
     const data= await task.find({userid:req.body._id})
    return res.status(200).json(data )

    }else{
    await task.create({
        userid:req.body._id,
        task:req.body.task,
        status:req.body.status,
    time:req.body.time,
    date:req.body.date

    })
  return res.status(200).send("Done")
  }
  }else{
    return res.status(500).send("Error")
  }

}
