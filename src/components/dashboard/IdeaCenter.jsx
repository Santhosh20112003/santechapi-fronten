import React, { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoArrowUpCircle, IoCopyOutline } from 'react-icons/io5';
import { GoogleGenerativeAI } from '@google/generative-ai';
import showdown from 'showdown';
import { API_KEY } from '../common/links';
import './chat.css';

const converter = new showdown.Converter();
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

const STARTUP_CATEGORIES = [
  'E-commerce',
  'FinTech',
  'HealthTech',
  'EdTech',
  'AI/ML',
  'SaaS',
  'Mobile Apps',
  'IoT',
  'Clean Energy',
  'Social Media',
  'Gaming',
  'Blockchain',
  'Other'
];

const transitionStyles = {
  enter: "transform transition-all duration-500 ease-out",
  enterFrom: "scale-95 opacity-0",
  enterTo: "scale-100 opacity-100",
  exitFrom: "scale-100 opacity-100",
  exitTo: "scale-95 opacity-0",
};

function IdeaCenter() {
  const [idea, setIdea] = useState({ name: '', category: '', details: '' });
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleInputChange = (e) => {
    setIdea({ ...idea, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    if (!idea.name || !idea.category || !idea.details) {
      toast.error('Please fill in all fields!', { icon: '⚠️' });
      return;
    }
    setLoading(true);
    try {
      const result = await model.generateContent(`Startup Idea: ${idea.name}\nCategory: ${idea.category}\nDetails: ${idea.details}`);
      const response = await result.response.text();
      setConversation([{ user: idea.details, bot: response }]);
      setGenerated(true);
    } catch (error) {
      toast.error('Failed to generate response!', { icon: '❌' });
    } finally {
      setLoading(false);
    }
  };

  const handleUserMessage = async (message) => {
    setLoading(true);
    try {
      const result = await model.generateContent(message);
      const response = await result.response.text();
      setConversation([...conversation, { user: message, bot: response }]);
    } catch (error) {
      toast.error('Failed to process message!', { icon: '❌' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[85vh] flex flex-col items-center justify-center p-5 bg-gray-100">
      {!generated ? (
        <div className="p-5 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">What's your startup idea?</h2>
          <input name="name" value={idea.name} onChange={handleInputChange} placeholder="Name" className="w-full p-2 border rounded mb-3" />
          <select 
            name="category" 
            value={idea.category} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded mb-3"
          >
            <option value="">Select Category</option>
            {STARTUP_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <textarea name="details" value={idea.details} onChange={handleInputChange} placeholder="Detailed idea..." className="w-full p-2 border rounded mb-3"></textarea>
          <button onClick={handleGenerate} disabled={loading} className="bg-violet-600 text-white px-4 py-2 rounded">
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl h-full bg-white rounded-lg shadow-lg flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b bg-violet-600 text-white rounded-t-lg">
            <h2 className="text-xl font-semibold">AI Startup Assistant</h2>
            <p className="text-sm opacity-90">Discussing: {idea.name} ({idea.category})</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {conversation.map((msg, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-violet-100 p-4 rounded-lg max-w-[80%] shadow-sm">
                    <p className="text-sm text-violet-600 font-medium mb-1">You</p>
                    <div className="prose prose-sm" 
                      dangerouslySetInnerHTML={{ __html: converter.makeHtml(msg.user) }} 
                    />
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-4 rounded-lg max-w-[80%] shadow-sm">
                    <p className="text-sm text-gray-600 font-medium mb-1">AI Assistant</p>
                    <div className="prose prose-sm"
                      dangerouslySetInnerHTML={{ __html: converter.makeHtml(msg.bot) }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t bg-gray-50">
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
      )}
      <Toaster />
    </div>
  );
}

export default IdeaCenter;
