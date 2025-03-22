import React from 'react'
import { BiSolidFileDoc } from 'react-icons/bi';
import { Link } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext';

function CTA1() {
  const { user } = useUserAuth();
  return (
    <section className="text-gray-600 body-font">
      <div className="w-full mx-auto flex lg:px-16 xl:px-20 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img src="https://ik.imagekit.io/vituepzjm/APIHUB/Macbook-Air-santechapihubs.vercel.app%20(1).png?updatedAt=1742640396262" className="object-cover object-center rounded" />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-32 px-5 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="px-8 py-3 bg-gray-100 uppercase text-sm rounded-full mb-5 font-bold text-gray-600">AI-Powered Innovation</h1>
          <h1 className="title-font break-all sm:text-5xl text-3xl mb-4 font-bold text-gray-900">Harness Real-Time Insights
            <br className="hidden lg:inline-block" />with Idea Labs
          </h1>
          <p className="mb-8 leading-relaxed w-[80%]">Idea Labs, powered by Santech <b>Jarvis AI</b>, seamlessly transforms user insights into actionable real-time solutions, integrating effortlessly with Santech APIs for enhanced efficiency.</p>
          <div className="flex items-center gap-3">
            <Link target='_blank' to='https://santech.gitbook.io/docs/idea-labs' className="flex justify-center items-center bg-violet-500 p-3.5 rounded-xl gap-3">
              <BiSolidFileDoc className=" text-white text-2xl" />
            </Link>
            <Link to={user ? '/dashboard/ideacenter' : '/login'} className="flex justify-center items-center bg-violet-500 px-3 py-2.5 rounded-xl gap-5">
              <span className="ms-2 text-white font-semibold">Get Started</span>
              <i className="fas fa-arrow-right text-violet-500 bg-white p-2 rounded-lg"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA1;
