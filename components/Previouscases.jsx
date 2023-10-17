import React from 'react'

export default function Previouscases() {
    const [cases,setcases]=useState([])
    const [left,setleft]=useState(0)
    const [id,setid]=useState('')
    const {user,setuser,judge,setjudge,modal,ismodalopen}=useContext(cartcontext)
   
    function compareDates(givenDate,object) {
        const currentDate = new Date();
      
        const givenDateObject = new Date(givenDate);
      
        if (isNaN(givenDateObject)) {
          return "Invalid date format";
        }
              if (currentDate < givenDateObject) {} 
        else if (currentDate > givenDateObject) {
          return object
        } else {
          return object;
        }
      }


    function handleclosemodal(){

        modal?ismodalopen(false): ismodalopen(true)
       }
    async function handleeditchange(){
        console.log(nextdate.current.value)
    }
    useEffect(()=>{
        const screenWidth = window.innerWidth;
        console.log(screenWidth)
         var  leftPosition = (screenWidth-500) / 2 + 'px';
         setleft(leftPosition)
      },[])
  useEffect(()=>{
    fetchs().then(res=>{
        res.json().then(r=>{
          const array=r.map(data=>{
                compareDates(data.nexthearingdate[0],data)
            })
            setcases(array)
        })
    })
  },[]) 
async function fetchs(){ 
   const data= await fetch('http://localhost:3000/api/casesee',{
        method:"POST",
        body:JSON.stringify({
            _id:user.mainuser._id
        })
    })

return data
}


 async function handlechangedate(e){
    console.log(id)
    let nextdatea=''
    cases.map((data)=>{
        if(data._id==id){
            nextdatea=data.nexthearingdate
        }
    })
    // await fetch('http://localhost:3000/api/addcase',{
    //     method:"POST",
    //     body:JSON.stringify({setdate:true,
    //     _id:id,
    //     nexthearingdate:nextdate.current.value,
    //     hearingdate:nextdatea})
        
    // })
 }

  return (
    <>
    {
        modal && <>
        <div className='judgemodalanimate container z-[99] grid   p-10' style={{position:"fixed",width:`500px`,left:`${left}`,top:"15px"}}>
          
          <label htmlFor='nexthearingdate' className='h-[25px]'> Conclusion</label>
          <input id='nexthearingdate' onChange={handleeditchange} className='input h-[15px] ' type='date' ref={nextdate}></input>
          <span className="outline1 "></span>
<button className='absolute right-5' onClick={handleclosemodal} >X</button>
          <button className='self-center container buttonborder p-1 pl-2 pr-2 text-xl font-semibold' onClick={handlechangedate}>Submit</button>
        </div>
        </>
      }  
    <div className={`h-[93vh] ${modal?"change":""}`}>
    <div className=' w-auto'>
    <div>
        <button onClick={handleaddcase} className='container buttonborder p-2 pl-4 pr-4 text-xl font-semibold '>Add Case</button>
        <hr className={`ml-[30px] mr-[30px] ${modal?"hidden":""}`}></hr>
    </div>
     <div className={`container grid  z-[98]  ${modal?"loweranimate":""}`} style={{overflowY:"auto",maxHeight:"500px"}}>
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
                   {( cases.length==0 && <><Loadingskeleton number={6}/></>)||
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
    </div></div></div></>
  )
}
