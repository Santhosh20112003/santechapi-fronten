import React from 'react'
import { Link } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext'

function Pricing() {
  const {user} = useUserAuth();
  return (
	<section id='pricing' class="text-gray-600 body-font overflow-hidden ">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-10">
      <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Pricing</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Choose the plan that best suits your needs and start using APIs right away.</p>
    </div>
    <div class="flex flex-wrap justify-center ">
      <div class="p-4 xl:w-[40%] md:w-1/2 w-full">
        <div class="h-full p-6 bg-white shadow-lg rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
          <h1 class="text-3xl font-semibold text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">Free Forever !
          <h3 className="text-sm font-normal ms-3 mt-2">For beginers who are
just starting out.</h3>
          </h1>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Manage APIs from one dashboard
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Test from your browser
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Connect using code snippets
          </p>
          {user ? (<Link to='/dashboard/home' class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Dashboard 
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>) :(<Link to='/register' class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Get Started
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>)}
          
        </div>
      </div>
      <div class="p-4 xl:w-[50%] md:w-1/2 w-full">
        <div class="h-full p-6 bg-white shadow-lg rounded-lg border-2 border-violet-500 flex flex-col relative overflow-hidden">
          <span class="bg-violet-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">Enterprise</span>
          <h1 class="text-3xl font-semibold text-gray-900 leading-none pb-4 mb-4 border-b border-gray-200">
          Custom Price
          <h3 className="text-sm font-normal ms-3 mt-2">For large organisations and
businesses.</h3>
          </h1>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-violet-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Unlimited user
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-violet-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Unlimited API gateway integrations
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-violet-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Unlimited of API Requests
          </p>
          <Link to='/contact' class="flex items-center mt-auto text-white bg-violet-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-violet-600 rounded">Contact us
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
          
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Pricing
