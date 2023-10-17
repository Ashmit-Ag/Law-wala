import React, { createContext, useEffect, useState } from 'react'
export const cartcontext=createContext()
export default function CartProvider({children}) {
const [user,setuser]=useState([])
const [modal,ismodalopen]=useState(false)
const [judge,setjudge]=useState(false)
const [admin,setadmin]=useState(false)
const [advocate,setadvocate]=useState(false)
const [loading,setloading]=useState(false)
const [casedetails,setcasedetails]=useState(false)
const [client,setclient]=useState(false)
const [caseinfo,setcaseinfo]=useState([])
  return (

    <cartcontext.Provider value={{user,loading,setloading,caseinfo,setcaseinfo,setuser,casedetails,setcasedetails,modal,admin,setadmin,advocate,setadvocate,client,setclient,ismodalopen,judge,setjudge}}>{children}</cartcontext.Provider>
  )
}
