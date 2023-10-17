import {databaseconnect} from '../../../database/database'
import admin from '../../../Schema/admin';
import casetype from '../../../Schema/casetype'
const bcrypt=require('bcrypt')
export default async function handler(req, res) {
  await databaseconnect();
  
  if(req.method=="POST"){
    req.body=await JSON.parse(req.body)
    if(!req.body.find){
    const data=await casetype.create({
      casetype:req.body.casetypes,
      casesubtype:req.body.casesubtype,
      casecategory:req.body.category,
      status:true
    })
    req.body.casetype.push(data._id)
    console.log("tHE JUDGE IS",req.body.casetype)

    await admin.findOneAndUpdate({_id:req.body._id},req.body)
    return res.status(200).send("Data added")
}
else{
  let array=[]
    for(let i=0;i<req.body.casetype.length;i++){
     const data= await casetype.findOne({_id:req.body.casetype[i]})
     array.push(data)

    }
    return res.status(200).json(array)
}  }else{
    return res.status(500).send("Error")
  }

}
