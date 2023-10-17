import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import Caseadding from '../components/Caseadding'
import Addcasetype from '../components/Addcasetype'
import { cartcontext } from '../cartproviders/cartprovider'
import Courtadd from '../components/Courtadd'
import Chatcomponent from '../components/Chatcomponents'
import Seecase from '../components/Seecase'
import Addappointement from '../components/Addappointement'
import Settings from '../components/Settings'
import Tasks from '../components/Tasks'
import Clientadd from '../components/Clientadd'
import Advocateadd from '../components/Advocateadd'
import Dashboard from '../components/Dashboard'
import Createjudge from '../components/Createjudge'
import Casedetails from '../components/Casedetails'
import Link from 'next/link';
import Loader from '../components/Loader';
export default function Addcase() {
  const {modal ,judge,admin,advocate,client,loading,user,casedetails,setcasedetails}=useContext(cartcontext)
 const [seecase,setseecase]=useState(false)
 const [chat,ischat]=useState(false)
  const [dashboard,setdashboard]=useState(true)
  const [bottom,setbottom]=useState('')
  const [left,setleft]=useState('')
  const [bottom1,setbottom1]=useState('')
  const [addjudge,setaddjudge]=useState(false)
  const [addcasetype,setaddcasetype]=useState(false)
  const [settings,setsettings]=useState(false)
  const [tasks,settasks]=useState(false)
  const [appointement,setappointement]=useState(false)
  const [addclient,setaddclient]=useState(false)
  const [addadvocate,setaddadvocate]=useState(false)
  let [value,setvalue]=useState(1);
  function handleclick(e){
e.target.innerText=='Dashboard' && (setcasedetails(false)|| setdashboard(true) ||setseecase(false) || setaddjudge(false) || setaddcasetype(false) || setsettings(false) || settasks(false) || setappointement(false)||setaddclient(false)||setaddadvocate(false))
e.target.innerText=='Cases' && (setcasedetails(false)||setdashboard(false) ||setseecase(true) || setaddjudge(false) || setaddcasetype(false) || setsettings(false) || settasks(false) || setappointement(false)||setaddclient(false)||setaddadvocate(false))
e.target.innerText=='Settings' && (setcasedetails(false)||setdashboard(false) ||setseecase(false) || setaddjudge(false) || setaddcasetype(false) || setsettings(true) || settasks(false) || setappointement(false)||setaddclient(false)||setaddadvocate(false))
e.target.innerText=='Case Type' && (setcasedetails(false)||setdashboard(false) ||setseecase(false) || setaddjudge(false) || setaddcasetype(true) || setsettings(false) || settasks(false) || setappointement(false)||setaddclient(false)||setaddadvocate(false))
e.target.innerText=='Judges' && (setcasedetails(false)||setdashboard(false) ||setseecase(false) || setaddjudge(true) || setaddcasetype(false) || setsettings(false) || settasks(false) || setappointement(false)||setaddclient(false)||setaddadvocate(false))
e.target.innerText=='Tasks' && (setcasedetails(false)||setdashboard(false) ||setseecase(false) || setaddjudge(false) || setaddcasetype(false) || setsettings(false) || settasks(true) || setappointement(false)||setaddclient(false)||setaddadvocate(false))
e.target.innerText=='Appointement' && (setcasedetails(false)||setdashboard(false) ||setseecase(false) || setaddjudge(false) || setaddcasetype(false) || setsettings(false) || settasks(false) || setappointement(true)||setaddclient(false)||setaddadvocate(false))
e.target.innerText=='Advocate' && (setcasedetails(false)||setdashboard(false) ||setseecase(false) || setaddjudge(false) || setaddcasetype(false) || setsettings(false) || settasks(false) || setappointement(false)||setaddclient(false)||setaddadvocate(true))
e.target.innerText=='Client' && (setcasedetails(false)||setdashboard(false) ||setseecase(false) || setaddjudge(false) || setaddcasetype(false) || setsettings(false) || settasks(false) || setappointement(false)||setaddclient(true)||setaddadvocate(false))

}
	useEffect(() => {
		const fullHeight = () => {
		  const elements = document.querySelectorAll('.js-fullheight');
		  elements.forEach((element) => {
			element.style.height = window.innerHeight + 'px';
		  });

		};
    
	
		fullHeight();
	setbottom(window.innerHeight-60)
  setleft(window.innerWidth-70)
  setbottom1(window.innerHeight-410)
		window.addEventListener('resize', fullHeight);
	
		// Clean up the event listener when the component unmounts
		return () => {
		  window.removeEventListener('resize', fullHeight);
		};
	  }, []); // Empty dependency array ensures this effect only runs once on mount
	
	  const handleSidebarClick = () => {
		const sidebar = window.document.getElementById('sidebar');
	sidebar?.classList.toggle('active')
	  };
    useEffect(()=>{
      casedetails && (setdashboard(false) ||setseecase(false) || setaddjudge(false) || setaddcasetype(false) || setsettings(false) || settasks(false) || setappointement(false)||setaddclient(false)||setaddadvocate(false))

    })
    async function chatting(){
      chat?ischat(false):ischat(true)
    }
  return (
    <>
    {
      chat && <>
     <div style={{height:"50vh",width:['320px'],overflow:"hidden",zIndex:"99",top:bottom1+'px',left:left-280+'px',position:"fixed",borderRadius:"10px"}}> <div className='chat blur-lg backdrop-blur-md' style={{position:"absolute",bottom:"0",borderRadius:"10px",zIndex:"99",backgroundColor:"#77e6ff",opacity:"0.9",backdropFilter:"blur(100px)"}}>
<Chatcomponent value={value}/>

      </div></div>
      </>
    }
    {
      (advocate||client) && <><div className='fixed z-[99] ' onClick={chatting} style={{padding:"10px",zIndex:"99",borderRadius:"50%",left:left+'px',top:bottom+'px',backgroundImage:"linear-gradient(to right,aqua,aqua)"}}><svg fill="currentColor" style={{width:"30px",height:"30px"}} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"></path>
    </svg>
    </div>
    </>
    }
    {loading &&   <><div className='fixed h-[100vh]  blur-sm z-[99] ' style={{backgroundColor:"rgba(0,0,0,0.5",height:"100vh",width:"100vw"}}> 
          </div>
        <Loader /> </>}
	<div className={` wrapper overflow-hidden d-flex align-items-stretch h-auto ${loading?'pointer':""}`} style={{backgroundColor:"#3445b4",color:"white"}}>
   <nav id="sidebar" className={`${modal?"change pointer":"notchange"}`} style={{height:"screen",zIndex:"60",position:"relative"}}>
      <div className="custom-menu">
        <button type="button" id="sidebarCollapse" onClick={handleSidebarClick} className="btn btn-primary">
          <i className="fa fa-bars"></i>
          <span className="sr-only">Toggle Menu</span>
        </button>
        
      </div>
      <div className=" fixed flex flex-col container  " style={{height:"600px",width:"200px",alignItems:"center",position:"fixed"}}>
        <div style={{height:"120px"}}><h1 className='h-[100px]'><a href="index.html" className="logo">Portfolic <span>Portfolio Agency</span></a></h1></div>
        <ul className="list-unstyled  components mb-5  gap-5  flex justify-center flex-col items-center" style={{margin:"0px"}}>
         {admin && <><li onClick={handleclick} className='text-lg w-auto h-auto '>
            <Link href="#" className={`text-2xl linkborder font-bold text-blue`} style={{color:"white"}}>Dashboard</Link>
          </li>
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text-blue'style={{color:"white"}}>Cases</Link>
          </li>
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text'style={{color:"white"}}>Judges</Link>
          </li>
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text'style={{color:"white"}}>Case Type</Link>
          </li>
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text'style={{color:"white"}}>Settings</Link>
          </li></>
}
{judge && <><li onClick={handleclick} className='text-lg w-auto h-auto '>
            <Link href="#" className={`text-2xl linkborder font-bold text-blue`} style={{color:"white"}}>Dashboard</Link>
          </li>
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text-blue'style={{color:"white"}}>Cases</Link>
          </li>
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text'style={{color:"white"}}>Tasks</Link>
          </li>
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text'style={{color:"white"}}>Settings</Link>
          </li></>
}
{client && <><li onClick={handleclick} className='text-lg w-auto h-auto '>
            <Link href="#" className={`text-2xl linkborder font-bold text-blue`} style={{color:"white"}}>Dashboard</Link>
          </li>
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text-blue'style={{color:"white"}}>Cases</Link>
          </li>
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text'style={{color:"white"}}>Tasks</Link>
          </li>
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text'style={{color:"white"}}>Appointement</Link>
          </li>
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text'style={{color:"white"}}>Advocate</Link>
          </li>
          
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text'style={{color:"white"}}>Settings</Link>
          </li>
          
          </>
          
}
{advocate && <><li onClick={handleclick} className='text-lg w-auto h-auto '>
            <Link href="#" className={`text-2xl linkborder font-bold text-blue`} style={{color:"white"}}>Dashboard</Link>
          </li>
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text-blue'style={{color:"white"}}>Cases</Link>
          </li>
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text'style={{color:"white"}}>Tasks</Link>
          </li>
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text'style={{color:"white"}}>Appointement</Link>
          </li>
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text'style={{color:"white"}}>Client</Link>
          </li>
          
          <li onClick={handleclick}>
          <Link href="#" className='text-2xl font-bold text'style={{color:"white"}}>Settings</Link>
          </li></>
}
        </ul>

        
        

      </div>
    </nav>
    <div className='maincontentborder' style={{height:"auto",overflow:"hidden",width:"100vw",marginleft:'10px'}}>
      <div style={{backgroundColor:"white",height:"7vh"}}>

      </div>
          {addadvocate && <Advocateadd />}
          {addcasetype && <Addcasetype />}
          {seecase && <Seecase />}
          {addclient && <Clientadd />}
          {addjudge && <Createjudge />}
          {settings && <Settings />}
          {tasks && <Tasks />}
          {appointement && <Addappointement/>}
          {dashboard && <Dashboard />}
          {casedetails && <Casedetails/>}
    </div>
  </div></>
  )
}
