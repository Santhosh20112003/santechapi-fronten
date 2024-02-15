import React from "react";
import { useEffect } from "react";
import logo from "../assert/mockup-api.png";
import Code from "./code";
import CodeSnippet from "./CodeSnippet";
import Contact from "./contact";
import Footer from "./footer";
import Header from "./header";
import Hero from "./hero";
import List from "./list";
import Notificationbanner from "./notificationbanner";
import Pricing from "./pricing";
import Steps from "./steps";
import Testimonials from "./testimonials";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  useEffect(() => {
    function handleOffline() {
      toast.error("You're Offline",{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="bg-[url(https://ik.imagekit.io/iete/assets/back.png)] bg-contain">
    <Notificationbanner/>
    <Header/>
    <Hero/>
    <CodeSnippet/>
    <Code/>
    <List/>
    <Steps/>
    <Testimonials/>
    <Pricing/>
    <Contact/>
    <Footer/>
    <ToastContainer/>
    </ div>
  );
}

export default App;
