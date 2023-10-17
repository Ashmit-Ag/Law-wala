import React , { useContext, useEffect, useRef, useState }from 'react'
import { cartcontext } from '../cartproviders/cartprovider'
import Loadingskeleton from './Loadingskeleton'

export default function Clientadd() {
    const {user,setuser,modal,ismodalopen,setloading}=useContext(cartcontext)
        const [left,setleft]=useState(0)
const client=user.mainuser.clientsid
const [clientsinfo,setclientsinfo]=useState([])
        function handleaddjudge(){
            modal?ismodalopen(false):ismodalopen(true)
        }
        useEffect(()=>{
            let array=[]
            client.map(async data=>{

                await fetch('http://localhost:3000/api/findclient',{
                    method:"POST",
                    body:JSON.stringify({
                        _id:data
                    })
                }).then(res=>{
                    res.json().then(final=>{
                        console.log(final)
                            array.push(final)
                                    setclientsinfo(array)

                    })
                })     

            })
        },[])
       const clientid=useRef()
        const handlesubmit=async()=>{
          setloading(true)
           await fetch('http://localhost:3000/api/addclient',{
              method:"POST",
              body:JSON.stringify({
                _id:user.mainuser._id,
                clientsid:user.mainuser.clientsid,
                clientid:clientid.current.value
              })
            })
          
        setloading(false)
    }
  return (
    <>
       
                
               
              
    
       {
        modal && <>
        <div className='judgemodalanimate container z-[99] grid   p-10' style={{position:"fixed",width:`500px`,left:`${left}`,top:"15px"}}>
         <div className='w-auto h-auto gap-4 grid grid-cols-2'> <div>
          
          <label htmlFor='clientid ' className='h-[25px]'> Client Id</label>
          <input id='clientid' className='input h-[15px] ' ref={clientid}></input>
          <span className="outline1 "></span></div></div>
<button className='absolute right-5' onClick={handleaddjudge}>X</button>
          <button onClick={handlesubmit} className='self-center container buttonborder p-1 pl-2 pr-2 text-xl font-semibold'>Submit</button>
        </div>
        </>
      }    

   <div className={`${modal?"change":""} h-[93vh] z-[60] `}>
    <div className=' w-auto'>
    <div>
        <button  className='container buttonborder p-2 pl-4 pr-4 text-xl font-semibold ' onClick={handleaddjudge}>Add Case</button>
        <hr className={`ml-[30px] mr-[30px] ${modal?"hidden":""}`}></hr>
    </div>
     <div className={`container grid  z-[70] ${modal?"loweranimate":""} `} style={{overflowY:"auto",maxHeight:"500px"}}>
        <h1 className='tableh1 text-2xl font-bold'>Customers table</h1>
        <div className="table justify-self-center">
            <table style={{overflowY:"auto",maxHeight:"300px"}}>
                <thead className="tableheader ">
                    <tr className="tablerow ">

                        <th style={{borderTopLeftRadius:"20px"}}>S No.</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th style={{borderTopRightRadius:"20px"}}>Email</th>
                    </tr>
                    </thead>
                    
                <tbody className="tablebody">
                   { ( clientsinfo.length==0 && <><Loadingskeleton number={6}/></>) ||
                    clientsinfo.map((dat,index)=>{
                   return  dat.map(data=>{
                        return   <tr hei height={"10"}><td className={`${index+1==client.length?"td1radius":""}`}>{index+1}</td>
                      <td>{data.fullname}</td>
                      <td>{data.phonenumber}</td>
                      <td className={`${index+1==client.length?"tdlastradius":""}`}>{data.email}</td>
                     </tr>
                    })
                
                    })
                   }
                    
                    </tbody>
                <tbody>

                </tbody>
            </table>
        </div>
    </div></div></div>  
        </>
  )
}
