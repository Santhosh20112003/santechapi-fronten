import React from 'react';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import hello from "../assert/undraw_fall_thyk.svg";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { secret } from '../common/links';

function Home() {
	const { user } = useUserAuth();
	const [apikey,setapikey] = useState(0);
	const [activekey,setactivekey] = useState(0);
	const [apis,setapis] = useState(0);
	const [apikeyloading,setapikeyloading] = useState(false);
	const [activekeyloading,setactivekeyloading] = useState(false);
	const [apisloading,setapisloading] = useState(false);
    const username = user?.email?.split("@")[0].replace(/[^a-zA-Z]/g, "") || "";
	var fetchcountreq = {
        method: 'POST',
        url: `https://santechapiback.vercel.app/getcounts`,
        headers: {'Content-Type': 'application/json','secret':secret},
        data: {email: user.email}
      };

	useEffect(()=>{
		fetchcount();
	},[user])

	const fetchcount = async () => {
		setapikeyloading(true);
		setactivekeyloading(true);
		setapisloading(true);
		try {
		const result = await axios.request(fetchcountreq);
		setactivekey(result.data.totalcount);
		setapikey(result.data.apikeycount);
		setapis(result.data.apicount);
		
		} catch (err) {
		console.log(err)
		} finally {
		setapikeyloading(false);
		setactivekeyloading(false);
		setapisloading(false);
		}
		};
  return (
	<div className='w-full h-[90vh] bg-violet-100 overflow-y-scroll  max-h-[90vh] flex flex-col'>
		<div className="w-[96%] mt-5 shadow-md px-5 py-16  flex items-center justify-center md:gap-5  md:justify-between rounded-xl bg-gray-100 bg-[url('https://dashboard.algolia.com/client-assets/c1c9361fe75370d1b156733e962f7214/514f2ec3798090c6df00dad1592c8166.svg')] mx-auto">
		<span className="mt-10">
		<h1 class=" lg:text-4xl text-3xl text-center md:text-left font-medium title-font mb-4 italic text-gray-900">Welcome <span className="text-violet-500 break-words capitalize">{user.displayName || username }</span> !</h1>
      <p class=" text-gray-500 ms-5 break-words text-center md:text-left text-base md:text-lg">Check what's happening on your Santech Api implementation.</p>
	  <span className="grid py-10 w-full lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-5 flex-wrap">
		<Link to="https://santhoshs-organization-1.gitbook.io/santech-api-hub-docs/" className="inline-flex active:scale-90 transition-all break-all items-baseline gap-3 bg-violet-500 px-3 py-2 rounded-lg text-white shadow-lg justify-center">Documentation <i className="fas fa-arrow-up-right-from-square"></i></Link>
		<Link to='/dashboard/apis' className="inline-flex active:scale-90 transition-all items-baseline gap-3 bg-violet-500 px-3 py-2 rounded-lg text-white shadow-lg justify-center">API KEYS <i className="fas fa-key"></i></Link>
		<Link to='/dashboard/hubs' className="inline-flex active:scale-90 transition-all items-baseline gap-3 bg-violet-500 px-3 py-2 rounded-lg text-white shadow-lg justify-center">API Hub <i className="fas fa-igloo"></i></Link>
	  </span>
		</span>
	  <span className=" hidden lg:flex">
		<img src={hello} alt="" className="w-96	" />
	  </span>
	  
	 
		</div>
		<span className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 py-16 mx-auto md:mx-0 md:px-10">
		<span className="shadow-lg border-2 border-violet-300 bg-violet-300 p-5 rounded-lg">
		{ activekeyloading ? (
				<span className="w-full h-full flex items-center justify-center">
					<svg className={` animate-spin h-8 w-8 text-violet-500`}  fill="none" viewBox="0 0 24 24">
      				<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      				<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
   					</svg>
				</span>
			) :(
				<span className="">
	            <h1 className="text-xl font-semibold text-gray-700">Total Apis Count</h1>
				<p className="text-lg mt-3">{activekey}</p></span>
			)
		}
		</span>
		<span className="shadow-lg border-2 border-violet-300 bg-violet-300 p-5 rounded-lg ">
			{apikeyloading ?(
				<span className="w-full h-full flex items-center justify-center">
					<svg className={` animate-spin h-8 w-8 text-violet-500`}  fill="none" viewBox="0 0 24 24">
      				<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      				<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    				</svg>
				</span>
			) : (
           <span className="">
			 <h1 className="text-xl font-semibold text-gray-700"> Api Keys Count </h1>
			<p className="text-lg mt-3">{apikey}</p>
		   </span>
			)

			}
			
		</span>
		<span className="shadow-lg border-2 border-violet-300 bg-violet-300 p-5 rounded-lg ">
			{apisloading ?(
				<span className="w-full h-full flex items-center justify-center">
					<svg className={` animate-spin h-8 w-8 text-violet-500`}  fill="none" viewBox="0 0 24 24">
     				 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      				<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  			   		 </svg>
				</span>
			)
			:(
				<span className="">
					<h1 className="text-xl font-semibold text-gray-700">Subscribed API Count</h1>
			        <p className="text-lg mt-3">{apis}</p>
				</span>
			)
			}
		</span>
	  </span>
	</div>
  )
}

export default Home;
