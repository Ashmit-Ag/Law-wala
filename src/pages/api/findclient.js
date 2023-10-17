import {databaseconnect} from '../../../database/database'
import courttype from '../../../Schema/courttype';
import clienttype from '../../../Schema/client';
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
    req.body=await JSON.parse(req.body)
    const data=await clienttype.find({_id:req.body._id})
    return res.status(200).json(data)
  }else{
    return res.status(500).send("Error")
  }

}
