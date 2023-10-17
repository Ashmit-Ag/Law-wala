import {databaseconnect} from '../../../database/database'
import courttype from '../../../Schema/courttype';
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
    await courttype.create({
        courttype:req.body.courttype,
        status:req.body.status,
       
        

    })
    return res.status(200).send("Data added")
  }else{
    return res.status(500).send("Error")
  }

}
