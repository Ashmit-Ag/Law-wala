import {databaseconnect} from '../../../database/database'
import court from '../../../Schema/court';
import admin from '../../../Schema/admin';
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
    
    
    req.body=await JSON.parse(req.body)
   if(req.body.find){
    const data= await court.create({
        courtname:req.body.courtname,
        description:req.body.description,
        Juridiction:req.body.juridiction
    })

    const array=req.body.courttype
    console.log(array)
    array.push(data._id)
    req.body.courttype=array
    await admin.findByIdAndUpdate(req.body._id,req.body)
    return res.status(200).send("Data added")
  }else{
    let array=[]
    console.log("sds")
    for(let i=0;i<req.body.courttype.length;i++){
     const data= await court.findOne({_id:req.body.courttype[i]})
     array.push(data)
    }
    return res.status(200).json(array)
  }
  }else{
    return res.status(500).send("Error")
  }

}
