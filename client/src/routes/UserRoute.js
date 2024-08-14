import React from 'react'
import { useSelector } from 'react-redux'
import ResponsiveAppBar from '../layout/ResponsiveAppBar'
import NotFound404 from '../components/pages/NotFound404'

const UserRoute = ({children}) => {
    const {user} = useSelector((state)=>({...state}))
    console.log('user route',user)
  return user && user.user.token 
  ? <>
  <ResponsiveAppBar/> {children }
  
  </>
  : <NotFound404 text = 'NO USER LOGIN'/>
}

export default UserRoute