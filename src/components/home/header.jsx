import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import List from "./list";
import { main_links } from "../common/links";

function Nav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const {user,logOut} = useUserAuth();
  return (
    <header className="bg-white shadow-md min-h-[10vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link to='/home' className="flex-shrink-0">
                <img
                  className="h-12"
                  src={require('../assert/santechapi.png')}
                  alt="Workflow"
                />
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                {main_links.map((link)=>(
                  <Link
                  to={link.link}
                  className={`${
                    location.pathname.includes(link.link) ? 'bg-violet-700 text-white  shadow-lg' : ''
                  } text-black block px-3 py-2 rounded-md text-base font-medium`}
                >
                  {link.name}
                </Link>
                ))}
                </div>
              </div>
            </div>
            
            
            {user ? 
        (<span className="hidden md:flex items-center gap-3">
			 <Link to="/dashboard" className="px-3 py-2 font-bold rounded text-gray-600 ">Dashboard</Link>
			<button onClick={(e)=>{localStorage.removeItem("token");
            logOut();
            window.location.href="/home"}} className="px-3 py-2 font-bold rounded border-2 bg-violet-500 text-white"><i className="fas fa-arrow-right-to-bracket"></i> Log out </button>
		    </span>)
        :
        (<span className="hidden md:flex items-center gap-3">
			  <Link to="/login" className="px-3 py-2 font-bold rounded text-gray-600 ">Login</Link>
			   <Link to="/register" className="px-3 py-2 font-bold rounded border-2 bg-violet-500 text-white">Sign Up</Link>
		     </span>)}
		  <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-violet-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-violet-600 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
		  
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden bg-white shadow-md" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

                {main_links.map((link)=>(
                  <Link
                  to={link.link}
                  className={`${
                    location.pathname.includes(link.link) ? 'bg-violet-700 text-white  shadow-lg' : ''
                  } text-black block px-3 py-2 rounded-md text-base font-medium`}
                >
                  {link.name}
                </Link>
                ))}

                
				{user ? 
        (<span className="flex items-center gap-3">
			<Link to="/dashboard" className="px-3 py-2 font-bold rounded text-gray-600 ">Dashboard</Link>
			<button onClick={(e)=>{localStorage.removeItem("token");
            logOut();
            window.location.href="/home"}} className="px-3 py-2 font-bold rounded border-2 bg-violet-500 text-white"><i className="fas fa-arrow-right-to-bracket"></i> Log out</button>
		    </span>)
        :
        (<span className="flex items-center gap-3">
			  <Link to="/login" className="px-3 py-2 font-bold rounded text-gray-600 ">Login</Link>
			   <Link to="/register" className="px-3 py-2 font-bold rounded border-2 bg-violet-500 text-white">Sign Up</Link>
		     </span>)}
              </div>
            </div>
          )}
        </Transition>
      </header>
  );
}

export default Nav;