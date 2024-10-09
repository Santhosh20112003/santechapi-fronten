import React from "react";

export default function CodeSnippet() {
  const link = "https://santechapi.vercel.app/quotes";
  return (
    <div className="py-24 w-full flex flex-col md:flex-row items-center gap-10 px-5">
      <div className="lg:max-w-lg lg:w-1/2 w-full mx-auto">
        <div className="w-full h-11 bg-gray-800 rounded-t-lg flex items-center justify-between">
          <div className=""></div>
          <div className="flex  items-center space-x-1.5 px-3">
            <span className="w-3 h-3 rounded-full bg-red-400"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
          </div>
        </div>
        <div className="bg-slate-200 flex items-center justify-center w-full min-h-[200px] p-6 text-gray-600 border-t-0 rounded-b-lg shadow-lg">
          <pre className="text-md font-semibold break-all lg:text-lg font-mono whitespace-pre-wrap text-slate-600">
            {`fetch( '${link}', 
  { headers: { 'token': apiKey } })
  .then(result => console.log(result))
  .catch(err => console.log(err));`}
          </pre>
        </div>
        <div className="w-full h-5 rounded-b-lg bg-gray-800 flex justify-start items-center space-x-1.5 px-3"></div>
      </div>

      {/* Info and action section */}
      <div className="lg:w-1/2 w-full text-center md:text-left">
        <h1 className="text-5xl text-gray-700 font-bold flex items-center gap-3">
          Example Code
          {/* <i className="fas fa-terminal text-lg bg-gray-500 text-white p-2 rounded-md hidden lg:block"></i> */}
        </h1>
        <p className="text-gray-500 mt-6 mb-8 leading-relaxed">
          SantechAPI is a free online REST API Hub offering pseudo-real data for website development without needing to run server-side code. Perfect for prototyping or integrating real-time data.
        </p>
        <a
          href="#code"
          className="inline-block py-3 px-6 text-lg text-white bg-violet-500 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-violet-600"
        >
          Try Live Example
        </a>
      </div>
    </div>
  );
}
