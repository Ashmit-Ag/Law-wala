import React, { useEffect, useState } from 'react'
import { Vortex } from 'react-loader-spinner';
export default function Loader() {
    const [height,setheight]=useState('')
    const [width,setwidth]=useState('')
    useEffect(()=>{
            const height=window.innerHeight
            const width=window.innerWidth
setheight(height/2-10)
setwidth(width/2+60)
    })
  return (
   <> 
  <div className={` fixed   z-[200] `} style={{top:`${height+'px'}`,left:`${width+'px'}`}}>
  <Vortex
  
  visible={true}
  height="80"
  width="80"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
/></div></>
  )
}
