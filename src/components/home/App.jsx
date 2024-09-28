import React from "react";
import { useEffect } from "react";
import Code from "./code";
import CodeSnippet from "./CodeSnippet";
import Footer from "./footer";
import Header from "./header";
import Hero from "./hero";
import List from "./list";
import Notificationbanner from "./notificationbanner";
import Pricing from "./pricing";
import Steps from "./steps";
import Testimonials from "./testimonials";
import toast, { Toaster } from 'react-hot-toast';
import HomeContact from "./homecontact";
import CTA1 from "./CTA1";
import CTA2 from "./CTA2";
import LanguageImplementation from "./LanguageImplementation";

function App() {
  useEffect(() => {
    function handleOffline() {
      toast.error("You're Offline");
    }
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="bg-[url(https://ik.imagekit.io/iete/assets/back.png)] bg-contain">
      <Notificationbanner />
      <Header />
      <Hero />
      <CodeSnippet />
      <Code />
      <CTA1 />
      <CTA2 />
      <List />
      <LanguageImplementation />
      <Steps />
      <Testimonials />
      <Pricing />
      <HomeContact />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
