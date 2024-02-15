import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import {links} from '../common/links';
import FreeCard from './profilecard';

function Sidebar() {
	const location = useLocation();
  return (
	<div className="min-w-[250px] lg:w-[10%] hidden bg-violet-500 h-screen lg:flex md:flex flex-col gap-3 items-center justify-start">
            <div className="w-full flex items-center justify-center h-24 hover:scale-105 transition-transform cursor-pointer">
              <Link to='/home' className="flex items-center justify-center w-[85%] bg-gray-800 px-2 py-3 shadow-md rounded-md">
                <img className="h-10 w-10" src={require('../assert/santechapi-logo.png')} alt="Logo" />
                <span className="text-white text-2xl font-bold ml-2">SanTech Api</span>
              </Link>
            </div>
            <span className=" w-full flex flex-col items-start">
              <span className="flex items-center justify-center w-full mb-5">
              <Link to="home" className='text-lg shadow-lg text-center py-3 mx-5 font-semibold w-full  text-gray-700 rounded-md bg-violet-300' ><i className={`fas fa-house me-2`}></i>Overview</Link>
              </span>
             
              <ul className='w-full flex flex-col items-center gap-3'>
                {links.map((link) => (
                  <Link to={link.link} className={`text-lg text-center py-3 rounded-md transition text-white font-medium w-[80%] ${
                    location.pathname.includes(link.link) ? 'bg-gray-800 shadow-lg' : ''
                  }`}>
                      <i className={`${link.icon} me-3`}></i>{link.name}
                  </Link>
                ))}
              </ul>
            </span>
            <FreeCard/>
          </div>
  )
}

export default Sidebar
