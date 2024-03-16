import React from 'react'

function Footer() {
  return (
	<footer class="text-gray-600 body-font">
  <div class="bg-violet-100">
    <div class="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
      <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
      <img
        className="h-12"
        src={require('../assert/santechapi.png')}
        alt="Workflow"
      />
      </a>
      <p class="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">© 2023 SanTech Api —
        <a href="http://santhosh-technologies.netlify.app/" rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">@Santhosh Technologies</a>
      </p>
      
    </div>
  </div>
</footer>
  )
}

export default Footer;
