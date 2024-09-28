import React from 'react'
import { Link } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

function Footer() {
  const { user } = useUserAuth();
  return (
    <footer className="text-gray-600 body-font">
      <div className="px-5 py-8 bg-gray-50 mx-auto">
        <div className="flex flex-wrap md:text-left text-center">
          <div className="lg:w-1/5  w-full px-4">
            <h2 className="title-font text-gray-bg-gray-600 tracking-widest text-sm font-bold mb-3">
              AUTHENTICATION
            </h2>
            <nav className="list-none mb-5">
              <li>
                <Link to="/home" className="text-gray-bg-gray-600/80 hover:text-gray-bg-gray-600">Home</Link>
              </li>
              <li>
                {user ? <Link to="/dashboard" className="text-gray-bg-gray-600/80 hover:text-gray-bg-gray-600">Your Space</Link> : <Link to="/login" className="text-gray-bg-gray-600/80 hover:text-gray-bg-gray-600">Login</Link>}
              </li>
              <li>
                {user ? <Link to="/dashboard" className="text-gray-bg-gray-600/80 hover:text-gray-bg-gray-600">Your Space</Link> : <Link to="/register" className="text-gray-bg-gray-600/80 hover:text-gray-bg-gray-600">Sign up</Link>}
              </li>
            </nav>
          </div>
          <div className="lg:w-1/5  w-full px-4">
            <h2 className="title-font font-bold text-gray-bg-gray-600 tracking-widest text-sm mb-3">
              COMPANY
            </h2>
            <nav className="list-none mb-5 ">
              <li>
                <Link to="/apilist" className="text-gray-bg-gray-600/80 lg:hover:text-gray-bg-gray-600">Api List</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-bg-gray-600/80 hover:text-gray-bg-gray-600">Contact & Pricing</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-bg-gray-600/80 hover:text-gray-bg-gray-600">Privacy policy</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/5  w-full px-4">
            <h2 className="title-font font-bold text-gray-bg-gray-600 tracking-widest text-sm mb-3">
              OTHERS
            </h2>
            <nav className="list-none mb-5 ">
              <li>
                <Link to="https://santechapitool.vercel.app/" className="text-gray-bg-gray-600/80 lg:hover:text-gray-bg-gray-600">API tool</Link>
              </li>
              <li>
                <Link to="https://santech.gitbook.io/docs" className="text-gray-bg-gray-600/80 hover:text-gray-bg-gray-600">Docs</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-2/5  w-full px-4">
            <h2 className="title-font font-bold  text-gray-bg-gray-600 tracking-widest text-sm mb-3">
              SUBSCRIBE
            </h2>
            <form
              action="https://formsubmit.co/santhoshtechnologies22@gmail.com"
              method="POST"
              className="flex flex-col md:flex-row gap-3 justify-center items-center lg:items-end"
            >
              <input
                type="text"
                id="footer-field"
                name="footer-field"
                required
                autoComplete={"email"}
                placeholder="Your Email"
                className="w-full bg-violet-100 placeholder:text-violet-400 bg-opacity-50 rounded border border-violet-300 focus:bg-transparent focus:ring-2 focus:ring-violet-500 focus:border-violet-600/80 text-base outline-none text-violet-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              <button className="w-full sm:w-auto text-white bg-violet-600 border-0 py-2 px-4 lg:px-6 focus:outline-none hover:bg-violet-600/80 rounded">
                Send&nbsp;Message
              </button>
            </form>
            <p className="text-gray-bg-gray-600/80  text-sm mt-2  font-medium ">
              * All details are required for communication.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-violet-100">
        <div className="px-5 py-6 mx-auto flex flex-col items-center sm:flex-row">
          <span onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} className="flex title-font cursor-pointer font-medium items-center justify-center text-gray-bg-gray-600">
            <img src={require("../assert/santechapi.png")} alt="" className="w-fit h-12" />
          </span>
          <p className="text-sm text-gray-bg-gray-600/80 mt-4 sm:ml-6 sm:mt-0 font-medium ">
            © 2024 Santech API Hub —
            <Link
              to='https://santechh.vercel.app'
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              @SanTech
            </Link>
          </p>

        </div>
      </div>
    </footer>
  )
}

export default Footer;
