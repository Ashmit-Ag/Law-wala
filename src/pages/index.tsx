import Image from 'next/image'
import { Inter } from 'next/font/google'
import Addcase from '../../component1/Addcase'
import Landing from '../../components/Landing'
import { useContext, useEffect } from 'react';
import { cartcontext } from '../../cartproviders/cartprovider';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
const {setjudge,setadmin,setadvocate,setclient}=useContext(cartcontext)
const router=useRouter()
  async function handleclick(e){
e.target.innerText=='Login as a Admin' && (setadmin(true)||setjudge(false)||setclient(false)||setadvocate(false) || router.push('/login')) ;
e.target.innerText=='Login as a judge' && (setjudge(true) ||setadmin(false)||setclient(false)||setadvocate(false) || router.push('/login'));
e.target.innerText=='Login as an advocate' && (setadvocate(true) ||setjudge(false)||setclient(false)||setadmin(false) || router.push('/login'));
e.target.innerText=='Login as a client' && (setclient(true)||setjudge(false)||setadmin(false)||setadvocate(false) ||  router.push('/login'));
e.target.innerText=='Signin as a Admin' && (setadmin(true)||setadvocate(false)||setclient(false)||setjudge(false) || router.push('/signin'));
e.target.innerText=='Signin as a judge' && (setjudge(true)||setadmin(false)||setclient(false)||setadvocate(false) || router.push('/signin'));
e.target.innerText=='Signin as an advocate' && (setadvocate(true)||setclient(false)||setjudge(false)||setadmin(false) || router.push('/signin'));
e.target.innerText=='Signin as a client' && (setclient(true)||setadmin(false)||setadvocate(false)||setjudge(false) || router.push('/signin'));

  }
  return (
    <>
    <div className='h-[40vh] w-[100vw] flex flex-row gap-4'>
<div className='container' onClick={handleclick} ><h1>Login as a Admin</h1></div>
<div className='container' onClick={handleclick} ><h1>Login as a judge</h1></div>
<div className='container' onClick={handleclick} ><h1>Login as an advocate</h1></div>
<div className='container' onClick={handleclick} ><h1>Login as a client</h1></div>

    </div>
    <div className='h-[40vh] w-[100vw] flex flex-row gap-4'>
<div className='container' onClick={handleclick} ><h1>Signin as a Admin</h1></div>
<div className='container' onClick={handleclick} ><h1>Signin as a judge</h1></div>
<div className='container' onClick={handleclick} ><h1>Signin as an advocate</h1></div>
<div className='container' onClick={handleclick} ><h1>Signin as a client</h1></div>

    </div>
    </>
  )
}
