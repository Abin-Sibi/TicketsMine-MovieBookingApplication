import React from 'react'
import AdminSidebar from '../components/Admin/AdminSidebar/AdminSidbar'
import UsersList from '../components/Admin/UsersList/UsersList'

function AdminUsers() {
  return (
    <AdminSidebar>
        <UsersList/>
    </AdminSidebar>
  )
}

export default AdminUsers