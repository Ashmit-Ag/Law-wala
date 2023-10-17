import {databaseconnect} from '../../../database/database'
import advocatetype from '../../../Schema/advocate';
import casead from '../../../Schema/casebyadvocate';
const bcrypt=require('bcrypt')
export default async function handler(req, res) {
  await databaseconnect();
  
    req.body=await JSON.parse(req.body)
    
    if(req.method=="POST"){
        const data=await casead.findOne({_id:req.body._id})
        let array=data.hearingdates;
        array.push({date:req.body.nexthearingdate,conclusion:""})
        req.body.hearingdates=array;
await casead.findOneAndUpdate({_id:req.body._id},req.body)

        return res.status(200).send("Done")
    }


}
