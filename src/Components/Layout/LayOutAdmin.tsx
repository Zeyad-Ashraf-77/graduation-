import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function LayOutAdmin() {
  return (
    <>
        <Sidebar />
        <div className="p-4 sm:ml-64">
        <Outlet />
        </div> 
    </>
  )
}
