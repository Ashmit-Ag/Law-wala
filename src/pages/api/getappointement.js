import {databaseconnect} from '../../../database/database'
import courttype from '../../../Schema/courttype';
import clienttype from '../../../Schema/client';
import appointement from '../../../Schema/appointement';
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
    req.body=await JSON.parse(req.body)
    if(req.body.advocate){
        const data=await appointement.find({advocateid:req.body._id})
        return res.status(200).json(data)  
      }else{
            const data=await appointement.find({clientid:req.body._id})
        return res.status(200).json(data)
        }
    return res.status(200).json(data)
  }else{
    return res.status(500).send("Error")
  }

}
