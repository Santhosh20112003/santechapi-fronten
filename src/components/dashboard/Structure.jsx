import React, { useEffect } from 'react';
import {Outlet } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Home() {
  const {user} =useUserAuth();
  useEffect(()=>{
    setuserToken();
  },[user])

  const  setuserToken =()=>{
    const token = user.accessToken;
    localStorage.setItem('token',token);
  }

  return (
    <div className="w-full h-screen flex">
      <Sidebar/>
          <div className="w-full h-screen bg-slate-100">
            <Navbar />
            <Outlet />
          </div>
    </div>
  )
}

export default Home
