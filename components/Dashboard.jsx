import React, { useContext, useEffect, useState } from 'react'
import { cartcontext } from '../cartproviders/cartprovider'

export default function Dashboard() {
    const [cases,setcases]=useState([])
    const {user,setuser,client,advocate,admin,judge,setjudge,modal,ismodalopen}=useContext(cartcontext)
    const [tasks,settasks]=useState([])
    
    const [clientsinfo,setclientsinfo]=useState([])
        const [advocatesinfo,setadvocatesinfo]=useState([])
        
   if(client){
           const advocate1=user.mainuser.advocatesid

            useEffect(()=>{
                let array=[]
                advocate1.map(async data=>{
    
                    await fetch('http://localhost:3000/api/findadvocate',{
                        method:"POST",
                        body:JSON.stringify({
                            _id:data
                        })
                    }).then(res=>{
                       res!==undefined && res.json().then(final=>{
                            console.log(final)
                                array.push(final)
                                console.log("THE ARRAY",array)    
                                        setadvocatesinfo(array)
    
                        })
                    })     
    
                })
            },[])
        }

        if(advocate){
            useEffect(()=>{
                let array=[]
                const client1=user.mainuser.clientsid
                client1.map(async data=>{
    
                    await fetch('http://localhost:3000/api/findclient',{
                        method:"POST",
                        body:JSON.stringify({
                            _id:data
                        })
                    }).then(res=>{
                       res!==undefined &&  res.json().then(final=>{
                                array.push(final)
                                setclientsinfo(array)
    
                        })
                    })     
    
                })
            },[])
        }


    useEffect(()=>{
        fetchs().then(res=>{
            res!==undefined && res.json().then(d=>{
              console.log(d)
              settasks(d)
          })
        })
         },[])
         async function fetchs(){
         const data= await fetch('http://localhost:3000/api/taskapi',{
              method:"POST",
              body:JSON.stringify({
                _id:user.mainuser._id,
                find:true,
              })
            })
            return data
         }
    
  useEffect(()=>{
    fetchs1().then(res=>{

       res!==undefined && res.json().then(r=>{
            setcases(r)
        })
    })
  },[]) 
async function fetchs1(){ 
   const data= await fetch('http://localhost:3000/api/casesee',{
        method:"POST",
        body:JSON.stringify({
            _id:user.mainuser._id
        })
    })
}

  return (
    <div className={`h-auto `} style={{minHeight:"93vh"}}>
        <div className='flex ml-8 mr-8 flex-row gap-4 w-[100vw] h-[40vh]'>
            <div  className='container w-[40vw] rounded-md' style={{width:"20vw"}}><img src='https://www.pngfind.com/pngs/m/34-348940_1508-x-1213-6-transparent-court-hammer-png.png'></img></div>
            <div className='container w-[40vw] rounded-md' style={{width:"20vw"}}>sdsdsdd</div>
            <div className='container w-[40vw] rounded-md' style={{width:"20vw"}}>sdsd</div>
            
        </div>
        <div className=' w-auto'>
   
     <div className={`container grid  z-[98]  `} style={{overflowY:"auto",maxHeight:"500px"}}>
        <h1 className='tableh1 text-2xl font-bold'>Customers table</h1>
        <div className="table justify-self-center">
            <table style={{overflowY:"auto",maxHeight:"300px"}}>
                <thead className="tableheader ">
                    <tr className="tablerow ">

                        <th style={{borderTopLeftRadius:"20px"}}>qqq</th>
                        <th>0qqq</th>
                        <th>aaa</th>
                        <th>aa</th>
                        <th style={{borderTopRightRadius:"20px"}}>aaa</th>
                        {judge && <th></th>}
                    </tr>
                </thead>
                    
                <tbody className="tablebody">
                   {
                    cases.map((data,index)=>{
                      return <tr  height={"10"}><td className={`${index+1==cases.length?"td1radius":""}`}>{data.casetype}</td>
                      <td>{data.casestage}</td>
                      <td>{data.filingnumber}</td>
                      <td>{data.registrationdate}</td>
                      <td className={`${index+1==cases.length?"tdlastradius":""}`}>{data.act}</td>
                   {judge &&  <td  className='text-3xl font-bold' onClick={()=>{
    const element=window.document.getElementById(index)
    setid(data._id)
    element.style.display=='none'?element.style.display='block':element.style.display='none'
                 for(let i=0;i<cases.length;i++){
                    if(i!==index){
                    const el=window.document.getElementById(`${i}`)
                    el.style.display='none'}
                 }
                 }}><sup >...</sup>
                   <div  className='z-[99] container h-24 w-32    ' id={index} style={{display:"none",position:"absolute",margin:"0px",height:"96px",width:"128px"}}>
                    <p onClick={showmodal}>NExt date</p>
                   </div>
                   </td>}
                      </tr>
                  
                })
                   }
                    
                    </tbody>
                <tbody>

                </tbody>
            </table>
        </div>
    </div></div>
    {(client || advocate || judge) &&  <div className=' w-auto'>
 
  <div className={`container grid  z-[70]  `} style={{overflowY:"auto",maxHeight:"500px"}}>
     <h1 className='tableh1 text-2xl font-bold'>Task's</h1>
     <div className="table justify-self-center">
         <table style={{overflowY:"auto",maxHeight:"300px"}}>
             <thead className="tableheader ">
                 <tr className="tablerow ">

                     <th style={{borderTopLeftRadius:"20px"}}>S No.</th>
                     <th>Task</th>
                     <th>Date</th>

                     <th style={{borderTopRightRadius:"20px"}}>Time</th>
                 </tr>
                 </thead>
                 
             <tbody className="tablebody">
                {
                 tasks.map((data,index)=>{
                   return <tr hei height={"10"}><td className={`${index+1==tasks.length?"td1radius":""}`}>{index+1}</td>
                   <td>{data.task}</td>
                   <td>{data.date}</td>

                   <td className={`${index+1==tasks.length?"tdlastradius":""}`}>{data.time}</td>
                  
                  </tr>
                 })
                }
                 
                 </tbody>
             <tbody>

             </tbody>
         </table>
     </div>
 </div></div>}

 
 
    </div>
  )
}
