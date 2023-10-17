import React from 'react'

export default function Loadingskleton(props) {
  const {number}=props
  let array=[]
  for(let i=0;i<number;i++){
    array.push(1)
  }
    return (
<>
        {
            array.map((data,index)=>{
                return <td className={`${((index+1==number)?"tdlastradius":"")||(index==0?"td1radius":"")} pl-10`}><div className={`h-3 w-24  bg-[#77c0ff] rounded-md  z-[10]`}><div className='blur-0 h-[100%] rounded-md z-[99]  loaderanimation'></div></div></td>
            })
        }
        </>
   
  )
}
