import React, { useRef,useContext,useEffect,useState } from 'react'
import { cartcontext } from '../cartproviders/cartprovider'
import Loadingskeleton from './Loadingskeleton'
import styles from '../src/styles/button.module.css'

export default function Tasks() {
    const {user,setuser,modal,ismodalopen,setloading}=useContext(cartcontext)
    const [left,setleft]=useState(0)
    function handleaddjudge(){
        modal?ismodalopen(false):ismodalopen(true)
    }
    useEffect(()=>{
      const screenWidth = window.innerWidth;
      console.log(screenWidth)
       var  leftPosition = (screenWidth-500) / 2 + 'px';
       setleft(leftPosition)
    },[])
    const [tasks,settasks]=useState([])
    const task=useRef()
    const time=useRef()
    const date=useRef()
    const [check,ischeck]=useState(0)
    const [original,setoriginal]=useState([])
   useEffect(()=>{
  fetchs().then(res=>{
    res.json().then(d=>{
        console.log(d)
        setoriginal(d)
        settasks(d)
    })
  })
   },[check])
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
    const handlesubmit=async()=>{
    setloading(true)
      
       await fetch('http://localhost:3000/api/taskapi',{
          method:"POST",
          body:JSON.stringify({
            task:task.current.value,
            status:true,
            time:time.current.value,
            _id:user.mainuser._id,
            date:date.current.value,
            find:false
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
   settasks(array)
}
  else{
    settasks(original)
  }
 }
 async function handlestatuschange(e){
  ischeck(check+1)
console.log(!e.target.checked)
setloading(true)
    await fetch('http://localhost:3000/api/changestatus',{
      method:"POST",
      body:JSON.stringify({
        id1:e.target.id,
        status:(e.target.checked && true) || false,
        value:'tasks'
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
       <label htmlFor='courtname ' className='h-[25px]'>Task</label>
       <input id='courtname' ref={task} className='input h-[15px] '></input>
       <span className="outline1 "></span></div>
       <div>
       <label htmlFor='Description ' className='h-[25px]'> Date</label>
       <input id='Description' type='date' className='input h-[15px] ' ref={date}></input>
       <span className="outline1 "></span></div>
       <div>
       <label htmlFor='Juridiction '  className='h-[25px]'> Time</label>
       <input id='Juridiction' type='time' className='input h-[15px] ' ref={time}></input>
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
     <h1 className='tableh1 text-2xl font-bold'>Task's</h1>
     <select onChange={handlefilterchange} className='justify-self-end container relative  mr-6 w-16 pl-2' defaultValue={'Fliters'} style={{width:"100px",height:"20px",position:"relative",right:"20px",marginTop:"10px",marginBottom:"0px"}}><option value={'both'}>Both</option><option value={true}>On</option><option value={false}>Off</option></select>

     <div className="table justify-self-center">
         <table style={{overflowY:"auto",maxHeight:"300px"}}>
             <thead className="tableheader ">
                 <tr className="tablerow ">

                     <th style={{borderTopLeftRadius:"20px"}}>S No.</th>
                     <th>Task</th>
                     <th>Date</th>
                     <th>Time</th>

                     <th style={{borderTopRightRadius:"20px"}}>Status</th>
                 </tr>
                 </thead>
                 
             <tbody className="tablebody">
                {( tasks.length==0 && <><Loadingskeleton number={5}/></>)||
                 tasks.map((data,index)=>{
                   return <tr hei height={"10"}><td className={`${index+1==tasks.length?"td1radius":""}`}>{index+1}</td>
                   <td>{data.task}</td>
                   <td>{data.date}</td>
                   <td>{data.time}</td>

                   <td className={`${index+1==tasks.length?"tdlastradius":""}`}><label className={`${styles.switch}`}>
  <input id={data._id} checked={data.status} onChange={handlestatuschange} type="checkbox"/>
  <span class={`${styles.slider} ${styles.round}`}></span>
</label></td>
                  
                  </tr>
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
