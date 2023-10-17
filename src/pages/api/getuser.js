import {databaseconnect} from '../../../database/database'
import court from '../../../Schema/court';
import admin from '../../../Schema/admin';
import advocatetype from '../../../Schema/advocate';
import clienttype from '../../../Schema/client';
import judgetype from '../../../Schema/judge';
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
    
    
    req.body=await JSON.parse(req.body)
    if(req.body.judgeupdate){
        const judge=await  judgetype.findOne({_id:req.body.id})
    
        return res.status(200).json(judge)
        
    }else if(req.body.adminupdate){
    const admin1=await  admin.findOne({_id:req.body.id})
    return res.status(200).json(admin1)
    }
      else if(req.body.clientupdate){
        const client=await  clienttype.findOne({_id:req.body.id})
    
        return res.status(200).json(client)
      }else{
        const advocate=await  advocatetype.findOne({_id:req.body.id})
    
        return res.status(200).json(advocate)
      }
}

}
