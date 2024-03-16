import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../common/links';
import { useUserAuth } from '../context/UserAuthContext';

function List() {
  const {user} = useUserAuth();
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://santechapi-backend.vercel.app/getapis`)
      .then((result) => {
        setApis(result.data);
        setLoading(false); 
      })
      .catch((err) => {
        setApis([]);
        console.log(err);
      });
  }, []);

  return (
	<section class="text-gray-600 ">
  <div class="container px-5 py-12 mx-auto">
    <div class="flex flex-col text-center w-full md:mb-20 mb-10">
      <h1 class="md:text-5xl text-4xl font-semibold title-font mb-4 text-gray-900">Recommended APIs</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">APIs curated by Santech Api and recommended based on functionality offered, performance, and support!</p>
    </div>
    {loading ? (<div className="mx-10 flex items-center justify-center bg-cover py-10">
          <svg
            className="animate-spin w-12 text-violet-500"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>) :(<div className="flex items-center justify-center">
    <div class="w-full md:w-[90%] grid md:grid-cols-3 grid-cols-2">
      {apis.map((api)=>(
       <div class="p-4">
        <div class="h-full flex flex-col items-center text-center">
          <img alt="team" class="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={api.img}/>
          <div class="w-full">
            <h2 class="title-font font-semibold text-lg text-gray-900">{api.name} Api</h2>
            <p class="mb-4 ">{api.short_desc}</p>  
          </div>
        </div>
      </div>
    )).slice(0,6)}
    </div>
    </div>)}
	<div className="flex justify-center items-center pt-10">
		<Link to={user ? '/dashboard/hubs' :'/login'} className='py-2 inline-flex items-center px-3 shadow-lg bg-violet-500 text-white text-xl rounded-md'>More APIs <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg></Link>
	</div>
  </div>
</section>
  )
}

export default List;
