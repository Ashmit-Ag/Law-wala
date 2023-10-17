import { useContext, useEffect, useRef } from "react"
import {cartcontext} from '../../cartproviders/cartprovider'
import { useRouter } from "next/router"
const login = () => {
    const {user,setuser,judge,advocate,client,admin,loading,setloading}=useContext(cartcontext)
    const router=useRouter()
    const email=useRef()
    const password=useRef()
    async function handleclick(e){
        e.preventDefault()
        setloading(true)
       const data= await fetch(`http://localhost:3000/api/${admin?'adminlogin':judge?'judgeogin':advocate?"advocatelogin":'clientlogin'}`,{
            method:"POST",
            body:JSON.stringify({
                email : email.current.value,
                password:password.current.value,
            })
        })
        data.json().then(async res=>{
           await setuser(res)
           
           sessionStorage.setItem('user',JSON.stringify(res.mainuser))
        })      
        setloading(false)
          router.push('/caseadd')


    }
    return (
      <div className="limiter">
          <div className="container-login100 bg-stone-300" style={{backgroundImage:" url('images/bg-01.jpg');"}}>
              <div className="gradient w-[450px]">
                  <form className="login100-form validate-form">
                      <span className="login100-form-logo">
                          <i className="zmdi zmdi-landscape"></i>
                      </span>
  
                      <span className="login100-form-title p-b-34 p-t-27">
                          Log in
                      </span>
  
                      <div className="wrap-input100 validate-input" data-validate = "Enter Email">
                          <input className="input100"  ref={email} type="text" name="Email" placeholder="Email"/>
                          <span className="focus-input100" data-placeholder="&#xf207;"></span>
                      </div>
  
                      <div className="wrap-input100 validate-input" data-validate="Enter password">
                          <input className="input100" type="password" ref={password} name="pass" placeholder="Password"/>
                          <span className="focus-input100" data-placeholder="&#xf191;"></span>
                      </div>
  
                      <div className="contact100-form-checkbox">
                          <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
                          <label className="label-checkbox100" htmlFor="ckb1">
                              Remember me
                          </label>
                      </div>
  
                      <div className="container-login100-form-btn">
                          <button className="login100-form-btn" onClick={handleclick}> 
                              Login
                          </button>
                      </div>
  
                      <div className="text-center p-t-90">
                          <a className="txt1" href="#">
                              Forgot Password?
                          </a>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  
    )
  }
  
  export default login