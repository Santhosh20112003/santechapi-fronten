import React, { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";

function Forgetpassword() {
  const [email, setEmail] = useState("");
  const { forgetpassword } = useUserAuth();
  const [isloading, setisloading] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setisloading(true);
    toast.remove();
    try {
      await forgetpassword(email);
      setisloading(false);
      toast.success("Email has been Sent Successfully.");
    } catch (err) {
      toast.error(err.message.replace("Firebase:", "").replace(".", "").replace("Error", ""));
      setisloading(false);
    }
    setisloading(false);
  };

  return (
    <div className="w-100 h-screen flex items-center bg-[url('https://ik.imagekit.io/vituepzjm/mobile-forget.svg')] lg:bg-[url('https://ik.imagekit.io/vituepzjm/desktop-forget.svg')] bg-cover justify-center">
      <Link
        to="/home"
        className="fixed active:scale-105 transition-transform  px-3.5 py-2 top-5 left-5 rounded-full shadow-lg
     bg-violet-700 w-fit h-fit"
      >
        <i className="text-xl text-white fas fa-arrow-left font-bold"></i>
      </Link>

      <div className=" flex items-center bg-violet-200 bg-opacity-50 border-2 border-violet-300 rounded-xl justify-center mx-5 backdrop-blur-sm shadow-lg py-12 px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-24 drop-shadow-md"
              src={require("../assert/santechapi-logo.png")}
              alt="Your Company"
            />
          </div>
          <div>
            <h2 className=" text-center text-2xl font-semibold text-gray-700">
              Forgot Password?
            </h2>

            <h2 className="mt-2 mb-5 text-center text-md font-normal text-gray-700">
              No worries, we'll send you reser instructions.
            </h2>
          </div>
          <form className=" space-y-4" onSubmit={handlePasswordSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="appearance-none placeholder:font-normal relative block w-full px-3 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <span className="flex items-center justify-center">
                <button
                  type="submit"
                  className={`flex w-full justify-center rounded-md bg-violet-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 `}
                >
                  <span className={`${isloading ? "hidden" : "flex"}`}>
                    Reset password
                  </span>
                  <svg
                    class={`  ${isloading ? "flex" : "hidden"
                      } animate-spin h-5 w-5 text-white`}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </button>
              </span>

            </div>
          </form>
          <div className="flex items-center justify-center">
            <Link to="/login" className="mt-6 text-violet-700 font-medium text-sm underline underline-offset-2">Back to log in</Link>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Forgetpassword;
