import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import LeaveForm from '../pages/LeaveForm'
import PieChartComponent from '../pages/Dashboard'
import UserLoggedIn from '../components/userLoggedIn'
import UserLoggedOut from '../components/userLoggedOut'
import FourNotFourpage from '../components/FourNotFour'
function UserRoute() {
  return (
    <Routes>
    <Route element={<UserLoggedIn />}>
      <Route path="/dashboard" element={<PieChartComponent />} />
      <Route path="/leave-application" element={<LeaveForm />} />
    </Route>

    <Route element={<UserLoggedOut />}>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Login />} />
    </Route>
    <Route path='*' element={<FourNotFourpage/>}/>
  </Routes>
  )
}

export default UserRoute