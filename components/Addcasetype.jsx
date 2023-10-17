import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react'
import { cartcontext } from '../cartproviders/cartprovider'
import styled from 'styled-components'
import styles from '../src/styles/button.module.css'
import Loadingskeleton from './Loadingskeleton'

export default function Addcasetype() {
     const [addjudge,setaddjudge]=useState(false)
     const [check,ischeck]=useState(false)
     const [original,setoriginal]=useState([])
     const filtervalue=useRef()
    const casetype=useRef()
    const checkbox=useRef()
    const [left,setleft]=useState(0)
           async function handlefilterchange(e){
            let array=[]
            if(e.target.value!=='both'){
            original.map((data,index)=>{
           
              if(String(data.status)==String(e.target.value)){
                array.push(data)
              }
            })           
             setcases(array)
}
            else{
                setcases(original)
            }
           }
            useEffect(()=>{
              const screenWidth = window.innerWidth;
              console.log(screenWidth)
               var  leftPosition = (screenWidth-500) / 2 + 'px';
               setleft(leftPosition)
            },[])
    const [cases,setcases]=useState([])
    const {user,setuser,modal,ismodalopen,loading,setloading}=useContext(cartcontext)
    const casecategory=useRef()
    const casesubtype=useRef()
    function handleaddjudge(){
        addjudge?setaddjudge(false):setaddjudge(true)
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
            value:'casetype'
          })
        })
        setloading(false)
    }
    useEffect(()=>{
      fetchs().then(res=>{
        res.json().then(data=>{
          setcases(data)
          setoriginal(data)
        })
      })
    },[check])
    async function fetchs(){
      const data=await fetch('http://localhost:3000/api/casetype',{
        method:"POST",
        body:JSON.stringify({
find:true,
      
          casetype:user.mainuser.casetype
        })
      }) 
      return data
    }
    async function handlesubmit(){
        console.log('sdsdsdd')
        setloading(true)
         await fetch('http://localhost:3000/api/casetype',{
            method:"POST",
            body:JSON.stringify({
              casetypes:casetype.current.value,
              casesubtype:casesubtype.current.value,
              category:casecategory.current.value,
              _id:user.mainuser._id,
              find:false,
              casetype:user.mainuser.casetype
            })
          })
          setloading(false)
        handleaddjudge()
    }
    function handleaddjudge(){

      modal?ismodalopen(false): ismodalopen(true)
     }
  return (
    <>
        
       {
        modal && <>
        <div className='judgemodalanimate container z-[99] grid   p-10' style={{position:"fixed",width:`500px`,left:`${left}`,top:"15px"}}>
         <div className='w-auto h-auto gap-4 grid grid-cols-2'> <div>
          <label htmlFor='courtname ' className='h-[25px]'> Case Type</label>

          <input id='courtname' ref={casetype} className='input h-[15px] '></input>
          <span className="outline1 "></span></div>
          <div>
          <label htmlFor='Description ' className='h-[25px]'>Case Subtype</label>
          <input id='Description' className='input h-[15px] ' ref={casesubtype}></input>
          <span className="outline1 "></span></div>
          <div>
          <label htmlFor='Juridiction ' className='h-[25px]'>Category</label>
          <input id='Juridiction' className='input h-[15px] ' ref={casecategory}></input>
          <span className="outline1 "></span></div></div>
<button className='absolute right-5' onClick={handleaddjudge}>X</button>
          <button onClick={handlesubmit} className='self-center container buttonborder p-1 pl-2 pr-2 text-xl font-semibold'>Submit</button>
        </div>
        </>
      }    

    <div className=' w-auto' style={{minHeight:"100vh",maxHeight:"100vh"}}>
    <div>
        <button  className='container buttonborder p-2 pl-4 pr-4 text-xl font-semibold ' onClick={handleaddjudge}>Add CaseType</button>
        <hr className={`ml-[30px] mr-[30px] ${modal?"hidden":""}`}></hr>
    </div>
    <div className={`container grid  z-[98]  ${modal?"loweranimate":""}`} style={{overflowY:"auto",maxHeight:"500px"}}>
        <h1 className='tableh1 text-2xl font-bold'>Customers table</h1>
        <select onChange={handlefilterchange} ref={filtervalue} className='justify-self-end container relative  mr-6 w-16 pl-2' defaultValue={'Fliters'} style={{width:"100px",height:"20px",position:"relative",right:"20px",marginTop:"10px",marginBottom:"0px"}}><option value={'both'}>Both</option><option value={true}>On</option><option value={false}>Off</option></select>
        <div className="table justify-self-center">
            <table style={{overflowY:"auto",maxHeight:"300px"}}>
                <thead className="tableheader ">
                    <tr className="tablerow ">

                        <th style={{borderTopLeftRadius:"20px"}}>S.NO</th>
                        <th>Case Type</th>
                   
                        <th>Case SubType</th>
                        <th>Case Category</th>

                        <th style={{borderTopRightRadius:"20px"}}>Status</th>
                    </tr>
                </thead>
                    
                <tbody className="tablebody">
                   {
                     ( cases.length==0 && <><Loadingskeleton number={6}/></>)||
                    cases.map((data,index)=>{
                      return <tr   height={"10"}><td className={`${index+1==cases.length?"td1radius":""}`}>{index+1}</td>
                      <td>{data.casetype}</td>
                      <td >{data.casesubtype}</td>
                      <td >{data.casecategory}</td>
                     
                      <td  className={`${index+1==cases.length?"tdlastradius":""}`}><label className={`${styles.switch}`}>
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
    </div></div>
    </>
  )
}
