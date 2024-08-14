import React from 'react'
import { useSelector } from 'react-redux'

const TestRedux1 = () => {
    const {user} = useSelector((state) =>({...state}))
    console.log('user = ',user)
  return (
    <div>TestRedux1
        <div>{user.value}</div>
        <div>{user.user}</div>
    </div>
    
  )
}

export default TestRedux1