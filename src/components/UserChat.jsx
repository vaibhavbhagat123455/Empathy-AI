import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { 
  collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { FiSend } from "react-icons/fi";  // Send Icon
import { IoMdArrowBack } from "react-icons/io"; // Back Icon

const UserChat = () => {
  const { user: currentUser } = useAuth();
  const { chatPartnerId, chatPartnerName, chatPartnerImage } = useParams();
  
  const decodedName = decodeURIComponent(chatPartnerName);
  const decodedImage = decodeURIComponent(chatPartnerImage);
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(""); 
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!currentUser || !chatPartnerId) return;

    const q = query(
      collection(db, "messages"),
      where("participantId", "in", [
        [currentUser.uid, chatPartnerId],
        [chatPartnerId, currentUser.uid]
      ]),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(fetchedMessages);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [currentUser, chatPartnerId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    if (!chatPartnerId) {
      console.error("❌ No chat partner selected!");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        senderId: currentUser.uid,
        senderName: currentUser.displayName || "Anonymous",
        senderImage: currentUser.photoURL || "/default-avatar.png",
        receiverId: chatPartnerId,
        participantId: [currentUser.uid, chatPartnerId],
        timestamp: serverTimestamp(),
      });

      setNewMessage("");
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-100 to-gray-200">
      {/* Chat Header */}
      <div className="flex items-center p-4 bg-blue-600 text-white shadow-md">
        <IoMdArrowBack className="text-2xl cursor-pointer mr-3" onClick={() => window.history.back()} />
        <img src={decodedImage || "/default-avatar.png"} alt="User" className="w-12 h-12 rounded-full mr-3 shadow-lg border-2 border-white" />
        <h2 className="text-lg font-semibold">{decodedName || "Chat"}</h2>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === currentUser.uid ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-xl shadow-md max-w-xs ${
              msg.senderId === currentUser.uid ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
            }`}>
              <p className="text-sm">{msg.text}</p>
              <p className="text-xs text-gray-400 text-right mt-1">
                {msg.timestamp?.toDate 
                  ? new Date(msg.timestamp.toDate()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) 
                  : "Sending..."}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-3 border rounded-full focus:outline-none shadow-md"
        />
        <button onClick={sendMessage} className="ml-3 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition">
          <FiSend className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default UserChat;
