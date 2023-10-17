import React, { useContext } from 'react'
import Caseadding from '../../components/Caseadding'
import Addcase from '../../component1/Addcase'
import Createjudge from '../../components/Createjudge'
import Addcasetype from '../../components/Addcasetype'
import { cartcontext } from '../../cartproviders/cartprovider'
import Courtadd from '../../components/Courtadd'
import Seecase from '../../components/Seecase'
import Settings from '../../components/Settings'
import Tasks from '../../components/Tasks'
import Clientadd from '../../components/Clientadd'
import Advocateadd from '../../components/Advocateadd'
import Dashboard from '../../components/Dashboard'
export default function caseadd() {
  const {user,setuser,admin,judge,advocate,client}=useContext(cartcontext)

  return (
    <>
    {/*  Login as Admin  */}
    <Addcase><Dashboard /> </ Addcase>
    </>
  )
}
