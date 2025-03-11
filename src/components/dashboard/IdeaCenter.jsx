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
    <div className="w-full h-[85vh] flex flex-col p-5 bg-gray-100">
      {!generated ? (
        <div className="p-5 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">What's your startup idea?</h2>
          <input name="name" value={idea.name} onChange={handleInputChange} placeholder="Name" className="w-full p-2 border rounded mb-3" />
          <input name="category" value={idea.category} onChange={handleInputChange} placeholder="Category" className="w-full p-2 border rounded mb-3" />
          <textarea name="details" value={idea.details} onChange={handleInputChange} placeholder="Detailed idea..." className="w-full p-2 border rounded mb-3"></textarea>
          <button onClick={handleGenerate} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-auto p-3 bg-white rounded-lg shadow-md space-y-4">
          {conversation.map((msg, index) => (
            <div key={index} className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="font-semibold">You:</p>
                <p dangerouslySetInnerHTML={{ __html: converter.makeHtml(msg.user) }} />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                <p className="font-semibold">AI:</p>
                <p dangerouslySetInnerHTML={{ __html: converter.makeHtml(msg.bot) }} />
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          <form onSubmit={(e) => { e.preventDefault(); handleUserMessage(e.target.message.value); e.target.reset(); }} className="flex p-3 bg-gray-200 rounded mt-4 space-x-3">
            <input name="message" placeholder="Ask AI..." className="w-full p-3 bg-white rounded" />
            <button type="submit" className="text-2xl text-blue-600" disabled={loading}><IoArrowUpCircle /></button>
          </form>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default IdeaCenter;
