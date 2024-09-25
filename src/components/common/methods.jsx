import {
    GoogleGenerativeAI
  } from "@google/generative-ai";
  
export const genSearch = async (term) => {
    try {

      const genAI = new GoogleGenerativeAI("AIzaSyDeBKc55K7B4fIroENBhjlNxTYX5fAecKM");


      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `You are a semantic search AI. 
                             For user input, return the most relevant category from the following list in JSON format:
                             "Weather", "Ecommerce", "University", "Quotes", "Jokes", "News", "Sports Player", "Stocks", 
                             "Random User", "Music", "Dictionary", "Currency", "Genderize", "QrCode Generator", "Online Games", 
                             "Anime Details", "Books", "Maps", "Images", "Recipe", "Giphy & Stickers", "Movie & Series",
                             "Conversational", "Insightful Blog", "Jarvis Ai".
                             If nothing is relevant, return "null".`
      });


      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 50,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            response: {
              type: "string"
            }
          }
        }
      };


      const chatSession = model.startChat({
        generationConfig,
        history: [
          { role: "user", parts: [{ text: "temperature" }] },
          { role: "model", parts: [{ text: "```json\n{\"response\": \"Weather\"} \n```" }] },
          { role: "user", parts: [{ text: "translation" }] },
          { role: "model", parts: [{ text: "```json\n{\"response\": \"null\"} \n```" }] },
          { role: "user", parts: [{ text: "naruto" }] },
          { role: "model", parts: [{ text: "```json\n{\"response\": \"Anime Details\"} \n```" }] },
          { role: "user", parts: [{ text: "flight" }] },
          { role: "model", parts: [{ text: "```json\n{\"response\": \"null\"} \n```" }] },
          { role: "user", parts: [{ text: "food" }] },
          { role: "model", parts: [{ text: "```json\n{\"response\": \"Recipe\"} \n```" }] },
        ]
      });


      const result = await chatSession.sendMessage(term);


      const data = JSON.parse(result.response.text());
      return data.response === "null" ? term : data.response;

    } catch (error) {
      console.error("Error during GenAI search:", error);
      return term;
    }
  };