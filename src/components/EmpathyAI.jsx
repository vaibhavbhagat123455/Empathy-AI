import { useState } from "react";
import Header from "./Header";
import Chats from "./Chats";
import Footer from "./Footer";
import getGroqChatCompletion from "../services/groqChatCompletion";

export default function EmpathyAI() {
    const [chats, setChats] = useState([
        { type: "assistant", content: "Hi there, I'm EmpathyAI. I'm here to listen and support you. Feel free to share whatever’s on your mind, and we’ll work through it together.", mode: "Supportive" }
    ]);
    const [mood, setMood] = useState("Supportive");
    const [speaking, setSpeaking] = useState(false); // State for speech toggle
    const [language, setLanguage] = useState("en-US"); // Default language

    const moods = ["Supportive", "Encouraging", "Compassionate", "Understanding", "Motivational"];
    const languages = [
        { code: "en-US", name: "English" },
        { code: "es-ES", name: "Spanish" },
        { code: "fr-FR", name: "French" },
        { code: "de-DE", name: "German" },
        { code: "zh-CN", name: "Chinese" },
        { code: "hi-IN", name: "Hindi" },      // Hindi
        { code: "mr-IN", name: "Marathi" },    // Marathi
        { code: "ja-JP", name: "Japanese" },   // Japanese
        { code: "ko-KR", name: "Korean" },     // Korean
        { code: "pt-BR", name: "Portuguese" }, // Portuguese
        { code: "ru-RU", name: "Russian" },    // Russian
        // Add more languages as needed
    ];

    const fetchAIResponse = async (inputText) => {
        if (inputText.trim() !== "") {
            const updatedChats = [...chats, { type: "user", content: inputText }];
            setChats(updatedChats);

            try {
                const chatHistory = updatedChats.slice(-10).map(chat => ({
                    role: chat.type === "user" ? "user" : "assistant",
                    content: chat.content
                }));

                const aiResponse = await getGroqChatCompletion(chatHistory, language); // Pass the language
                if (aiResponse && aiResponse.choices?.length > 0) {
                    const aiMessage = aiResponse.choices[0];
                    if (aiMessage?.message?.content) {
                        const newChat = { type: "assistant", content: aiMessage.message.content, mode: mood };
                        setChats(prevChats => [...prevChats, newChat]);

                        if (speaking) {
                            const utterance = new SpeechSynthesisUtterance(newChat.content);
                            utterance.lang = language; // Set the language for speech synthesis
                            window.speechSynthesis.speak(utterance);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching AI response:", error);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 p-4 bg-gray-100 pb-50">
                <Chats chats={chats} />
            </div>
            <div className="w-full fixed bottom-0 bg-white p-4 shadow-lg">
                <div className="mb-2 flex items-center justify-center space-x-3">
                    <label className="text-gray-600 font-medium">Select Mood:</label>
                    <select 
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                    >
                        {moods.map((m, index) => (
                            <option key={index} value={m}>{m}</option>
                        ))}
                    </select>

                    <label className="text-gray-600 font-medium">Select Language:</label>
                    <select 
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        {languages.map((lang, index) => (
                            <option key={index} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>
                </div>
                <Footer setPrompt={fetchAIResponse} speaking={speaking} setSpeaking={setSpeaking} language={language} />
            </div>
        </div>
    );
}