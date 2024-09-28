import React, { useState, useEffect } from "react";
import axios from "axios";
import { secret } from "../common/links";
import nokey from "../assert/No data-cuate.svg";
import toast, { Toaster } from 'react-hot-toast';
import { useUserAuth } from "../context/UserAuthContext";
import { Link, useLocation } from "react-router-dom";
import { genSearch } from "../common/methods";
import { SiGooglegemini } from "react-icons/si";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { BiSolidFileDoc } from "react-icons/bi";

function ApiHubs() {
  const { user, apiKeys, setApiKeys } = useUserAuth();
  const searchParams = new URLSearchParams(useLocation().search);
  const QuerySearchParam = searchParams.get("name") || "";
  const [searchTerm, setSearchTerm] = useState(QuerySearchParam);
  const [apis, setApis] = useState([]);
  const [filteredApis, setFilteredApis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [updatedApi, setUpdatedApi] = useState(false);

  useEffect(() => {
    const fetchApis = async () => {
      setLoading(true);
      try {
        const { data } = await axios.post(
          "https://santechapi-backend.vercel.app/getallapis",
          { email: user.email },
          { headers: { "Content-Type": "application/json", secret } }
        );
        const updatedApis = data.map(api => ({ ...api, loading: false }));
        setApis(updatedApis);
        setFilteredApis(updatedApis);
      } catch (error) {
        console.error("Error fetching APIs:", error);
        setApis([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchApiKeys = async () => {
      try {
        const { data } = await axios.post(
          "https://santechapi-backend.vercel.app/getapiKeys",
          { email: user.email },
          { headers: { "Content-Type": "application/json", secret } }
        );
        const updatedKeys = data.map(token => ({ key: token, copied: false }));
        setApiKeys(updatedKeys);
      } catch (error) {
        console.error("Error fetching API keys:", error);
      }
    };

    fetchApis();
    fetchApiKeys();
  }, [user, updatedApi, setApiKeys]);

  const subscribe = async (apiItem) => {
    try {
      const updatedApis = apis.map(api => (api.name === apiItem.name ? { ...api, loading: true } : api));
      setApis(updatedApis);

      const response = await axios.post(`https://santechapi-backend.vercel.app/addSubscribeApi/${apiItem.name}`, { email: user.email }, { headers: { "Content-Type": "application/json", secret: secret } });

      if (response.status === 200) {
        setUpdatedApi(!updatedApi);
        toast.success(`${apiItem.name} API is Subscribed`);
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        toast("Create Api Key in order to Subscribe to an API");
      } else {
        toast.error(`Error occurred with ${err}`);
      }
    } finally {
      const updatedApis = apis.map(api => (api.name === apiItem.name ? { ...api, loading: false } : api));
      setApis(updatedApis);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await genSearch(searchTerm);
    const filtered = apis.filter(api => api.name.toLowerCase().includes(data.toLowerCase()));
    setLoading(false);

    if (filtered.length > 0) {
      setNotFound(false);
    } else {
      setNotFound(true);
    }

    setFilteredApis(filtered);
  };

  const { setTitle } = useUserAuth();

  useEffect(() => {
    setTitle("Api Hub");
    return () => setTitle("");
  }, [setTitle]);

  return (
    <div className="w-full max-h-[90vh] overflow-y-scroll">
      <form className="p-5 " onSubmit={handleSearch}>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <MdOutlineAutoAwesome className="text-violet-800" />
          </div>
          <input
            type="search"
            disabled={loading}
            id="default-search"
            className="block w-full p-4 placeholder:text-violet-500 ps-10 text-sm text-gray-900 border border-violet-300 rounded-lg bg-violet-100 focus:ring-violet-500 focus:border-violet-500"
            placeholder="Find the API you need…"
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
                <div className="lg:h-64 h-80 w-full max-w-[500px] bg-gray-500 relative rounded-lg overflow-hidden shadow-lg">
                  {api.subscribed ? (
                    <span className="bg-emerald-500 z-10 text-white px-3 py-1 text-xs absolute right-0 top-0 rounded-bl">
                      Subscribed
                    </span>
                  ) : (
                    ""
                  )}
                  <Link target="_blank" to={`https://santech.gitbook.io/docs/${api.name.toLowerCase().replace(/\s/g, '-')}-api`} className="bg-white z-10 text-gray-800 p-1 text-xs absolute left-2 top-2 rounded-tl-lg rounded-sm rounded-br-lg">
                    <BiSolidFileDoc className="text-lg" />
                  </Link>
                  <img
                    src={api.img}
                    alt=""
                    className="w-full h-full object-fill relative brightness-50"
                  />
                  <span className="absolute left-[5%] text-gray-50 bottom-[8%]">
                    <h1 className="sm:text-2xl inline-flex items-center pe-3 gap-2 text-xl font-semibold mb-3">
                      {api.name} API{" "}
                      {/* <Link
                        target="_blank"
                        to={api.link}
                        className="inline-flex text-sm items-center mt-1.5 fas fa-arrow-up-right-from-square"
                      ></Link>{" "} */}
                      <Link
                        target="_blank"
                        to={`https://santechapitool.vercel.app/${btoa(api.link)}/${btoa(apiKeys[0]?.key)}`}
                        className="pt-0.5 pb-1 rounded-full px-[0.7rem] bg-white text-gray-700 text-xs items-center "
                      >
                        try
                      </Link>
                    </h1>
                    <p className="leading-relaxed break-words me-5 text-gray-200 mb-3">
                      {api.short_desc}
                    </p>
                    {api.subscribed ? (
                      <div className=""></div>
                      // <button className="px-3 py-2 rounded-md bg-emerald-400 text-white">
                      //   Subscribed
                      // </button>
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
