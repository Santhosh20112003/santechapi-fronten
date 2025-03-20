import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoArrowUpCircle, IoTrashOutline } from "react-icons/io5";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import showdown from "showdown";
import { API_KEY } from "../common/links";
import "./chat.css";
import { useUserAuth } from "../context/UserAuthContext";
import { FaGear } from "react-icons/fa6";

const converter = new showdown.Converter();
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
  systemInstruction: `
  You are a Senior Business Intelligence Head named Jarvis AI with extensive experience in mentoring upcoming startups, particularly in the implementation of solutions using SanTechApiHub's APIs. Your expertise lies in guiding these startups to effectively leverage the APIs to meet their unique business requirements and to establish a robust framework for integrating their business logic into their products.
Your task is to provide a comprehensive framework for a startup to implement their business logic using SanTechApiHub’s API List. 
[
    {
      "name": "Weather API",
      "apiurl": "https://santechapi.vercel.app/weather/location/chennai",
      "docs_url": "https://santech.gitbook.io/docs/weather-api",
      "capabilities": "Real-time weather data, forecasts, and conditions",
      "description": "API for real-time weather data, forecasts, and conditions"
    },
    {
      "name": "Ecommerce API",
      "apiurl": "https://santechapi.vercel.app/ecommerce",
      "docs_url": "https://santech.gitbook.io/docs/ecommerce-api",
      "capabilities": "Sample ECommerce products and their details",
      "description": "API for Sample ECommerce products and their Details"
    },
    {
      "name": "Quotes API",
      "apiurl": "https://santechapi.vercel.app/quotes",
      "docs_url": "https://santech.gitbook.io/docs/quotes-api",
      "capabilities": "Inspirational and notable sayings",
      "description": "API for famous quotes: inspirational and notable sayings"
    },
    {
      "name": "Jokes API",
      "apiurl": "https://santechapi.vercel.app/jokes",
      "docs_url": "https://santech.gitbook.io/docs/jokes-api",
      "capabilities": "Humorous content and punchlines",
      "description": "API for fetching jokes: humorous content and punchlines"
    },
    {
      "name": "News API",
      "apiurl": "https://santechapi.vercel.app/news/search/Tesla",
      "docs_url": "https://santech.gitbook.io/docs/news-api",
      "capabilities": "Latest news articles and headlines",
      "description": "API for fetching the latest news articles and headlines"
    },
    {
      "name": "Sports Player API",
      "apiurl": "https://santechapi.vercel.app/sports/player/dhoni",
      "docs_url": "https://santech.gitbook.io/docs/sports-player-api",
      "capabilities": "Sports player details, stats, and profiles",
      "description": "API for fetching sports player details: stats and profiles"
    },
    {
      "name": "Stocks API",
      "apiurl": "https://santechapi.vercel.app/stocks/company/symbol/TCS",
      "docs_url": "https://santech.gitbook.io/docs/stocks-api",
      "capabilities": "Stock market data for real-time financial insights",
      "description": "API for stock market data used in real-time financial insights"
    },
    {
      "name": "Random User API",
      "apiurl": "https://santechapi.vercel.app/randomuser",
      "docs_url": "https://santechapi.vercel.app/randomuser",
      "capabilities": "Random fake user info: gender, name, email, address",
      "description": "API for random fake user info: gender, name, email, address"
    },
    {
      "name": "University API",
      "apiurl": "https://santechapi.vercel.app/university/country/india",
      "docs_url": "https://santech.gitbook.io/docs/university-api",
      "capabilities": "Fetch a list of universities in a specified country",
      "description": "API to get a list of universities in a specified country"
    },
    {
      "name": "Music API",
      "apiurl": "https://santechapi.vercel.app/music",
      "docs_url": "https://santech.gitbook.io/docs/music-api",
      "capabilities": "Retrieve music details: artists, albums, and tracks",
      "description": "API for retrieving music details: artists, albums, and tracks"
    },
    {
      "name": "Dictionary API",
      "apiurl": "https://santechapi.vercel.app/dictionary/search/apple",
      "docs_url": "https://santech.gitbook.io/docs/dictionary-api",
      "capabilities": "Fetch English word meaning, definitions, and audio",
      "description": "API for fetching English word meaning, definitions, audio, etc."
    },
    {
      "name": "Currency API",
      "apiurl": "https://santechapi.vercel.app/currency/inr/usd/200",
      "docs_url": "https://santech.gitbook.io/docs/currency-api",
      "capabilities": "Convert currency to different country rates",
      "description": "API for converting currency to different country rates."
    },
    {
      "name": "Genderize API",
      "apiurl": "https://santechapi.vercel.app/genderize/search/James",
      "docs_url": "https://santech.gitbook.io/docs/genderize-api",
      "capabilities": "Predict gender based on name",
      "description": "API for Predicting the gender of a person based on their name."
    },
    {
      "name": "QrCode Generator API",
      "apiurl": "https://santechapi.vercel.app/qrcode/Hello",
      "docs_url": "https://santech.gitbook.io/docs/qrcode-generator-api",
      "capabilities": "Generate QR codes with data and custom size",
      "description": "API to Generate QR code with data and custom size."
    },
    {
      "name": "Online Games API",
      "apiurl": "https://santechapi.vercel.app/onlinegames/",
      "docs_url": "https://santech.gitbook.io/docs/online-games-api",
      "capabilities": "Fetch free online browser games: titles and genres",
      "description": "API to fetch free online browser games: titles and genres"
    },
    {
      "name": "Anime Details API",
      "apiurl": "https://santechapi.vercel.app/animedetails/search/jjk",
      "docs_url": "https://santech.gitbook.io/docs/anime-details-api",
      "capabilities": "Fetch anime movies and series details: titles, genres, episodes",
      "description": "API for fetching anime movies and series details: titles, genres, episodes"
    },
    {
      "name": "Books API",
      "apiurl": "https://santechapi.vercel.app/books/search/harrypotter",
      "docs_url": "https://santech.gitbook.io/docs/books-api",
      "capabilities": "Fetch book details: titles, authors, and summaries",
      "description": "API to fetch book details: titles, authors, and summaries"
    },
    {
      "name": "Maps API",
      "apiurl": "https://santechapi.vercel.app/maps/city/thanjavur",
      "docs_url": "https://santech.gitbook.io/docs/maps-api",
      "capabilities": "Fetch location details: coordinates and info",
      "description": "API for fetching location details: coordinates and info"
    },
    {
      "name": "Images API",
      "apiurl": "https://santechapi.vercel.app/images/search/transformers",
      "docs_url": "https://santech.gitbook.io/docs/images-api",
      "capabilities": "Fetch images based on search terms and queries",
      "description": "API to fetch images based on search terms and queries"
    },
    {
      "name": "Recipe API",
      "apiurl": "https://santechapi.vercel.app/recipe/search/idly",
      "docs_url": "https://santech.gitbook.io/docs/recipe-api",
      "capabilities": "Fetch recipes and calories in a food item",
      "description": "API for fetching recipes and calories in a food item."
    },
    {
      "name": "Giphy & Stickers API",
      "apiurl": "https://santechapi.vercel.app/multimedia/stickers/naruto",
      "docs_url": "https://santech.gitbook.io/docs/giphy-&-stickers-api",
      "capabilities": "Fetch GIFs and stickers data: GIFs and reactions",
      "description": "API to fetch Giphy and stickers data: GIFs and reactions"
    },
    {
      "name": "Movie & Series API",
      "apiurl": "https://santechapi.vercel.app/imdb/movie/leo",
      "docs_url": "https://santech.gitbook.io/docs/movie-and-series-api",
      "capabilities": "Fetch movie and series details: titles and ratings",
      "description": "API to fetch movies and series details: titles and ratings"
    },
    {
      "name": "Conversational API",
      "apiurl": "https://santechapi.vercel.app/conversational/Hello",
      "docs_url": "https://santech.gitbook.io/docs/conversational-api",
      "capabilities": "Conversational chatbot: dialogue and responses",
      "description": "API for a conversational chatbot: dialogue and responses"
    },
    {
      "name": "Insightful Blog API",
      "apiurl": "https://santechapi.vercel.app/insightful/random",
      "docs_url": "https://santech.gitbook.io/docs/insightful-blog-api",
      "capabilities": "Access blogs from Insightful Blog Contents",
      "description": "API for accessing blogs from Insightful Blog Contents"
    },
    {
      "name": "Jarvis AI API",
      "apiurl": "https://santechapi.vercel.app/jarvis/chat/Hi",
      "docs_url": "https://santech.gitbook.io/docs/jarvis-ai-api",
      "capabilities": "Generative AI assistant for tasks and queries",
      "description": "API for Gemini Flash generative AI assistant: tasks and queries"
    }
  ]
  
Please ensure to outline the steps involved in the implementation process, any best practices to follow, potential pitfalls to avoid, and how to align the API features with the startup's business objectives.
  `,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const STARTUP_CATEGORIES = [
  "E-commerce",
  "FinTech",
  "HealthTech",
  "EdTech",
  "AI/ML",
  "SaaS",
  "Mobile Apps",
  "IoT",
  "Clean Energy",
  "Social Media",
  "Gaming",
  "Blockchain",
  "Other",
];

function IdeaCenter() {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdeaIndex, setSelectedIdeaIndex] = useState(null);
  const [newIdea, setNewIdea] = useState({
    name: "",
    category: "",
    details: "",
  });
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("ideas");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedIdeas = loadIdeas();
    if (savedIdeas.length > 0) {
      setIdeas(savedIdeas);
      setSelectedIdeaIndex(0);
    }
  }, []);

  useEffect(() => {
    if (selectedIdeaIndex !== null && ideas[selectedIdeaIndex]) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedIdeaIndex, ideas]);

  const handleInputChange = (e) => {
    setNewIdea({ ...newIdea, [e.target.name]: e.target.value });
  };

  const handleAddIdea = () => {
    if (ideas.length >= 5) {
      toast.error("You can only create up to 5 startup ideas!", { icon: "⚠️" });
      return;
    }
    if (!newIdea.name || !newIdea.category || !newIdea.details) {
      toast.error("Please fill in all fields!", { icon: "⚠️" });
      return;
    }
    const initialMessage = {
      user: newIdea.details,
      bot: "Hello! How can I assist you with your startup idea?",
      timestamp: new Date().toISOString(),
    };
    const newIdeas = [...ideas, { ...newIdea, conversation: [initialMessage] }];
    setIdeas(newIdeas);
    saveIdeas(newIdeas);
    setNewIdea({ name: "", category: "", details: "" });
    setSelectedIdeaIndex(newIdeas.length - 1);
  };

  const handleDeleteIdea = (index) => {
    const updatedIdeas = ideas.filter((_, i) => i !== index);
    setIdeas(updatedIdeas);
    saveIdeas(updatedIdeas);
    setSelectedIdeaIndex(updatedIdeas.length > 0 ? 0 : null);
  };

  const handleUserMessage = async (message) => {
    if (!message.trim()) {
      toast.error("Message cannot be empty!", { icon: "⚠️" });
      return;
    }
    setLoading(true);
    try {
      const idea = ideas[selectedIdeaIndex];
      const history = idea.conversation
        .map((item) => [
          { role: "user", parts: [{ text: item.user }] },
          { role: "model", parts: [{ text: item.bot }] },
        ])
        .flat();
      const chatSession = await model.startChat({
        generationConfig,
        safetySettings,
        history,
      });
      const result = await chatSession.sendMessage(message);
      const response = await result.response;

      if (response.status === "blocked") {
        toast.error(
          `Unable to process request due to potentially harmful content!`,
          {
            position: "top-center",
            icon: "❌",
          }
        );
        throw new Error("Response blocked due to potentially harmful content");
      }

      const text = await response.text();

      const updatedIdeas = ideas.map((i, index) => {
        if (index === selectedIdeaIndex) {
          return {
            ...i,
            conversation: [
              ...i.conversation,
              { user: message, bot: text, timestamp: new Date().toISOString() },
            ],
          };
        }
        return i;
      });
      setIdeas(updatedIdeas);
      saveIdeas(updatedIdeas);
    } catch (error) {
      toast.error("Failed to process message!", { icon: "❌" });
    } finally {
      setLoading(false);
    }
  };

  const saveIdeas = (ideas) => {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  };

  const loadIdeas = () => {
    const savedIdeas = localStorage.getItem("ideas");
    return savedIdeas ? JSON.parse(savedIdeas) : [];
  };

  return (
    <div className="w-full lg:flex flex-col items-center justify-center lg:p-5 bg-white lg:bg-violet-100 h-[90vh] overflow-hidden">
      <div className="w-full lg:bg-white rounded-lg p-3 flex flex-col h-full">
        <div className="flex lg:hidden gap-5 mb-4">
          <button
            className={`flex-1 rounded-lg p-2 ${
              activeTab === "ideas" ? "bg-violet-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("ideas")}
          >
            Ideas
          </button>
          <button
            className={`flex-1 rounded-lg p-2 ${
              activeTab === "chat" ? "bg-violet-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("chat")}
            disabled={selectedIdeaIndex === null}
          >
            Chat
          </button>
        </div>
        <div className="flex flex-col lg:flex-row h-full">
          <div
            className={`w-full lg:w-1/3 flex flex-col p-4 lg:border-r ${
              activeTab === "ideas" ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Your Ideas</h2>
              <span className="text-sm text-gray-600">({ideas.length}/5)</span>
            </div>
            <div className="flex-1 h-[30vh] overflow-y-auto">
              <div className="flex flex-col space-y-2">
                {ideas.length === 0 ? (
                  <p className="text-gray-500 text-start">
                    No startup ideas created yet. Add a new startup idea to get
                    started!
                  </p>
                ) : (
                  ideas.map((idea, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedIdeaIndex(index);
                        setActiveTab("chat");
                      }}
                      className={`p-2 rounded ${
                        selectedIdeaIndex === index
                          ? "bg-violet-600 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {idea.name}
                    </button>
                  ))
                )}
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-xl font-semibold mb-3">
                Add a New Startup Idea
              </h2>
              <div className="flex flex-col">
                <input
                  name="name"
                  value={newIdea.name}
                  onChange={handleInputChange}
                  placeholder="Idea Name"
                  className="p-2 border mb-2 rounded"
                />
                <select
                  name="category"
                  value={newIdea.category}
                  onChange={handleInputChange}
                  className="p-2 border mb-2 rounded"
                >
                  <option value="">Select Category</option>
                  {STARTUP_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <textarea
                  name="details"
                  value={newIdea.details}
                  onChange={handleInputChange}
                  rows={ideas.length > 0 ? 2 : 6}
                  placeholder="Detailed idea..."
                  className="p-2 border mb-4 rounded"
                ></textarea>
                <button
                  onClick={handleAddIdea}
                  className="bg-[#050f20] text-white px-4 py-2 rounded-full"
                >
                  Add Idea
                </button>
              </div>
            </div>
          </div>
          <div
            className={`w-full lg:w-2/3 p-4 flex flex-col ${
              activeTab === "chat" ? "block" : "hidden lg:block"
            }`}
          >
            {selectedIdeaIndex !== null && ideas[selectedIdeaIndex] ? (
              <div className="w-full bg-white rounded-lg border flex flex-col transition-all duration-500 ease-out h-full">
                <div className="p-4 border-b bg-violet-600 text-white rounded-t-lg flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {ideas[selectedIdeaIndex].name} (
                      {ideas[selectedIdeaIndex].category})
                    </h2>
                  </div>
                  <button
                    onClick={() => handleDeleteIdea(selectedIdeaIndex)}
                    className="bg-white text-red-600 rounded-lg p-1.5"
                  >
                    <IoTrashOutline className="text-lg" />
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-4 space-y-4 max-h-[40vh] lg:max-h-[calc(100vh-200px)] md:h-auto">
                  {ideas[selectedIdeaIndex].conversation.map((msg, index) => (
                    <div key={index} className="space-y-3">
                      <div className="w-full flex items-start justify-end gap-2.5">
                        <img
                          className="w-8 h-8 mt-2 ms-12 rounded-full"
                          src={user.photoURL}
                          alt="User"
                        />
                        <div className="flex flex-col w-auto leading-1.5 p-4 border-gray-200 bg-violet-100 rounded-e-xl rounded-es-xl">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900">
                              {user.displayName}
                            </span>
                            {/* <span className="text-sm font-semibold text-gray-900">{msg.timestamp}</span> */}
                          </div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: converter.makeHtml(msg.user),
                            }}
                            className="text-sm font-normal py-2.5 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <img
                          className="w-8 h-8 mt-2 bg-[#050f20] p-1 rounded-full"
                          src="https://ik.imagekit.io/vituepzjm/Jarvis.png"
                          alt="Bot"
                        />
                        <div className="flex flex-col w-auto lg:me-10 leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              Jarvis AI
                            </span>
                          </div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: converter.makeHtml(msg.bot),
                            }}
                            className="text-sm font-normal py-2.5 text-gray-900"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t rounded-b-lg bg-gray-50">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUserMessage(e.target.message.value);
                      e.target.reset();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      name="message"
                      placeholder="Ask follow-up questions about your startup idea..."
                      className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="text-violet-600 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {loading ? (
                        <FaGear className="animate-spin text-3xl text-violet-500" />
                      ) : (
                        <IoArrowUpCircle className={`text-[2.5rem]`} />
                      )}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="w-full bg-white rounded-lg shadow-md flex flex-col items-center justify-center h-full">
                <p className="text-gray-500">
                  No startup ideas created yet. Add a new startup idea to get
                  started!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default IdeaCenter;
