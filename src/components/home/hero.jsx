import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { IoReturnDownForwardOutline } from "react-icons/io5";
import { RiCornerDownRightFill } from "react-icons/ri";
import { HiOutlineShare } from "react-icons/hi";
import { FcDownRight } from "react-icons/fc";
import toast from "react-hot-toast";

function Hero() {

  const { user } = useUserAuth();

  const HandleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "SantechApi | ApiHub",
          text: "Discover a world of powerful APIs at SantechApihub. Explore a wide range of APIs for various industries and purposes, including web development, data analysis, machine learning, and more. With our user-friendly interface, finding and integrating APIs into your projects has never been easier. Stay updated with the latest API releases and subscribe to your favorite APIs to unlock their full potential. Join SantechApihub today and supercharge your development process.",
          url: window.origin,
        });      
      } else {
        toast.error("Sharing is not supported on this device.");
      }
    } catch (err) {
      toast.error("Unable to share.");
    }
  };

  return (
    <section class="text-gray-600 bg-violet-100 min-h-[83vh] flex items-center justify-center body-font ">
      <div class="mx-auto flex px-2 md:ps-12 py-10 md:flex-row flex-col-reverse items-center">
        <div class="lg:flex-grow w-full lg:pr-24  md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 class="title-font sm:text-6xl text-5xl mb-4 font-bold text-violet-900">
            Discover and connect
            <br class="" />
            <span className="title-font sm:text-5xl text-3xl lg:ms-2 inline-flex items-center mb-4 font-bold text-gray-800">
              <FcDownRight className="me-2 righticon hidden md:block text-gray-800 fill-gray-800" /> to thousands of APIs
            </span>
          </h1>
          <p class="mb-8 text-gray-600 leading-relaxed text-lg">
            Your gateway to a world of APIs, simplifying integration and fueling
            innovation. Join us today and unleash the power of connectivity!
          </p>
          <div class="flex justify-center gap-5 flex-wrap">
            {user ? <Link
              to="/dashboard/home"
              class="inline-flex text-white bg-violet-500 border-0 py-3 px-6 focus:outline-none hover:bg-violet-600 rounded-md rounded-es-2xl rounded-tr-2xl text-lg"
            >
              Your Dashboard
            </Link> : <Link
              to="/register"
              class="inline-flex text-white bg-violet-500 border-0 py-3 px-6 focus:outline-none hover:bg-violet-600 rounded-md rounded-es-2xl rounded-tr-2xl text-lg"
            >
              Get Started
            </Link>}
            <button onClick={HandleShare} className="bg-gray-800 py-3 px-4 rounded-xl text-white" >
              <HiOutlineShare /></button>
          </div>
        </div>
        <div class="lg:max-w-3xl hidden lg:flex lg:max-h-xl lg:w-full  md:w-1/2">
          <motion.img
            // animate={{ translateY: [0, -100] }}
            // transition={{
            //   duration: 1,
            //   ease: "linear",
            //   repeatType: "reverse",
            //   repeat: Infinity,
            // }}
            class="object-cover transition-transform cursor-pointer duration-300 object-left rounded"
            alt="Hero"
            src={"https://ik.imagekit.io/vituepzjm/APIHUB/santechapihubtemp.png?updatedAt=1727358707669"}
          />
        </div>

        <div class=" md:hidden flex  md:w-1/2">
          <img
            class="object-cover w-72 transition-transform cursor-pointer duration-300 object-center rounded"
            alt="Hero"
            src={require("../assert/mockup-desktop.png")}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
