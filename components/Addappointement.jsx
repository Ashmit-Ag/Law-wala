import React, { useContext, useEffect, useRef, useState } from 'react'
import { cartcontext } from '../cartproviders/cartprovider'
import Loadingskeleton from './Loadingskeleton'
import styles from '../src/styles/button.module.css'

export default function Addappointement() {
    const [clientsinfo,setclientsinfo]=useState([])
const topic=useRef()
const date=useRef()
const [original,setoriginal]=useState([])
const [check,ischeck]=useState(0)
const time=useRef()
const [clientname,setclientname]=useState([])
const place=useRef()
const [clienti,setclienti]=useState([])
    const {user,modal,ismodalopen,advocate,client,loading,setloading}=useContext(cartcontext)
    const [appointement,setappointement]=useState([])
    const [left,setleft]=useState(0)
    function handleaddjudge(){

     modal?ismodalopen(false): ismodalopen(true)
    }
    const clientid=useRef()
   if(advocate){
        useEffect(()=>{   
                 setclienti([])
                let array1=[]
          let adclient=user.mainuser.clientsid
         
                fetch('http://localhost:3000/api/getappointement',{
                    method:"POST",
                    body:JSON.stringify({
                        _id:user.mainuser._id,

                        advocate:true,
                        client:false,
                    })
                }).then(res=>{
                   res!==undefined &&  res.json().then(final=>{
                                    array1.push(final)
                                    setoriginal(array1[0])
                                    setclientsinfo(prev=>[...array1[0]])   
                       let data=[]
                       if(advocate){ 
                        final.map(d=>{
                            data.push(d.clientid);
                        })
                       }
                       else{
                        final.map(d=>{
                            data.push(d.advocateid);
                        })                       }
                       data.map(async (d)=>{
                        await fetch('http://localhost:3000/api/findclient',{
                            method:"POST",
                            body:JSON.stringify({
                                _id:d
                            })
                        }).then(res=>{
                            res.json().then(final=>{
                                    setclientname(prev=>[...prev,final[0]])
                                    console.log('Ther final 0',final[0])
                            })
                        })     
        
                       })


                                })
                    })   
                    let array=[]
                    console.log("AD client",adclient)
                   adclient.map((data)=>{
                    fetch("http://localhost:3000/api/findclient",{
                        method:"POST",
                        body:JSON.stringify({
                            _id:data,
                            
                    })
                    }).then(res=>{
                        res.json().then(d=>{
                            console.log('sdsdsdsdsd',d)
                            array.push(d[0])
                        })
                    })
                   })
                   setclienti(array) 
                           
        },[check])
   }
    if(client){
        useEffect(()=>{   
            setclienti([])
           let array1=[]
     let adclient=user.mainuser.advocatesid
    
           fetch('http://localhost:3000/api/getappointement',{
               method:"POST",
               body:JSON.stringify({
                   _id:user.mainuser._id,

                   advocate:false,
                   client:true,
               })
           }).then(res=>{
              res!==undefined &&  res.json().then(final=>{
                               array1.push(final)
                               setoriginal(array1[0])
                               setclientsinfo(prev=>[...array1[0]])   
                  let data=[]
                  if(advocate){ 
                   final.map(d=>{
                       data.push(d.clientid);
                   })
                  }
                  else{
                   final.map(d=>{
                       data.push(d.advocateid);
                   })                       }
                  data.map(async (d)=>{
                   await fetch('http://localhost:3000/api/findadvocate',{
                       method:"POST",
                       body:JSON.stringify({
                           _id:d
                       })
                   }).then(res=>{
                       res.json().then(final=>{
                               setclientname(prev=>[...prev,final[0]])
                               console.log('Ther final 0',final[0])
                       })
                   })     
   
                  })


                           })
               })   
               let array=[]
              adclient.map((data)=>{
               fetch("http://localhost:3000/api/findadvocate",{
                   method:"POST",
                   body:JSON.stringify({
                       _id:data,
                       
               })
               }).then(res=>{
                   res.json().then(d=>{
                       console.log('sdsdsdsdsd',d)
                       array.push(d[0])
                   })
               })
              })
              setclienti(array) 
        },[check])
    }
async function print(){
    console.log(clientid.current.value)
}
    useEffect(()=>{
      const screenWidth = window.innerWidth;
      console.log(screenWidth)
       var  leftPosition = (screenWidth-500) / 2 + 'px';
       setleft(leftPosition)
    },[])
   
    
    const handlesubmit=async()=>{
        setloading(true)
       await fetch('http://localhost:3000/api/appointementapi',{
          method:"POST",
          body:JSON.stringify({
            advocateid:user.mainuser._id,
            clientid:clientid.current.value,
            date:date.current.value,
            topic:topic.current.value,
            time:time.current.value,
            find:false,
            place:place.current.value,
            appointement:user.mainuser.appointementid
          })
        })
        setloading(false)
      
      handleaddjudge()
    }
    const handlesubmit1=async()=>{
        setloading(true)
        await fetch('http://localhost:3000/api/appointementapi',{
           method:"POST",
           body:JSON.stringify({
             clientid:user.mainuser._id,
             advocateid:clientid.current.value,
             date:date.current.value,
             topic:topic.current.value,
             time:time.current.value,
             find:false,
             appointement:user.mainuser.appointementid
           })
         })
         setloading(false)
       
       handleaddjudge()
     }
     async function handlestatuschange(e){
        ischeck(check+1)
  setloading(true)
          await fetch('http://localhost:3000/api/changestatus',{
            method:"POST",
            body:JSON.stringify({
              id1:e.target.id,
              status:(e.target.checked && true) || false,
              value:'appointement'
            })
          })
          setloading(false)
      }
      async function handlefilterchange(e){
        let array=[]
        if(e.target.value!=='both'){
        original.map((data,index)=>{
       
          if(String(data.status)==String(e.target.value)){
            array.push(data)
          }
        })           
         setclientsinfo(array)
}
        else{
            setclientsinfo(original)
        }
       
      }
  return (
    <>
   
            
           
    {
      modal && <>
      <div className='judgemodalanimate container grid-cols-2 z-[99] grid gap-10   p-10' style={{position:"fixed",width:`500px`,left:`${left}`,top:"15px"}}>
                    <div className='w-auto' >

      {advocate && <><label htmlFor='client' className='h-[25px]'>Select Client</label>
        <select className='input' style={{width:"12vw"}} id='client' onClick={print} ref={clientid}>
            {
                clienti.map((data,index)=>{
               return     <option value={data._id}>{data.fullname}</option>
                })
            }
        </select>
        <span className="outline1 "></span></> }
        {client && <><label htmlFor='client' className='h-[25px]'>Select Advocate</label>
        <select className='input' style={{width:"12vw"}} id='client' onClick={print} ref={clientid}>
            {
                clienti.map((data,index)=>{
               return     <option value={data._id}>{data.fullname}</option>
                })
            }
        </select>
        <span className="outline1 "></span></> }
        </div>
        <div>
          <label htmlFor='topic' className='h-[25px]'>Topic</label>
          <input id='topic' className='input h-[15px] ' ref={topic}></input>
          <span className="outline1 "></span></div>
          <div>
          <label htmlFor='date' className='h-[25px]'>Date</label>
          <input id='date' type='date' className='input h-[15px] w-[12vw]' ref={date}></input>
          <span className="outline1 "></span></div>
           <div>
          <label htmlFor='time' className='h-[25px]'>Time</label>
          <input id='time' className='input h-[15px] ' ref={time}></input>
          <span className="outline1 "></span></div>
          <div>
          <label htmlFor='place' className='h-[25px]'>Place</label>
          <input id='place' className='input h-[15px] ' ref={place}></input>
          <span className="outline1 "></span></div>
<button className='absolute right-5' onClick={handleaddjudge}>X</button>

      {advocate &&  <button onClick={handlesubmit} className=' self-center justify-self-center container buttonborder p-1 pl-2 pr-2 text-xl font-semibold' style={{gridColumn:"span 2"}}>Submit</button>}
      {client &&  <button onClick={handlesubmit1} className=' self-center justify-self-center container buttonborder p-1 pl-2 pr-2 text-xl font-semibold' style={{gridColumn:"span 2"}}>Submit</button>}

      </div>
      </>
    }    

 <div className={`${modal?"change":""}  h-[93vh] z-[60] `} style={{paddingBottom:"50px"}}>
  <div className=' w-auto'>
  <div>
      <button  className='container buttonborder p-2 pl-4 pr-4 text-xl font-semibold ' onClick={handleaddjudge}>Add Client</button>

      <hr className={`ml-[30px] mr-[30px] ${modal?"hidden":""}`}></hr>
  </div>
   <div className={`container grid  z-[70] ${modal?"loweranimate":""} `} style={{overflowY:"auto",maxHeight:"400px"}}>
      <h1 className='tableh1 text-2xl font-bold'>Customers table</h1> 
           <select onChange={handlefilterchange}  className='justify-self-end container relative  mr-6 w-16 pl-2' defaultValue={'Both'} style={{width:"100px",height:"20px",position:"relative",right:"20px",marginTop:"10px",marginBottom:"0px"}}><option value={'both'}>Both</option><option value={true}>On</option><option value={false}>Off</option></select>

      <div className="table justify-self-center">
          <table style={{overflowY:"auto",maxHeight:"300px"}}>
              <thead className="tableheader ">
                  <tr className="tablerow ">

                      <th style={{borderTopLeftRadius:"20px"}}>S.No</th>
                      <th>Topic</th>
                      <th>Client</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Place</th>
                      <th style={{borderTopRightRadius:"20px"}}>Status</th>
                  </tr>
                  </thead>
                  
              <tbody className="tablebody">
                 {                     ( clientsinfo.length==0 && <><Loadingskeleton number={7}/></>)||

                  clientsinfo.map((data,index)=>{
                    console.log("This cleint name is",clientsinfo)

                    return <tr  height={"10"}><td className={`${index+1==clientsinfo.length?"td1radius":""}`}>{index+1}</td>
                    <td>{data.topic}</td>
                    <td>{clientname[index] && clientname[index].fullname}</td>
                    <td>{clientname[index] && data.date}</td>

                    <td>{clientname[index] && data.time}</td>
 
                    <td>{clientname[index] && clientname[index].place}</td>
                    <td  className={`${index+1==clientsinfo.length?"tdlastradius":""}`}><label className={`${styles.switch}`}>
  <input id={data._id} checked={data.status} onChange={handlestatuschange} type="checkbox"/>
  <span class={`${styles.slider} ${styles.round}`}></span>
</label></td></tr>
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
