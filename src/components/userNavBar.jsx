import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogOut } from '../store/AuthSlice';

function UserNavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
    const dispatch = useDispatch()
  const Logout = () =>{
    dispatch(userLogOut())
    navigate('/')
  }

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
    <h1 className="text-sm font-bold text-cyan-900"></h1>
    <div className="hidden md:flex pe-5">
      <div
        className="p-2.5 me-3 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-cyan-900 text-white"
      >
        <i className="bi bi-chat-left-text-fill"></i>
        <span
          onClick={() => navigate('/dashboard')}
          className="text-[14px] ml-8 text-cyan-900 hover:text-white font-montserrat font-bold"
        >
          Dashboard
        </span>
      </div>
      <div
        className="p-2.5 mt-3 me-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-cyan-900 text-white"
      >
        <i className="bi bi-chat-left-text-fill"></i>
        <span
          onClick={() => navigate('/leave-application')}
          className="text-[14px] ml-8 text-cyan-900 font-montserrat hover:text-white font-bold"
        >
          Leave Application
        </span>
      </div>
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-cyan-900 text-white"
      >
        <i className="bi bi-chat-left-text-fill"></i>
        <span
          onClick={Logout}
          className="text-[14px] ml-8 text-cyan-900 font-montserrat hover:text-white font-bold"
        >
         Logout
        </span>
      </div>
    </div>

    {/* Mobile Menu Button */}
    <button
      className="md:hidden text-cyan-900 border w-14 rounded-md h-6 border-cyan-800"
      onClick={() => setDropdownOpen(!dropdownOpen)}
    >
      <span className='text-sm p-2'>Menu</span>
    </button>

    {/* Dropdown Menu for Smaller Screens */}
    {dropdownOpen && (
      <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded-md z-50">
        <div
          className="p-2.5 mt-3 flex items-center rounded-md cursor-pointer hover:bg-cyan-900 text-white"
        >
          <i className="bi bi-chat-left-text-fill"></i>
          <span
            onClick={() => {
              navigate('/dashboard');
              setDropdownOpen(false);
            }}
            className="text-[14px] ml-8 text-cyan-900 hover:text-white font-montserrat font-bold"
          >
            Dashboard
          </span>
        </div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md cursor-pointer hover:bg-cyan-900 text-white"
        >
          <i className="bi bi-chat-left-text-fill"></i>
          <span
            onClick={() => {
              navigate('/leave-application');
              setDropdownOpen(false);
            }}
            className="text-[14px] ml-8 text-cyan-900 hover:text-white font-montserrat font-bold"
          >
            Leave Application
          </span>
        </div>
        <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-cyan-900 text-white"
      >
        <i className="bi bi-chat-left-text-fill"></i>
        <span
          onClick={Logout}
          className="text-[14px] ml-8 text-cyan-900 font-montserrat hover:text-white font-bold"
        >
         Logout
        </span>
      </div>
      </div>
    )}
  </div>
  );
}

export default UserNavBar;
