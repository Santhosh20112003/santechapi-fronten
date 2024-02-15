import React from 'react'

function Code() {
  return (
	<div>
	  <div id='code' className="flex items-center justify-center w-full md:h-screen h-[80vh]">
			<iframe className=' h-[70vh] w-[90%] md:shadow-xl md:w-[80%] md:h-[80vh]' src="https://stackblitz.com/edit/stackblitz-starters-uzzxka?ctl=1&embed=1&file=src%2FApp.js&hideDevTools=1&hideExplorer=1&hideNavigation=1" frameborder="0"></iframe>
		</div>
	</div>
  )
}

export default Code
