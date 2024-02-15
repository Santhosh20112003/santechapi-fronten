import React from 'react'
import { useState } from 'react'
import {motion} from 'framer-motion'

function Notificationbanner() {
	const [close,setClose] = useState(false);
	const show = {
		opacity: 1,
		display: "block"
	  };
	  
	  const hide = {
		opacity: 0,
		transitionEnd: {
		  display: "none"
		}
	  };
  return (
	<motion.div  onClick={()=>{setClose(!close)}} animate={close ? hide : show} className={`text-center ${close ? 'hidden':'block'} break-words cursor-pointer px-5 py-2 bg-gradient-to-r from-violet-400 text-white to-violet-500 `}>
	  <h1 className="">🎉 Santech ApiHub is undergoing major enhancements with a range of new features.</h1>
	  {/* <i onClick={()=>{setClose(!close)}} className={`fas fa-xmark absolute  right-2 top-3 cursor-pointer`}></i> */}
	</motion.div>
  )
}

export default Notificationbanner
