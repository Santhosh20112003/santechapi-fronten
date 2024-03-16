import React from "react";
import Notificationbanner from "./notificationbanner";
import Header from "./header";
import Pricing from "./pricing";

function Pricingpage() {
  return (
    <div className="max-h-screen w-full overflow-y-scroll">
      <Notificationbanner />
      <Header />
      <Pricing />
    </div>
  );
}

export default Pricingpage;
