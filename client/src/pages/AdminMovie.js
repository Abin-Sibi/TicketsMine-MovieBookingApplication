import React from 'react'
import AdminSidebar from '../components/Admin/AdminSidebar/AdminSidbar'
import MovieForm from '../components/Admin/Movie/MovieForm'

function AdminMovie() {
  return (
    <AdminSidebar>
        <MovieForm/>
    </AdminSidebar>
  )
}

export default AdminMovie