import React, { useContext, useEffect, useRef, useState } from 'react'
import { cartcontext } from '../cartproviders/cartprovider'
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import Loader from './Loader'
import Loadingskeleton from './Loadingskeleton'
export default function createjudge() {
    const [addjudge,setaddjudge]=useState(false)
    const {user,setuser,modal,ismodalopen,setloading}=useContext(cartcontext)
    const [judges,setjudges]=useState([])
    const [left,setleft]=useState(0)
    const type=useRef()
    function handleaddjudge(){

     modal?ismodalopen(false): ismodalopen(true)
    }
    const judgeid=useRef()
    useEffect(()=>{
      const screenWidth = window.innerWidth;
      console.log(screenWidth)
       var  leftPosition = (screenWidth-500) / 2 + 'px';
       setleft(leftPosition)
    },[])
    useEffect(()=>{
      fetchs().then(res=>{
        res.json().then(d=>{
          console.log(d)
          setjudges(d)
        })
      })


    },[])
    async function fetchs(){
     const data= await fetch('http://localhost:3000/api/addjudge',{
        method:"POST",
        body:JSON.stringify({
          judgesid:user.length!==0?user.mainuser.judgesid:"",
          find:false
        })
      })
      return data
    }
    const handlesubmit=async()=>{
      setloading(true)
       await fetch('http://localhost:3000/api/addjudge',{
          method:"POST",
          body:JSON.stringify({
            id:judgeid.current.value,
            _id1:user.mainuser._id,
            judgesid:user.mainuser.judgesid,
            find:true,
            type:type.current.value.length==0?"":type.current.value
          })
        })
        setloading(false)
      
      handleaddjudge()
    }
  return (
    <>
   
            
           
      {
        modal && <>
        <div className='judgemodalanimate container z-[99] grid   p-10' style={{position:"fixed",width:`500px`,left:`${left}`,top:"15px"}}>
          
          <label htmlFor='judge Id' className='h-[25px]'> Judge Id</label>
          <input id='judge Id' ref={judgeid} className='input h-[15px] '></input>
          <span className="outline1 "></span>
          <label htmlFor='type' className='h-[25px]'> Type</label>
          <input id='type' ref={type} className='input h-[15px] '></input>
          <span className="outline1 "></span>
<button className='absolute right-5' onClick={handleaddjudge}>X</button>
          <button onClick={handlesubmit} className='self-center container buttonborder p-1 pl-2 pr-2 text-xl font-semibold'>Submit</button>
        </div>
        </>
      }    

    <div className={`${modal?"change":""} h-[93vh] z-[60] `}>
    <div className=' w-auto'>
    <div>
        <button  className='container  buttonborder p-2 pl-4 pr-4 text-xl font-semibold '  onClick={handleaddjudge}>Add Judge</button>
        <hr className={`ml-[30px] mr-[30px] ${modal?"hidden":""}`}></hr>
    </div>
     <div className={`container grid  z-[70] ${modal?"loweranimate":""} `} style={{overflowY:"auto",maxHeight:"500px"}}>
        <h1 className='tableh1 text-2xl font-bold'>Judge's</h1>
        <div className="table justify-self-center">
            <table style={{overflowY:"auto",maxHeight:"300px"}}>
                <thead className="tableheader ">
                    <tr className="tablerow ">

                        <th style={{borderTopLeftRadius:"20px"}}>S.No</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Cases Assigned</th>
                        <th>Email</th>
                        <th style={{borderTopRightRadius:"20px"}}>Phone Number</th>
                    </tr>
                    </thead>
               <tbody className="tablebody">
                   {
                 ( judges.length==0 && <><Loadingskeleton number={6}/></>) ||
                    judges.map((data,index)=>{
                      return <tr hei height={"10"}><td className={`${index+1==judges.length?"td1radius":""}`}>{index+1}</td>
                      <td>{data.fullname || <Skeleton count={1}/>}</td>
                      <td>{data.type}</td>
                      <td>{data.caseassigned}</td>
                      <td>{data.email}</td>
                      <td className={`${index+1==judges.length?"tdlastradius":""}`}>{data.phonenumber}</td></tr>
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
