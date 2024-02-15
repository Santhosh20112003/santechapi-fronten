import React from "react";

export default function CodeSnippet() {
  const link ="https://santechapi.vercel.app/music";
  return (
    <div className="py-24 w-full inline-flex items-center flex-col px-5 gap-5 md:flex-row">
      <div class="lg:max-w-lg lg:w-1/2 w-full mx-auto my-10 ">
    <div class="w-full h-11 rounded-t-lg bg-slate-400 flex justify-start items-center space-x-1.5 px-3">
        <span class="w-3 h-3 rounded-full bg-red-400"></span>
        <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
        <span class="w-3 h-3 rounded-full bg-green-400"></span>
    </div>
    <div class="bg-slate-200 flex items-center justify-center border-t-0 w-full h-32 py-24">
      <h1 className="lg:text-xl break-all md:break-word px-5 md:px-0 text-md text-slate-400 font-medium">
     <span className=""> fetch( '<span className="text-violet-400">{link}</span>' )</span> <br />
            <span className="ms-10">.then( result={">"}console.log(result) )</span> <br />
            <span className="ms-10 ">.catch( err={">"}console.log(err) )</span> <br />
      </h1>
     
    </div>
    <div class="w-full h-5 rounded-b-lg bg-slate-400 flex justify-start items-center space-x-1.5 px-3">
    </div>
      </div>
      <div className="lg:w-1/2 w-full ">
        <h1 className="text-5xl text-gray-500 inline-flex items-end gap-3">Example Code <i className="fas hidden  lg:block fa-terminal text-xl px-3 h-fit py-1 rounded-md bg-gray-500 text-white"></i> </h1>
        <p className="break-words text-gray-400 w-4/5 mt-10 mb-5">SantechApi is a free online REST API Hub that you can use whenever you need Pseudo-real data for your website development without running any server-side code.</p>
        <a href="#code" className="py-2 px-3 text-lg text-white mt-5 bg-violet-500 rounded-lg">Live Example</a>
      </div>
    </div>
  );
}

