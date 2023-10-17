// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import casetype from '../../../Schema/casetype' 
import {databaseconnect} from '../../../database/database'
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>) {
    await databaseconnect()
    if(req.method=="POST"){
    const data=await  casetype.create({
        casetype:req.body.casetype,
        casesubtype:req.body.casesubtype,
        status:req.body.status

    }) 
    res.status(200).json({ name: 'John Doe' })

    }else{
      return res.status(200).json({name:"Not get"})
    }
  
}
