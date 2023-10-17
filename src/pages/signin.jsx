import { useContext, useRef, useState } from "react"
import { cartcontext } from "../../cartproviders/cartprovider"

const signup = () => {
    const {judge,advocate,client,admin,setloading}=useContext(cartcontext)
const email=useRef()
const password=useRef()
const fullname=useRef()
const number=useRef()
async function handlesubmit(e){
    e.preventDefault()
    setloading(true)
    await fetch(`http://localhost:3000/api/${admin?'adminsignin':judge?'judgesignin':advocate?"advocatesignin":'clientsignin'}`,{
        method:"POST",
        body:JSON.stringify({
            email:email.current.value,
            password:password.current.value
,
fullname:fullname.current.value
,
phonenumber:number.current.value

        })
    })
    setloading(false)
    e.preventDefault()

}
    return (
      <div className="limiter">
          <div className="container-login100 bg-stone-300" style={{backgroundImage:" url('images/bg-01.jpg');"}}>
              <div className="gradient p-10 rounded-xl w-[450px]">
                  <form className="login100-form validate-form">
                      <span className="login100-form-logo">
                      </span>
  
                      <h2 className="text-black opacity-70 font-semibold text-4xl text-center p-2">
                          Sign Up
                      </h2>
  
                      <div className="wrap-input100 validate-input" data-validate = "Enter username">
                          <input className="input100" ref={fullname} type="text" name="fullname" placeholder="Full Name"/>
                          <span className="focus-input100" data-placeholder="&#xf207;"></span>
                      </div>

                      <div className="wrap-input100 validate-input" data-validate = "Enter username">
                          <input className="input100" ref={number} type="number" name="phonenumber" placeholder="+91"/>
                          <span className="focus-input100" data-placeholder="&#xf207;"></span>
                      </div>

                      <div className="wrap-input100 validate-input" data-validate = "Enter username">
                          <input className="input100" ref={email} type="email" name="email" placeholder="Email id"/>
                          <span className="focus-input100" data-placeholder="&#xf207;"></span>
                      </div>
  
                      <div className="wrap-input100 validate-input" data-validate="Enter password">
                          <input className="input100" ref={password} type="password" name="pass" placeholder="Password"/>
                          <span className="focus-input100" data-placeholder="&#xf191;"></span>
                      </div>
  
                      <div className="contact100-form-checkbox">
                          <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
                          <label className="label-checkbox100" for="ckb1">
                              Remember me
                          </label>
                      </div>
  
                      <div className="container-login100-form-btn">
                          <button className="login100-form-btn" onClick={handlesubmit}>
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
  
  export default signup