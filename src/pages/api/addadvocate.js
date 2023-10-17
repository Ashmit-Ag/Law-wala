import {databaseconnect} from '../../../database/database'
import clienttype from '../../../Schema/client';
const bcrypt=require('bcrypt')
export default async function handler(req, res) {
  await databaseconnect();
  
    req.body=await JSON.parse(req.body)
    
    if(req.method=="POST"){
        let array=req.body.advocatesid
        array.push(req.body.advocateid)
        req.body.advocatesid=array
        await clienttype.findByIdAndUpdate(req.body._id,req.body)
        return res.status(200).send("Done")
    }


}
