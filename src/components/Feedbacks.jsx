import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const Feedbacks = () => {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const feedbackData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeedbacks(feedbackData);

      const totalRating = feedbackData.reduce((sum, feedback) => sum + feedback.rating, 0);
      setAverageRating(feedbackData.length ? (totalRating / feedbackData.length).toFixed(1) : 0);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || rating === 0) return alert("Please enter a message and select a rating!");

    try {
      await addDoc(collection(db, "feedbacks"), {
        username: user.displayName,
        profileImage: user.photoURL || "https://via.placeholder.com/50",
        message,
        rating,
        createdAt: new Date(),
      });

      setMessage("");
      setRating(0);
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-wrap items-start justify-center py-10 px-6 gap-10">
      
      {/* Left Section - Feedback Form */}
      <div className="w-[40%]">
        <motion.div 
          className="bg-white p-6 shadow-md rounded-xl text-center border border-gray-200"
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800">Website Rating</h2>
          <p className="text-xl font-semibold text-blue-500 flex justify-center items-center mt-2">
            {averageRating} 
            <Star className="ml-1 text-blue-500" />
          </p>
        </motion.div>

        {user ? (
          <form 
            onSubmit={handleSubmit} 
            className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Give Your Feedback</h3>
            
            {/* Star Rating */}
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star}
                  className={`cursor-pointer transition ${
                    star <= rating ? "text-blue-500 scale-110" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            {/* Message Input */}
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 resize-none"
              placeholder="Write your feedback..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />

            {/* Submit Button */}
            <button type="submit"
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition-all"
            >
              Submit Feedback
            </button>
          </form>
        ) : (
          <p className="mt-6 text-red-500">Please login to give feedback</p>
        )}
      </div>

      {/* Right Section - Feedback Cards */}
      <div className="w-[55%]">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">All Feedbacks</h3>

        <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-4">
          {feedbacks.length === 0 ? (
            <p className="text-gray-500">No feedback yet.</p>
          ) : (
            feedbacks.map((fb) => (
              <motion.div key={fb.id}
                className="bg-white p-5 rounded-lg shadow-md border border-gray-200 pr-20 flex items-start gap-4"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
              >
                <img src={fb.profileImage} alt={fb.username} className="w-12 h-12 rounded-full object-cover border border-gray-300" />
                <div className="w-full">
                  <h4 className="font-medium text-gray-800">{fb.username}</h4>
                  
                  {/* Text Wrapping Fix */}
                  <p className="text-gray-600 text-sm break-words whitespace-pre-wrap max-w-full">
                    {fb.message}
                  </p>

                  <div className="text-blue-500 flex items-center mt-1">
                    {[...Array(fb.rating)].map((_, i) => <Star key={i} className="text-blue-500" />)}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
