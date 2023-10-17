import {databaseconnect} from '../../../database/database'
import advocatetype from '../../../Schema/advocate';
const bcrypt=require('bcrypt')
export default async function handler(req, res) {
  await databaseconnect();
  
    req.body=await JSON.parse(req.body)
    
    if(req.method=="POST"){
        let array=req.body.clientsid
        array.push(req.body.clientid)
        req.body.clientsid=array
        await advocatetype.findByIdAndUpdate(req.body._id,req.body)
        return res.status(200).send("Done")
    }


}
