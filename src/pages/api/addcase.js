import {databaseconnect} from '../../../database/database'
import casead from '../../../Schema/casebyadvocate';
import judgetype from '../../../Schema/judge';
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
req.body=await JSON.parse(req.body)
    if(req.body.setdate){
      console.log(req.body.hearingdate)
      let array=req.body.hearingdate
      array.push(req.body.nexthearingdate)
     await casead.findByIdAndUpdate(req.body._id,{nexthearingdate:array})
    }else{
    const data1=await judgetype.find({_id:req.body.judge})
const assignedcases=Number(data1[0].caseassigned)+1;
console.log("Assigned cases",assignedcases)
req.body.caseassigned=assignedcases
    const data=await judgetype.findByIdAndUpdate(req.body.judge,req.body)
    await casead.create({
      clientname:req.body.clientname, 
      clientnumber:req.body.clientnumber,
      clientaddress:req.body.clientaddress,
      clientcity:req.body.clientcity,
      clientstate:req.body.clientstate,
      respondentcity:req.body.respondentcity,
      respondentstate:req.body.respondentstate,
      clientemail:req.body.clientemail,
      clientadvocate:req.body.clientadvocate,
      clietnadvocatenumber:req.body.clietnadvocatenumber,
      clietnadvocateemail:req.body.clietnadvocateemail,
      clientid:req.body.clientid,
      advocateid:req.body.advocateid,
      respondentname:req.body.respondentname,
      respondentaddress:req.body.respondentaddress,
      respondentemail:req.body.respondentemail,
      respondentadvocate:req.body.respondentadvocate,
      respondentadvocatenumber:req.body.respondentadvocatenumber,
      respondentid:req.body.respondentid,
      respondentadvocateid:req.body.respondentadvocateid,
      casetype:req.body.casetype,
      casestage:req.body.casestage,
      act:req.body.act,
      filingnumber:req.body.filingnumber,
      registrationdate:req.body.registrationdate,
      cnrnumber:req.body.cnrnumber,
      filinghearingdate:req.body.filinghearingdate,
      description:req.body.description,
      courttype:req.body.courttype,
      casenumber:req.body.casenumber,
      registrationnumber:req.body.registrationnumber,
      court:req.body.court,
      respondentnumber:req.body.respondentnumber,
      courtnumber:req.body.courtnumber,
judge:req.body.judge,
adminid:req.body.adminid,
    

    })}
    return res.status(200).send("Data added")
  }

}
