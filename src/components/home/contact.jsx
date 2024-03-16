import React from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import Footer from "./footer";

function Contact() {
  const {user} = useUserAuth();
  return (
    <div className="">
      <section id="contact" class="text-gray-600 body-font relative">
        <div class="container px-10 md:px-20 py-20 mx-auto flex sm:flex-nowrap flex-wrap">
          <div class="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10  items-end justify-start relative hidden md:flex">
            <iframe
              width="100%"
              height="100%"
              class="absolute inset-0"
              frameborder="0"
              title="map"
              marginheight="0"
              marginwidth="0"
              scrolling="no"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125432.38285197991!2d79.1314494!3d10.7528199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baab89cea453039%3A0xe113da9b1f632be6!2sThanjavur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1699945692037!5m2!1sen!2sin"
            ></iframe>

            <div class="bg-white relative flex gap-3 flex-wrap p-6 rounded shadow-md">
              <div class="lg:w-fit px-6">
                <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  Website
                </h2>
                <a
                  href="https://santhosh-technologies.netlify.app"
                  class="mt-1 text-violet-500"
                >
                  Santhosh Technologies
                </a>
              </div>
              <div class="lg:w-fit px-6 ">
                <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  EMAIL
                </h2>
                <a
                  href="mailto:santhoshtechnologies22@gmail.com"
                  class="text-violet-500 leading-relaxed break-all"
                >
                  santhoshtechnologies22@gmail.com
                </a>
              </div>
            </div>
          </div>
          <form
            action="https://formsubmit.co/shanmugamsanthosh22@gmail.com"
            method="POST"
            class="lg:w-1/3 md:w-1/2  flex shadow-xl p-5 md:p-0 md:shadow-none rounded-lg flex-col md:ml-auto  w-full md:py-8 mt-8 md:mt-0"
          >
            <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
              Feedback for us
            </h2>
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                required
                type="text"
                id="name"
                name="name"
                class="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                class="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="message" class="leading-7 text-sm text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                class="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button class="text-white bg-violet-500 border-0 py-2 px-6 focus:outline-none hover:bg-violet-600 rounded text-lg">
              Share Response
            </button>
          </form>
        </div>
      </section>
      <section id="pricing" class="text-gray-600 body-font overflow-hidden ">
        <div class="container px-5 pb-12 mx-auto">
          {/* <div class="flex flex-col text-center w-full mb-10">
            <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              Pricing
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
              Choose the plan that best suits your needs and start using APIs
              right away.
            </p>
          </div> */}
          <div class="flex flex-wrap justify-center ">
            <div class="p-4 xl:w-[40%] md:w-1/2 w-full">
              <div class="h-full p-6 bg-white shadow-lg rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <h1 class="text-3xl font-semibold text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                 Proudly Free Forever !
                  <h3 className="text-sm font-normal ms-3 mt-2">
                    For beginers who are just starting out.
                  </h3>
                </h1>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Manage APIs from one dashboard
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Test from your browser
                </p>
                <p class="flex items-center text-gray-600 mb-6">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Connect using code snippets
                </p>
                {user ? (
                  <Link
                    to="/dashboard/home"
                    class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                  >
                    Dashboard
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-auto"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                ) : (
                  <Link
                    to="/register"
                    class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                  >
                    Get Started
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-auto"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                )}
              </div>
            </div>
            <div class="p-4 xl:w-[50%] md:w-1/2 w-full">
              <div class="h-full p-6 bg-white shadow-lg rounded-lg border-2 border-violet-500 flex flex-col relative overflow-hidden">
                <span class="bg-violet-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                  Enterprise
                </span>
                <h1 class="text-3xl font-semibold text-gray-900 leading-none pb-4 mb-4 border-b border-gray-200">
                  Custom Price
                  <h3 className="text-sm font-normal ms-3 mt-2">
                    For large organisations and businesses.
                  </h3>
                </h1>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-violet-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Unlimited user
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-violet-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Unlimited API gateway integrations
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-violet-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Unlimited of API Requests
                </p>
                <Link
                  to="/contact"
                  class="flex items-center mt-auto text-white bg-violet-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-violet-600 rounded"
                >
                  Contact us
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Contact;
