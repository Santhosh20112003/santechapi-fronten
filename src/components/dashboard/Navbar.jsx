import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { links, profilepic } from "../common/links";
import { useUserAuth } from "../context/UserAuthContext";
import FreeCard from "./profilecard";
import * as Dialog from "@radix-ui/react-dialog";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, logOut } = useUserAuth();

  const toggleNavbar = () => setOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeSidebar = () => setOpen(false);

  return (
    <nav className="bg-gray-800 shadow-xl h-[10vh]">
      <div className="mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-[10vh]">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => { setOpen(true) }}
              className="md:hidden lg:hidden text-2xl mt-0.5 active:scale-110 transition-transform rounded-md transform duration-300 text-white py-2 px-3"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-8 h-8"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <Dialog.Root open={open} >
              <Dialog.Portal>
                <Dialog.Overlay onClick={closeSidebar} className="bg-blackA6 z-[1000] data-[state=open]:left-0 left-[-50%] fixed inset-0" />
                <Dialog.Content className="z-[10000] h-screen data-[state=open]:animate-slideDrawer fixed top-0 left-0 w-[75%] flex flex-col max-w-[250px] bg-violet-500 p-4 focus:outline-none">
                  <span className="flex bg-violet-900 h-[10vh] rounded-2xl items-center justify-start px-4 w-full gap-1 mb-3">
                    <img
                      src={require("../assert/santechapi-logo.png")}
                      alt="SanTech API Logo"
                      className="h-10 w-10"
                    />
                    <Link to="/home" onClick={closeSidebar} className="text-white text-2xl font-bold">
                      SanTech API
                    </Link>
                  </span>
                  <span className="flex items-center justify-center w-full mb-3">
                    <Link
                      to="home"
                      className="text-lg mt-3 text-center py-3 mx-5 font-semibold w-full text-gray-700 rounded-md bg-violet-300"
                      onClick={closeSidebar}
                    >
                      <i className="fas fa-house me-2"></i>Overview
                    </Link>
                  </span>
                  <span>
                    {links.map((link) => (
                      <div
                        key={link.name}
                        className=" leading-none pl-5 w-full md:my-0 my-7"
                      >
                        <Link
                          to={link.link}
                          onClick={closeSidebar}
                          className={`text-white px-7 text-xl py-3 rounded-r-full ${location.pathname.includes(link.link)
                            ? "bg-violet-900 text-black font-medium"
                            : ""
                            }`}
                          onClick={closeSidebar}
                        >
                          <i className={`${link.icon} me-5`}></i>
                          {link.name}
                        </Link>
                      </div>
                    ))}
                    <span className="flex items-center justify-center">
                      <FreeCard />
                    </span>
                  </span>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <div className="flex-shrink-0 flex items-center mt-0.5">
              <span className="text-white hidden lg:block md:block lg:text-xl text-2xl font-bold ml-1">
                Your API Dashboard
              </span>
              <span className="flex lg:hidden ml-2 items-center gap-3 md:hidden">
                <img
                  src={require("../assert/santechapi-logo.png")}
                  alt="SanTech API Logo"
                  className="h-12 w-12"
                />
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-3 relative">
              <div
                onClick={toggleDropdown}
                className="flex w-fit items-center cursor-pointer gap-2"
              >
                <div className="h-12 w-12 rounded-full flex border border-gray-300 items-center justify-center text-white md:text-3xl text-2xl text-center relative">
                  <img
                    src={user.photoURL || profilepic()}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="absolute w-3 h-3 bg-green-500 rounded-full -top-1 right-1 transform md:translate-x-2 translate-x-0 translate-y-2 border border-white"></div>
                </div>
              </div>

              {isDropdownOpen && (
                <div className="origin-top-right z-30 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <Link
                      to="profile"
                      className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={toggleDropdown}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        logOut();
                        window.location.href = "/home";
                      }}
                      className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
