import React, { useState } from 'react'
import { useUserAuth } from '../context/UserAuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Forgetpassword() {
	const [email,setEmail] = useState('');
	const {forgetpassword} = useUserAuth();
	const [isloading,setisloading] = useState(false);

	const handlePasswordSubmit = async(e)=>{
		e.preventDefault();
		setisloading(true)
		try{
			await forgetpassword(email);
			setisloading(false)
			toast.info("Email has been Sent Successfully.", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				});
		}
		catch(err){
			toast.error(err.message, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				});
			setisloading(false)
		}
		setisloading(false)
	}

  return (
	<div className="w-100 h-screen flex items-center bg-[url('https://ik.imagekit.io/vituepzjm/mobile-forget.svg')] lg:bg-[url('https://ik.imagekit.io/vituepzjm/desktop-forget.svg')] bg-cover justify-center">
		<Link to="/home" className='fixed active:scale-105 transition-transform  px-3.5 py-2 top-5 left-5 rounded-full shadow-lg
     bg-violet-700 w-fit h-fit'>
       <i className="text-xl text-white fas fa-arrow-left font-bold"></i>
    </Link>
      
      <div className=" flex items-center bg-[#ddd6fe70] border border-violet-300 rounded-xl justify-center mx-5 backdrop-blur-sm shadow-lg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-2">
	  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-24 drop-shadow-md" src={require('../assert/santechapi-logo.png')} alt="Your Company" />
          
        </div>
        <div>
		
		<h2 className=" text-center text-2xl font-semibold text-gray-600">
		Reset your password
          </h2>
		  
          <h2 className="mt-2 mb-5 text-center text-md font-normal text-gray-500">
		  If the account exists, we'll email you instructions to reset the password.
          </h2>
        </div>
		
		  
		
        <form className="mt-8 space-y-6" onSubmit={handlePasswordSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          <div>
		  <span className="flex items-center justify-center">
		  <button type="submit"  className={`flex w-48 justify-center rounded-full bg-violet-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:-translate-y-1 shadow-xl transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 `}><span className={`${isloading ? "hidden":"flex"}`}>Send Recovery Email</span><svg class={`  ${isloading ?"flex":"hidden"} animate-spin h-5 w-5 text-white`}  fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg></button>
		  </span>
		  
          </div>
        </form>
		</div>
		</div>
		<ToastContainer />
		</div>
	   )
}

export default Forgetpassword
