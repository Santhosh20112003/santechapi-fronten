import React, { useState, useEffect } from "react";
import axios from "axios";
import { secret } from "../common/links";
import nokey from "../assert/No data-cuate.svg";
import toast, { Toaster } from 'react-hot-toast';
import { useUserAuth } from "../context/UserAuthContext";
import { Link, useLocation } from "react-router-dom";

function ApiHubs() {
  const { user } = useUserAuth();
  const searchParams = new URLSearchParams(useLocation().search);
  const QuerySearchParam = searchParams.get("name") || "";
  const [searchTerm, setSearchTerm] = useState(QuerySearchParam);
  const [apis, setApis] = useState([]);
  const [filteredApis, setFilteredApis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [updatedApi, setUpdatedApi] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post("https://santechapi-backend.vercel.app/getallapis", { email: user.email }, { headers: { "Content-Type": "application/json", secret: secret } });
        const updatedApis = response.data.map(api => ({ ...api, loading: false }));
        setApis(updatedApis);
        setFilteredApis(updatedApis);
      } catch (error) {
        console.error("Error fetching data:", error);
        setApis([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, updatedApi]);

  const subscribe = async (apiItem) => {
    try {
      const updatedApis = apis.map(api => (api.name === apiItem.name ? { ...api, loading: true } : api));
      setApis(updatedApis);

      const response = await axios.post(`https://santechapi-backend.vercel.app/addSubscribeApi/${apiItem.name}`, { email: user.email }, { headers: { "Content-Type": "application/json", secret: secret } });

      if (response.status === 200) {
        setUpdatedApi(!updatedApi);
        toast.info(`${apiItem.name} API is Subscribed`, { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        toast.info("Create Api Key in order to Subscribe to an API", { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
      } else {
        toast.error(`Error occurred with ${err}`, { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored" });
      }
    } finally {
      const updatedApis = apis.map(api => (api.name === apiItem.name ? { ...api, loading: false } : api));
      setApis(updatedApis);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    const filtered = apis.filter(api => api.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setLoading(false);

    if (filtered.length > 0) {
      setNotFound(false);
    } else {
      setNotFound(true);
    }

    setFilteredApis(filtered);
  };

  return (
    <div className="w-full max-h-[90vh] overflow-y-scroll">
      <form className="p-5" onSubmit={handleSearch}>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            autoFocus
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-violet-500 focus:border-violet-500"
            placeholder="Search APIs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2 bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <div className="mx-10 flex items-center justify-center mt-5 h-[70vh] bg-cover pb-4">
          <svg
            className="animate-spin w-12 text-violet-500"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : notFound ? (
        <div className="w-full h-[70vh] flex items-center flex-col justify-center">
          <img src={nokey} alt="no content" className="w-64" />
          <p className="text-lg">Content Not Found</p>
        </div>
      ) : (
        <div className="mt-3">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {filteredApis.map((api) => (
              <div
                className="p-4 flex items-center justify-center md:block"
                key={api.name}
              >
                <div className="lg:h-60 h-80 w-full max-w-[500px] bg-gray-500 relative rounded-lg overflow-hidden shadow-lg">
                  {api.subscribed ? (
                    <span className="bg-emerald-500 z-10 text-white px-3 py-1 text-xs absolute right-0 top-0 rounded-bl">
                      Subscribed
                    </span>
                  ) : (
                    ""
                  )}
                  <img
                    src={api.img}
                    alt=""
                    className="w-full h-full object-fill relative brightness-50"
                  />
                  <span className="absolute left-[5%] text-gray-50 bottom-[8%]">
                    <h1 className="sm:text-2xl inline-flex items-center pe-3 gap-2 text-xl font-semibold mb-3">
                      {api.name} API{" "}
                      <Link
                        target="_blank"
                        to={api.link}
                        className="inline-flex text-sm items-center mt-1.5 fas fa-arrow-up-right-from-square"
                      ></Link>{" "}
                    </h1>
                    <p className="leading-relaxed break-words me-3 text-gray-200 mb-3">
                      {api.short_desc}
                    </p>
                    {api.subscribed ? (
                      <button className="px-3 py-2 rounded-md bg-emerald-400 text-white">
                        Subscribed
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          subscribe(api);
                        }}
                        className="px-3 active:scale-90 transition-all py-2 rounded-md bg-violet-500 text-white inline-flex items-center justify-center gap-3"
                      >
                        Subscribe{" "}
                        {api.loading ? (
                          <svg
                            className="animate-spin w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          ""
                        )}
                      </button>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default ApiHubs;
