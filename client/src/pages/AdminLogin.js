import React from 'react'
import { useLocation } from 'react-router-dom'
import AdminSidebar from '../components/Admin/AdminSidebar/AdminSidbar'
import Applicaiton from '../components/Admin/Application/Application'
import Dashboard from '../components/Admin/Dashboard/Dashboard'
import Movie from '../components/Admin/Movie/MovieForm'



function AdminLogin() {
  return (
    <AdminSidebar>
      
        <Dashboard/>
     
      
    </AdminSidebar>
  )
}

export default AdminLogin