import React, { useEffect, useState } from 'react'
import {  profilepic, random_profile_img, secret } from '../common/links';
import { useUserAuth } from '../context/UserAuthContext';
import nosubsImage from '../assert/Subscriber-bro.svg';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const { user,logOut } = useUserAuth();
  const username = user?.email?.split("@")[0].replace(/[^a-zA-Z]/g, "") || "";
  const [loading,setloading] = useState(false);
  const [subscribedApis, setSubscribedApis] = useState([]);

  const fetchData = async () => {
    setloading(true);
  
    try {
      var recentreq = {
        method: 'POST',
        url: `https://santechapiback.vercel.app/getsubscribedapis`,
        headers: {'Content-Type': 'application/json','secret':secret},
        data: {email: user.email}
      };
      const apiListResponse = await axios.request(recentreq);
      if (apiListResponse.status === 200) {
        const updatedApiList = apiListResponse.data;
        const limitedApiList = updatedApiList.slice(-4).reverse() ;
  
        setSubscribedApis(limitedApiList);
      }
  
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [user]);


  return (
	<div className='w-full h-[90vh] flex'>
	  <span className="w-1/2 hidden lg:block relative bg-gray-700">
		<img src={random_profile_img} alt="" className="w-full h-full object-cover relative brightness-50" />
		<span className="absolute bottom-[10vh] z-30 left-5 pb-3 ">
			<h1 className="text-5xl text-white font-bold capitalize break-words">{user.displayName || username }</h1>
		</span>
	  </span>
	  <span className="lg:w-1/2 w-full max-h-[90vh] overflow-y-scroll flex flex-col">
	  <div class=" flex flex-col w-full mx-auto pt-4 px-4">
                <div class="relative flex h-44 w-full justify-center rounded-xl bg-cover" >
                    <span  class="absolute bg-gradient-to-r from-fuchsia-600 to-purple-600 flex h-full w-full justify-center rounded-xl bg-cover"></span> 
                    <div class="absolute -bottom-10 flex md:h-28 md:w-28 lg:h-20 lg:w-20 h-20 w-20 items-center justify-center rounded-full border-[4px] border-white ">
                        <img class="h-full w-full text-center bg-gray-800 rounded-full" src={user.photoURL || profilepic()} alt="logo" />
                    </div>
                </div> 
                <div class="mt-16 flex flex-col items-center">
                    <h4 class="text-xl capitalize font-bold text-navy-700 dark:text-white">
                    {user.displayName || username}
                    </h4>
                    <p class="text-base font-normal text-gray-600"> {user.email}</p>
                    <button onClick={()=> logOut()}
			className="text-medium shadow-lg border inline-flex items-center gap-2 rounded-xl my-5 px-3 py-2 text-center text-base bg-red-300 text-red-500 border-red-400"
		  >
        <p className="font-semibold active:scale-90 transition-all">Logout</p>
         <i className="mt-0.5 fas fa-arrow-right-from-bracket "></i>
		  </button>
                </div> 
                <h1 className=" mt-5 text-xl ms-5 font-semibold">Recently Subscribed</h1>
                {loading ? 
    (
<div className="mx-10 flex items-center justify-center mt-5 h-40 bg-violet-200 rounded-lg border-2 border-violet-300 bg-cover pb-4" >
<svg className={` animate-spin h-8 w-8 text-violet-500`}  fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    </div>) : (subscribedApis.length > 0 ? (<div classNameName="">
    <div className=" grid md:grid-cols-2 grid-cols-1 mt-3" >
    {subscribedApis.map((api)=>(
   <div  className="p-4">
   <div className={`h-52 w-[1fr] bg-gray-500 relative rounded-lg overflow-hidden shadow-lg`}>
   <span className="bg-emerald-500 z-10 text-white px-3 py-1 text-xs absolute right-0 top-0 rounded-bl">Subscribed</span>
    <img src={api.img} alt="" className="w-full h-full object-fill relative brightness-50" />
     <span className="absolute md:left-[5%] mx-5 text-gray-50 top-[30%] pb-3">
     <h1 className="sm:text-2xl inline-flex items-center pe-3 gap-2 text-xl font-semibold mb-3">{api.name} API{' '} <a href={api.link} className="inline-flex text-sm items-center mt-1.5 fas fa-arrow-up-right-from-square"></a> </h1>
     <p className="leading-relaxed text-sm text-gray-200 mb-3">{api.short_desc}</p>
     </span>  
   </div>
   
 </div>
    ))
    }  
    </div>
    </div>):(
      <div className="flex items-center py-5 my-5 justify-center flex-col">
      <img src={nosubsImage} alt="NO API KEY" className="w-44" />
      <p className="text-base">Not Yet Subscribed Anything...</p>
    </div>
    ))}
    <Link to='/dashboard/apis#subscribed' className="text-center my-5 underline underline-offset-2 text-violet-500">More Apis</Link> 
    </div>  
    <br />
	  </span>
	</div>
  )
}

export default Profile
