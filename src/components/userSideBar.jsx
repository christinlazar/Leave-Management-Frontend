import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserSideBar() {
  const navigate = useNavigate()
  return (
    <div className='sm:hidden md:block'>
        <span
      className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
    >
    </span>
    <div
      className="sidebar hidden md:block shadow-2xl fixed top-20 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-white"
    >
      <div className="text-cyan-900 text-md">
        <div className="p-2.5 mt-1 flex items-center">
        <div>
          <h1 className="font-bold  font-montserrat text-blacktext-[20px] ml-6">LEAVE MANAGEMENT</h1>
         
        </div>
          <i
            className="bi bi-x cursor-pointer ml-28 lg:hidden"
          ></i>
        </div>
      </div>
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-cyan-900 text-white"
      >
        <i className="bi bi-chat-left-text-fill"></i>
        <div className="flex justify-between w-full items-center">
          <span onClick={()=>navigate('/dashboard')} className="text-[14px] ml-8 text-cyan-900 hover:text-white font-montserrat font-bold">Dashboard</span>
          <span className="text-sm rotate-180" id="arrow">
            <i className="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-cyan-900 text-white"
      >
        <i className="bi bi-chat-left-text-fill"></i>
        <div className="flex justify-between w-full items-center">
          <span onClick={()=>navigate('/leave-application')} className="text-[14px] ml-8 text-cyan-900 font-montserrat hover:text-white font-bold">Leave Application</span>
          <span className="text-sm rotate-180" id="arrow">
            <i className="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserSideBar