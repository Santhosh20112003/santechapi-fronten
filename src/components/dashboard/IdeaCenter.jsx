import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoArrowUpCircle, IoTrashOutline } from "react-icons/io5";
import { GoogleGenerativeAI } from "@google/generative-ai";
import showdown from "showdown";
import { API_KEY } from "../common/links";
import "./chat.css";
import { useUserAuth } from "../context/UserAuthContext";

const converter = new showdown.Converter();
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

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
      const result = await model.generateContent(message);
      const response = await result.response.text();
      const updatedIdeas = ideas.map((i, index) => {
        if (index === selectedIdeaIndex) {
          return {
            ...i,
            conversation: [...i.conversation, { user: message, bot: response }],
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
    <div className="w-full flex flex-col items-center justify-center p-5 bg-gray-100 h-[90vh] overflow-hidden">
      <div className="w-full bg-white rounded-lg shadow-md p-5 flex flex-col h-full">
        <div className="flex md:hidden mb-4">
          <button
            className={`flex-1 p-2 ${
              activeTab === "ideas" ? "bg-violet-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("ideas")}
          >
            Ideas
          </button>
          <button
            className={`flex-1 p-2 ${
              activeTab === "chat" ? "bg-violet-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("chat")}
            disabled={selectedIdeaIndex === null}
          >
            Chat
          </button>
        </div>
        <div className="flex flex-col md:flex-row h-full">
          <div
            className={`w-full md:w-1/3 flex flex-col p-4 border-r ${
              activeTab === "ideas" ? "block" : "hidden md:block"
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Startup Ideas</h2>
              <span className="text-sm text-gray-600">({ideas.length}/5)</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col space-y-2">
                {ideas.map((idea, index) => (
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
                ))}
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-xl font-semibold mb-3">
                Add a New Startup Idea
              </h2>
              <div className="flex flex-col space-y-2">
                <input
                  name="name"
                  value={newIdea.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="p-2 border rounded"
                />
                <select
                  name="category"
                  value={newIdea.category}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
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
                  placeholder="Detailed idea..."
                  className="p-2 border rounded"
                ></textarea>
                <button
                  onClick={handleAddIdea}
                  className="bg-violet-600 text-white px-4 py-2 rounded"
                >
                  Add Idea
                </button>
              </div>
            </div>
          </div>
          <div
            className={`w-full md:w-2/3 p-4 flex flex-col ${
              activeTab === "chat" ? "block" : "hidden md:block"
            }`}
          >
            {selectedIdeaIndex !== null && ideas[selectedIdeaIndex] ? (
              <div className="w-full bg-white rounded-lg shadow-md flex flex-col transition-all duration-500 ease-out h-full">
                <div className="p-4 border-b bg-violet-600 text-white rounded-t-lg flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {ideas[selectedIdeaIndex].name} (
                      {ideas[selectedIdeaIndex].category})
                    </h2>
                  </div>
                  <button
                    onClick={() => handleDeleteIdea(selectedIdeaIndex)}
                    className="bg-white text-red-600 rounded-lg p-2"
                  >
                    <IoTrashOutline className="text-lg" />
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {ideas[selectedIdeaIndex].conversation.map((msg, index) => (
                    <div key={index} className="space-y-3">
                      <div className="w-full flex items-start justify-end gap-2.5">
                        <img
                          className="w-8 h-8 mt-2 ms-12 rounded-full"
                          src={user.photoURL}
                          alt="User"
                        />
                        <div className="flex flex-col w-auto leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {user.displayName}
                            </span>
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
                          className="w-8 h-8 mt-2 rounded-full"
                          src="https://ik.imagekit.io/vituepzjm/Jarvis.png"
                          alt="Bot"
                        />
                        <div className="flex flex-col w-auto lg:me-10 leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              Jarvis AI
                            </span>
                          </div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: converter.makeHtml(msg.bot),
                            }}
                            className="text-sm font-normal py-2.5 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t rounded-b-2xl bg-gray-50">
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
                        <span className="inline-block animate-spin">⏳</span>
                      ) : (
                        <IoArrowUpCircle className="text-4xl" />
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
