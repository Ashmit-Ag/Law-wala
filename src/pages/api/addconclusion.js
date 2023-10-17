import {databaseconnect} from '../../../database/database'
import advocatetype from '../../../Schema/advocate';
import casead from '../../../Schema/casebyadvocate';
const bcrypt=require('bcrypt')
export default async function handler(req, res) {
  await databaseconnect();
  
    req.body=await JSON.parse(req.body)
    
    if(req.method=="POST"){
        console.log(req.body.index)
        let array=req.body.hearingdates;    
            console.log(array[0])

        array[req.body.index].conclusion=req.body.conclusion
        console.log(array)
        req.body.hearingdates=array;
        await casead.findOneAndUpdate({_id:req.body._id},req.body)
        return res.status(200).send("Done")
    }


}
