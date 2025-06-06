import React from 'react'
import { MdDashboardCustomize, MdOutlineCategory } from 'react-icons/md'
import { SiBrandfolder } from 'react-icons/si'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <>
     
    <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex pt-20 items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
       <span className="sr-only">Open sidebar</span>
       {/* <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
       <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
       </svg> */}
    </button>
    
    <aside id="default-sidebar" className=" fixed top-0 left-0 pt-20 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
       <div className="h-full px-3 py-4 overflow-y-auto bg-[#e5d8be] dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
             <li>
                <NavLink to="/layOutAdmin" className="flex items-center mt-4 p-2  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
                   <span className="ms-3 flex gap-1 items-center "><MdDashboardCustomize className='text-2xl' />
                  Dashboard</span>
                </NavLink>
             </li>
             
             <li>
                <NavLink to="/layOutAdmin/createCategory" className="flex items-center mt-4 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
                   <span className="ms-3 flex gap-1 items-center "> <MdOutlineCategory className='text-2xl' />
                   CreateCategory</span>
                </NavLink>
             </li>
             <li>
                <NavLink to="/layOutAdmin/createBrand" className="flex items-center mt-4 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
                   <span className="ms-3 flex gap-1 items-center "> <SiBrandfolder className='text-2xl' /> CreateBrand 
                   </span>
                </NavLink>
             </li>
             <li>
                <NavLink to="/layOutAdmin/createSubCategory" className="flex items-center mt-4 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
                   <span className="ms-3 flex gap-1 items-center "> <SiBrandfolder className='text-2xl' /> CreateSubCategory
                   </span>
                </NavLink>
             </li>
             
          </ul>
       </div>
    </aside>
    
 
     
        </>
  )
}
