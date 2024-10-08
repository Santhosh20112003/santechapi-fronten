import React from 'react';
import { BiSolidFileDoc } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

function CTA2() {
  const { user } = useUserAuth();
  return (
    <section className="text-gray-600 body-font">
      <div className="w-full mx-auto flex lg:px-16 xl:px-20 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 px-5 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="px-8 py-3 bg-gray-100 text-sm rounded-full mb-5 font-bold text-gray-600">SANTECH API CLIENT</h1>
          <h1 className="title-font sm:text-5xl text-3xl break-all capitalize mb-4 font-bold text-gray-900">
            Test, Analyze, and Integrate
            <br className="hidden lg:inline-block" />
            APIs with Testing Tool
          </h1>
          <p className="mb-8 leading-relaxed w-[80%]">
            Our API testing tool is specifically built for seamless testing, debugging, and integration of real-time data from the Santech API Hub. Access, test, and implement a wide range of APIs with ease.
          </p>
          <div className="flex items-center gap-3">
            <Link target='_blank' to='https://santech.gitbook.io/docs/api-client' className="flex justify-center items-center bg-violet-500 p-3.5 rounded-xl gap-3">
              <BiSolidFileDoc className=" text-white text-2xl" />
            </Link>
            <Link target='_blank' to={"https://santechapitool.vercel.app/"} className="flex justify-center items-center bg-violet-500 px-3 py-2.5 rounded-xl gap-5">
              <span className="ms-2 text-white font-semibold">Start Testing</span>
              <i className="fas fa-arrow-right text-violet-500 bg-white p-2 rounded-lg"></i>
            </Link>
          </div>
        </div>

        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover lg:-ml-24 object-center rounded"
            alt="API Testing Tool"
            src="https://ik.imagekit.io/vituepzjm/APIHUB/User%20DB.svg?updatedAt=1728375379979"
          />
        </div>
      </div>
    </section>
  );
}

export default CTA2;
