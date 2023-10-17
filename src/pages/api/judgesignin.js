import {databaseconnect} from '../../../database/database'
import judgetype from '../../../Schema/judge'
const bcrypt=require('bcrypt')
export default async function handler(req, res) {
  await databaseconnect();
  function generateRandomId() {
    let randomId = '';
    for (let i = 0; i < 14; i++) {
      randomId += Math.floor(Math.random() * 10); // Generates a random digit from 0 to 9
    }
    return randomId;
  }
  
  // Example usage:
  const randomId = generateRandomId();
  console.log(req.body)
  if(req.method=="POST"){
    req.body=await JSON.parse(req.body)
    const salt=await bcrypt.genSalt(10);
    const a=await bcrypt.hash(req.body.password,salt)

    await judgetype.create({
       fullname:req.body.fullname,
       password:a,
        email:req.body.email,
        judgeid:randomId,
        phonenumber:req.body.phonenumber
   ,
   tasksid:req.body.tasksid,
   type:''
      })
    return res.status(200).send("Data added")
  }else{
    return res.status(500).send("Error")
  }

}
