import React, { useEffect, useState } from "react";
import axios from "axios";
import { secret } from "../common/links";
import { useUserAuth } from "../context/UserAuthContext";
import toast, { Toaster } from 'react-hot-toast';
import nokeyImage from "../assert/No data-pana.svg";
import nosubsImage from "../assert/Subscriber-bro.svg";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Link } from "react-router-dom";
import { CgSearch } from "react-icons/cg";
import { genSearch } from "../common/methods";
import { BiSolidFileDoc } from "react-icons/bi";
import nokey from "../assert/No data-cuate.svg";

function Apis() {
  const { user, apiKeys, setApiKeys } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [subscribedApis, setSubscribedApis] = useState([]);
  const [filteredApis, setFilteredApis] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [subscribedApisLoading, setSubscribedApisLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  var apikeysreq = {
    method: "POST",
    url: "https://santechapi-backend.vercel.app/getapiKeys",
    headers: { "Content-Type": "application/json", secret: secret },
    data: { email: user.email },
  };
  var options = {
    method: "POST",
    url: "https://santechapi-backend.vercel.app/getsubscribedapis",
    headers: { "Content-Type": "application/json", secret: secret },
    data: { email: user.email },
  };

  const fetchData = async () => {
    setLoading(true);
    setSubscribedApisLoading(true);

    try {
      const apiKeysResponse = await axios.request(apikeysreq);

      const subscribedApisResponse = await axios.request(options);

      if (apiKeysResponse.status === 200) {
        const updatedApiKeys = apiKeysResponse.data.map((token) => ({
          key: token,
          copied: false,
        }));
        setApiKeys(updatedApiKeys);
      }

      setSubscribedApis(subscribedApisResponse.data);
      setFilteredApis(subscribedApisResponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSubscribedApisLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const copyToClipboard = (token, index) => {
    navigator.clipboard.writeText(token);
    const updatedApiKeys = apiKeys.map((key, i) => ({
      ...key,
      copied: i === index,
    }));
    setApiKeys(updatedApiKeys);

    toast.success("API Key is Copied");

    setTimeout(() => {
      setApiKeys(apiKeys.map((key) => ({ ...key, copied: false })));
    }, 5000);
  };

  const deleteApiKey = async (token, index) => {
    setLoading(true);
    try {
      var deleteapireq = {
        method: "POST",
        url: `https://santechapi-backend.vercel.app/deleteapiKeys/${token}`,
        headers: { "Content-Type": "application/json", secret: secret },
        data: { email: user.email },
      };
      const result = await axios.request(deleteapireq);
      if (result.status === 200) {
        toast("API Key Deleted Successfully");
        setApiKeys(apiKeys.filter((_, i) => i !== index));
      }
    } catch (error) {
      toast.error(`Error Occurred with ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async () => {
    setLoading(true);

    try {
      const createApiReq = {
        method: "POST",
        url: `https://santechapi-backend.vercel.app/createapikey`,
        headers: { "Content-Type": "application/json", secret: secret },
        data: { email: user.email },
      };
      const result = await axios.request(createApiReq);

      if (result.status === 200) {
        const successMessage = result.data.email
          ? "Your API Key has been successfully generated and sent to your email."
          : "API Key Created Successfully.";

        toast.success(successMessage);

        setApiKeys([...apiKeys, { key: result.data.token, copied: false }]);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async (api, index) => {
    setLoading(true);

    try {
      var createapireq = {
        method: "POST",
        url: `https://santechapi-backend.vercel.app/removeSubscribeApi/${api.name}`,
        headers: { "Content-Type": "application/json", secret: secret },
        data: { email: user.email },
      };
      const result = await axios.request(createapireq);

      if (result.status === 200) {
        toast.success(`${api.name} Api unsubscribed Successfully`);
        const newArr = subscribedApis.filter((_, i) => i !== index);
        setFilteredApis(newArr);
        setSubscribedApis(newArr);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error) => {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error(`Error Occurred with ${error.response.data}`);
      } else if (error.response.status === 403) {
        toast("API Key limit is reached!");
      }
    } else {
      toast.error(`Error Occurred with ${error}`);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSubscribedApisLoading(true);
    const data = await genSearch(searchTerm);
    const filtered = subscribedApis.filter(api => api.name.toLowerCase().includes(data.toLowerCase()));
    setSubscribedApisLoading(false);
    setNotFound(filtered.length === 0);
    setFilteredApis(filtered);
  };

  const { setTitle } = useUserAuth();

  useEffect(() => {
    setTitle("Your API Dashboard");
    return () => setTitle("");
  }, [setTitle]);

  return (
    <div className="h-[90vh] overflow-y-scroll">
      {/* <h1 className="text-2xl ms-5 mt-5 font-semibold text-gray-700">
        My Space
      </h1> */}

      {loading ? (
        <div className="rounded-md h-[20vh] p-5 mx-5 mt-5 flex items-center justify-center bg-violet-200 border-2 border-violet-300">
          <svg
            className={`animate-spin h-8 w-8 text-violet-500`}
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
      ) : (
        <div className="rounded-md p-5 mx-5 mt-5 bg-violet-200 border-2 border-violet-300">
          <span className="flex items-center flex-wrap justify-between">
            <h1 className="text-xl font-semibold ms-3 text-gray-800">Your API KEYS</h1>
            {apiKeys.length > 0 && <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                      <button className="text-white fas fa-plus active:scale-90 transition-all shadow-blackA4 hover:bg-violet-500 inline-flex h-[35px] w-[35px] items-center justify-center rounded-lg bg-violet-600 shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"></button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] z-50 rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                          Are you absolutely sure?
                        </AlertDialog.Title>
                        <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                          This will create your Api Key in our servers on behalf
                          of <b>{user.email}</b>.
                        </AlertDialog.Description>
                        <div className="flex justify-end gap-[25px]">
                          <AlertDialog.Action asChild>
                            <button
                              onClick={createApiKey}
                              className="text-green-700 bg-green-200 hover:bg-green-300 focus:shadow-green-400 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                            >
                              Create Api New Key
                            </button>
                          </AlertDialog.Action>
                          <AlertDialog.Cancel asChild>
                            <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                              Cancel
                            </button>
                          </AlertDialog.Cancel>
                        </div>
                      </AlertDialog.Content>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-md will-change-[transform,opacity]"
                    sideOffset={5}
                  >
                    Add ApiKey
                    <Tooltip.Arrow className="fill-white" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>}
          </span>

          {apiKeys.length > 0 ? (
            <ul className="flex mt-5  flex-col gap-3">
              {apiKeys.map((token, index) => (
                <li
                  key={index}
                  className={`flex w-full items-center rounded-md justify-end md:justify-between md:flex-nowrap flex-wrap gap-3 px-3 py-2 bg-gray-700`}
                >
                  <p
                    className={`text-sm blur-[2px] cursor-text hover:blur-none w-fit break-all ${token.copied ? "text-white" : "text-white"
                      }`}
                  >
                    {token.key}
                  </p>
                  <i
                    className={`px-3 py-2 active:scale-90 transition-all border-2 fas ${token.copied ? "fa-check" : "fa-clipboard"
                      } ${token.copied
                        ? "bg-green-200 border-green-400"
                        : "bg-gray-200 border-gray-400"
                      } text-gray-500 rounded-md`}
                    onClick={() => copyToClipboard(token.key, index)}
                  ></i>
                  <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                      <button className="fas fa-trash active:scale-90 transition-all bg-red-200 border-2 px-3 py-2 border-red-400 text-red-500 rounded-md"></button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] z-50 rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                          Are you absolutely sure?
                        </AlertDialog.Title>
                        <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                          This action cannot be undone. This will permanently
                          delete your Api Key from our servers.
                        </AlertDialog.Description>
                        <div className="flex justify-end gap-[25px]">
                          <AlertDialog.Cancel asChild>
                            <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                              Cancel
                            </button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action asChild>
                            <button
                              onClick={() => deleteApiKey(token.key, index)}
                              className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                            >
                              Yes, delete
                            </button>
                          </AlertDialog.Action>
                        </div>
                      </AlertDialog.Content>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center my-6 justify-center flex-col">
              <img src={'https://ik.imagekit.io/vituepzjm/APIHUB/undraw_code_typing_re_p8b9.svg?updatedAt=1728402976726'} alt="NO API KEY" className="w-36 mb-5" />
              <h1 className="text-lg font-normal text-gray-600">Create Your First API Key Here..</h1>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <AlertDialog.Root>
                      <AlertDialog.Trigger asChild>
                        <button className="text-white mt-3 px-3 py-2 active:scale-90 transition-all shadow-blackA4 hover:bg-violet-500 inline-flex items-center justify-center rounded-lg bg-violet-600 shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
                          Create Now
                        </button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Portal>
                        <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] z-50 rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                            Are you absolutely sure?
                          </AlertDialog.Title>
                          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                            This will create your Api Key in our servers on behalf
                            of <b>{user.email}</b>.
                          </AlertDialog.Description>
                          <div className="flex justify-end gap-[25px]">
                            <AlertDialog.Action asChild>
                              <button
                                onClick={createApiKey}
                                className="text-green-700 bg-green-200 hover:bg-green-300 focus:shadow-green-400 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                              >
                                Create Api New Key
                              </button>
                            </AlertDialog.Action>
                            <AlertDialog.Cancel asChild>
                              <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                Cancel
                              </button>
                            </AlertDialog.Cancel>
                          </div>
                        </AlertDialog.Content>
                      </AlertDialog.Portal>
                    </AlertDialog.Root>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-md will-change-[transform,opacity]"
                      sideOffset={5}
                    >
                      Add ApiKey
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          )}
        </div>
      )}

      <Toaster />

      {subscribedApis.length > 0 && <div className="w-full flex mt-10 items-center justify-between">
        <h1 className="text-2xl ms-5 md:block hidden font-semibold text-gray-700">
          Subscribed APIs
        </h1>
        <form onSubmit={handleSearch} class="flex items-center mx-5 md:me-5 w-full md:w-fit">
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <CgSearch />
            </div>
            <input value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} disabled={subscribedApisLoading} type="search" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="Search For APIs .." />
          </div>
        </form>
      </div>}

      <div id="subscribed" className="min-h-[40vh]">
        {subscribedApisLoading ? (
          <div className="mx-10 flex items-center justify-center mt-5 h-[40vh] bg-cover pb-4">
            <svg
              className={`animate-spin h-8 w-8 text-violet-500`}
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
          <div className="w-full h-[40vh] flex items-center flex-col justify-center">
            <img src={nokey} alt="no content" className="w-64" />
            <p className="text-lg">Content Not Found</p>
          </div>
        ) : subscribedApis.length > 0 ? (
          <div className="">
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-3 mx-1">
              {filteredApis.map((api, index) => (
                <div
                  key={index}
                  className="p-4 flex items-center justify-center md:block"
                >
                  <div
                    className={`lg:h-64 w-full h-80 md:w-[1fr] max-w-[500px]  bg-gray-500 relative rounded-lg overflow-hidden shadow-lg`}
                  >
                    <span className="bg-emerald-500 z-10 text-white px-3 py-1 text-xs absolute right-0 top-0 rounded-bl">
                      Subscribed
                    </span>
                    <Link target="_blank" to={`https://santech.gitbook.io/docs/${api.name.toLowerCase().replace(/\s/g, '-')}-api`} className="bg-white z-10 text-gray-800 p-1 text-xs absolute left-2 top-2 rounded-tl-lg rounded-sm rounded-br-lg">
                      <BiSolidFileDoc className="text-lg" />
                    </Link>
                    <img
                      src={api.img}
                      alt={api.name}
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
                      <p className="leading-relaxed text-gray-200 mb-5 me-3">
                        {api.short_desc}
                      </p>

                      <AlertDialog.Root>
                        <AlertDialog.Trigger asChild>
                          <button className="px-3 py-2 rounded-md bg-red-500 text-white ">
                            Un Subscribe
                          </button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Portal>
                          <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                          <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] z-50 rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                            <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                              Are you absolutely sure to unsubscribe
                            </AlertDialog.Title>
                            <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                              Subscription to <b>{api.name} API</b> has been unsubscribed, your access to this api will be stopped.
                            </AlertDialog.Description>
                            <div className="flex justify-end gap-[25px]">
                              <AlertDialog.Cancel asChild>
                                <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                  Cancel
                                </button>
                              </AlertDialog.Cancel>
                              <AlertDialog.Action asChild>
                                <button
                                  onClick={() => {
                                    unsubscribe(api, index);
                                  }}
                                  className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                                >
                                  Unsubscribe
                                </button>
                              </AlertDialog.Action>
                            </div>
                          </AlertDialog.Content>
                        </AlertDialog.Portal>
                      </AlertDialog.Root>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center py-5 my-5 h-[40vh] justify-center flex-col">
            <img src={nosubsImage} alt="NO API KEY" className="w-44" />
            <p className="text-base">Not Yet Subscribed Anything...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Apis;
