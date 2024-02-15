import React from 'react'
import {motion} from 'framer-motion';
import { Link } from 'react-router-dom';
function Hero() {
  
  return (
	<section  class="text-gray-600 bg-violet-100 min-h-[90vh] flex items-center justify-center body-font ">
      <div class="container mx-auto flex px-2 md:ps-12 py-10 md:flex-row flex-col-reverse items-center">
    <div class="lg:flex-grow w-full lg:pr-24  md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font sm:text-6xl text-5xl mb-4 font-bold text-violet-900">Discover and connect 
        <br class=""/><span className='title-font sm:text-5xl text-3xl lg:ms-8 mb-4 font-bold text-gray-900'>to thousands of APIs</span>
      </h1>
      <p class="mb-8 leading-relaxed text-lg">Your gateway to a world of APIs, simplifying integration and fueling innovation. Join us today and unleash the power of connectivity!</p>
      <div class="flex justify-center gap-5 flex-wrap">
        
	
		<Link to='/register' class="inline-flex text-white bg-violet-500 border-0 py-2 px-6 focus:outline-none hover:bg-violet-600 rounded text-lg">Get Started</Link>
    {/* <button id='pwainstall' class="inline-flex border-violet-500 border-0 py-2 px-6 focus:outline-none rounded text-lg">Install Now</button> */}
      </div>
    </div>
    <div class="lg:max-w-2xl hidden lg:flex lg:max-h-xl lg:w-full  md:w-1/2">
      
      <motion.img animate={{ translateY:[0,-100] }} transition={{
        duration: 1,
        ease: "linear",
        repeatType: "reverse",
        repeat: Infinity,
      }} class="object-cover transition-transform cursor-pointer duration-300 object-center rounded" alt="Hero" src={require('../assert/mockup-api-g.png')} />


    </div>

    <div class=" md:hidden flex  md:w-1/2">
      
    <img class="object-cover w-72 transition-transform cursor-pointer duration-300 object-center rounded" alt="Hero" src={require('../assert/mockup-desktop.png')} />


    </div>

    
      </div>
    </section>
  )
}

export default Hero
