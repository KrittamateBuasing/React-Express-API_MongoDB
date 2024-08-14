import React from 'react'
import SideBar from '../layout/SideBar'
import HeaderBar from '../layout/HeaderBar'
import { Box } from '@mui/material'
import { Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { currentAdmin } from '../Functions/auth'
import NotFound404 from '../components/pages/NotFound404'

const AdminRoute = ({children}) => {
  const {user} = useSelector((state)=>({...state}))
  const [ok,setOk] = useState(false)

  useEffect(()=>{
    if(user && user.user.token){
      currentAdmin(user.user.token)
      .then((res)=>{
        setOk(true)
        console.log(ok)

      })
      .catch((err)=>{
        console.log(err);
        setOk(false);
      
      }
      )
      
    }
   

  },[user]);
  console.log('Admin route',user)
  return ok ? (
    
    <div className="app">
    <SideBar />
    <main className="content">
      <HeaderBar />
      <div className="content_body">
        <Box m="20px">

        {children}
            
        </Box>
      </div>
    </main>
  </div>
 ) : <NotFound404 text='YOU DONT HAVE ADMIN PREMISSION'/>
}

export default AdminRoute