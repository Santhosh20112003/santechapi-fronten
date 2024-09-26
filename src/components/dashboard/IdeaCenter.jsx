import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { TbShare } from "react-icons/tb";
import { IoArrowUpCircle, IoCopyOutline } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import showdown from "showdown";
import { ParseAIDate } from '../common/methods';
import { useUserAuth } from '../context/UserAuthContext';
import './chat.css';
import { API_KEY } from '../common/links';

const converter = new showdown.Converter();
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  systemInstruction: `I am an AI content creator, summarizer, and sentence optimizer. I can help with tasks like content creation, summarization, and sentence optimization.`,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

const MAX_RECENT_CHATS = 5;

function IdeaCenter() {
  const { conversation, setConversation, user } = useUserAuth();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem(btoa(user.uid))) || [];
    setConversation(savedChats);
  }, [setConversation, user.uid]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const saveRecentChats = (chats) => {
    const recentChats = chats.slice(-MAX_RECENT_CHATS);
    localStorage.setItem(btoa(user.uid), JSON.stringify(recentChats));
  };

  const handleChatSubmission = async (message) => {
    setLoading(true);
    try {
      const history = conversation.map(item => [
        { role: "user", parts: [{ text: item.user }] },
        { role: "model", parts: [{ text: item.bot }] }
      ]).flat() || [{ role: "user", parts: [{ text: "hello" }] }];

      const chatSession = model.startChat({ generationConfig, safetySettings, history });
      const result = await chatSession.sendMessage(message);
      const response = await result.response;

      if (response.status === "blocked") {
        toast.error("Potentially harmful content blocked!", { icon: "❌" });
        return;
      }

      const text = await response.text();
      const newMessage = { user: message, bot: text, timestamp: new Date() };
      setConversation((prev) => [...prev, newMessage]);
      saveRecentChats([...conversation, newMessage]);
      setPrompt("");
    } catch (error) {
      toast.error("Unable to process your request!", { icon: "❌" });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResponse = (response) => {
    navigator.clipboard.writeText(response);
    toast.success("Copied to clipboard!", { icon: "✅" });
  };

  const handleShareResponse = (response) => {
    if (navigator.share) {
      navigator.share({ text: `${user.displayName} shared a response from Jarvis AI:\n\n${response}` });
    } else {
      toast.error("Sharing not supported on this device", { icon: "⚠️" });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.success("Please enter a prompt!", { icon: "✏️" });
      return;
    }
    handleChatSubmission(prompt);
  };

  return (
    <div className="w-full h-[85vh]">
      <div className="bg-white p-4">
        <div className="w-full px-3 pt-2 jarvis-cont overflow-y-auto max-h-[75vh] h-auto">
          {conversation.length === 0 ? (
            <div className="flex items-center justify-center gap-5 flex-col">
              <img src="https://ik.imagekit.io/vituepzjm/Scribby/QA_hero-rev.webp?updatedAt=1725384607039" alt="Logo" className="h-48" />
              <p className="text-xl text-center text-violet-400 font-bold">
                Hello {user?.displayName?.length > 20 ? `${user.displayName.slice(0, 20)}..` : user.displayName}, I'm Jarvis AI.<br />How can I help you today?
              </p>
            </div>
          ) : (
            conversation.map((msg, index) => (
              <div key={index} className="text-violet-400 jarvis space-y-3">
                {msg.user && (
                  <div className="bg-violet-400/10 p-3 rounded-xl md:ms-5">
                    <div className="flex items-center justify-between pb-3">
                      <span className="inline-flex items-center gap-2">
                        <img src={user.photoURL} alt="user" className="w-6 h-6 rounded-full bg-violet-400" />
                        <h1 className="text-base font-semibold text-violet-400">
                          {user?.displayName?.length > 10 ? `${user.displayName.slice(0, 10)}..` : user.displayName}
                        </h1>
                      </span>
                      {msg.timestamp && (
                        <h2 className="text-[10px] px-[6px] py-[6px] bg-violet-400 text-white rounded-lg">{ParseAIDate(msg.timestamp)}</h2>
                      )}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(msg.user) }} />
                  </div>
                )}
                <div className="bg-violet-400/10 p-3 rounded-xl md:me-5">
                  <div className="flex items-center justify-between pb-3">
                    <span className="inline-flex items-center gap-2">
                      <img src="https://ik.imagekit.io/vituepzjm/Jarvis.png" alt="jarvis" className="w-6 h-6 rounded-full p-1 bg-violet-400" />
                      <h1 className="text-base font-semibold text-violet-400">Jarvis AI</h1>
                    </span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleCopyResponse(msg.bot)} className="copy-button">
                        <IoCopyOutline className="text-violet-400" />
                      </button>
                      <button onClick={() => handleShareResponse(msg.bot)} className="share-button">
                        <TbShare className="text-violet-400" />
                      </button>
                    </div>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(msg.bot) }} />
                </div>
                <div ref={index === conversation.length - 1 ? messagesEndRef : null} />
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleFormSubmit} className="flex items-center justify-between p-2 mt-2 bg-violet-400 rounded-xl space-x-2">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Tell me your Stories..."
            className="p-2 bg-transparent text-white placeholder-white w-full focus:outline-none"
            autoFocus
          />
          <button type="submit" className="text-4xl font-bold rounded-full p-1" disabled={loading} title="Send">
            {loading ? <FaGear className="animate-spin text-white" /> : <IoArrowUpCircle className="text-white rotate-90" />}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default IdeaCenter;
