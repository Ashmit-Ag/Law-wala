import React, { useContext, useEffect, useRef, useState } from 'react'
import { cartcontext } from '../cartproviders/cartprovider'
import { io } from 'socket.io-client'
export default function Chatcomponents(props) 

{
    const [send,setsend]=useState(false)
    const [activemessage,setactivemessage]=useState('')
       const socket=io('http://localhost:3001/',{transports:['websocket']});
    useEffect(()=>{

        socket.emit('new-user',({name:user.mainuser._id}))

},[])
   socket.on('receive-message',({message1,to1,from1})=>{
    console.log(message1)
    console.log(from1)
    console.log(to1)
    setmessages(prev=>[...prev,{sender:from1,receiver:to1,message:message1}])
   
})
socket.on('message-sent',({message1,from1,to1})=>{
    setmessages(prev=>[...prev,{sender:user.mainuser._id,receiver:to1,message:message1}])

})
    const {value}=props
    console.log(value)
    const {user,client,advocate,judge,admin}=useContext(cartcontext)
    const message=useRef()
    const [clientsinfo,setclientsinfo]=useState([])
    const [messages,setmessages]=useState([])
    const [activeuser,setactiveuser]=useState('')
    let client1;
    if(advocate){
        client1=user.mainuser.clientsid
    }else if(client){
    client1=user.mainuser.advocatesid
    }
    function handlechatchange(e){
        setactiveuser(e.target.value)
    }

    useEffect(()=>{
        fetchs()
    },[activeuser])
    useEffect(()=>{

        let array=[]
        if(advocate){
        client1.map(async data=>{

            
            await fetch('http://localhost:3000/api/findclient',{
                method:"POST",
                body:JSON.stringify({
                    _id:data
                })
            }).then(res=>{
                res.json().then(final=>{
                    console.log(final)
                        array.push(final[0])
                                setclientsinfo(array)
        setactiveuser(array[0]._id)

                })
            })     


        })
    }
    else{
        console.log("The value of client is",client1)
        client1.map(async data=>{

            await fetch('http://localhost:3000/api/findadvocate',{
                method:"POST",
                body:JSON.stringify({
                    _id:data
                })
            }).then(res=>{
                res.json().then(final=>{
                    console.log(final)
                        array.push(final[0])
                                setclientsinfo(array)
        setactiveuser(array[0]._id)

                })
            })     

        })

    }
    },[])

    async function fetchs(){
        let array=[]
        setmessages([])
    console.log(activeuser)
    if(activeuser.length>0){
          await  fetch('http://localhost:3000/api/chat',{
            method:"POST",
            body:JSON.stringify({
                find:true,
                sender:user.mainuser._id,
                receiver:activeuser
            })
            }).then(res=>{
                    res.json().then((d)=>{
                        console.log("The data is ",d)
                        d.map((da)=>{
                            
                                                    setmessages(prev=>[...prev,{sender:da.sender,receiver:da.receiver,message:da.message}])

                        })
                    })
        })}
       
    }
 
    async function handlesend(){
        console.log(activeuser)
      socket.emit('new-message',({to:activeuser,message:message.current.value,from:user.mainuser._id}))
    socket.emit('hello')
        await fetch('http://localhost:3000/api/chat',{
            method:"POST",
            body:JSON.stringify({
                sender:user.mainuser._id,
                receiver:activeuser,
                message:message.current.value,
                find:false
            })
        })
    }
 return (
<>
    <div className='h-10 w-[100%] p-4 '>
        <select className='w-[100%] bg-white  text-black h-5 rounded-md' onChange={handlechatchange}>
           {
            clientsinfo.map(data=>{
                return <option value={data._id}>{data.fullname}</option>
            })
            }
        </select>
    </div>
    <div className='h-[70%] max-h-56 mt-1 overflow-y-scroll overflow-x-clip  p-6 grid msg gap-2'>
            {
                messages.map(data=>{
                    console.log(data)
                             return   <div className={`${data.sender==user.mainuser._id?"sendermsg":'receivermsg'}`}><p style={{maxWidth:"30px",whiteSpace:"pre-wrap",wordBreak:"break-all"}}>{data.message}</p></div>

                })
            }
    </div>
    <div className=' bottom-0  flex m-4  flex-row gap-0 absolute'>
            <input className='rounded-l-[15px] p-1 w-48' ref={message}></input>
            <button className='bg-blue-900 text-white p-1 w-16 rounded-r-[15px]' onClick={handlesend}>Send</button>
    </div>
</> 
 )
}
