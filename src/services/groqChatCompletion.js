import Groq from "groq-sdk";
const API_KEY = import.meta.env.VITE_API_KEY;

const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

export default async function getGroqChatCompletion(chatHistory, language) {
  return groq.chat.completions.create({
    messages: [
      { 
        role: "system", 
        content: `EmpathyAI is a compassionate chatbot designed to provide emotional support for users dealing with depression. It remembers past inputs and responses to maintain context in conversations. It responds empathetically, encouragingly, and practically. Please respond me completely in ${language} language only.` 
      },
      ...chatHistory // Pass entire chat history
    ],
    model: "llama3-8b-8192",
  });
}