import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Lightbulb, Brain, Code, Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaArrowRight } from "react-icons/fa";
import { FaBrain, FaComments, FaHeart, FaGlobe, FaLock } from "react-icons/fa";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/chat");
    } else {
      navigate("/signup");
    }
  };

  const handleFeedback = () => {
    if (user) {
      navigate("/feedbacks");
    } else {
      navigate("/login");
    }
  };

    const testimonials = [
      { name: "John D.", quote: "Empathy AI improved my customer interactions and boosted my business!" },
      { name: "Sarah L.", quote: "This AI made my therapy sessions more insightful and impactful!" },
      { name: "Michael R.", quote: "As an educator, I can now connect with students on a deeper level!" },
      { name: "Emily C.", quote: "Understanding emotions has never been this easy—Empathy AI changed my life!" },
      { name: "David W.", quote: "Empathy AI helped me grow my coaching business tenfold!" },
      { name: "Sophia T.", quote: "A game-changer for my mental health practice!" },
      { name: "Liam G.", quote: "Finally, an AI that truly understands human emotions!" },
      { name: "Olivia M.", quote: "I've built stronger relationships thanks to Empathy AI." },
      { name: "Ethan B.", quote: "My customers now feel truly heard and understood!" },
      { name: "Ava K.", quote: "The best AI assistant I’ve ever used!" },
    ]

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-white via-blue-100 to-purple-200">
      <div className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-white via-blue-100 to-purple-200 animate-gradient">
      {/* Typing Text with Gradient Glow Effect */}
      <motion.h1
        className="text-6xl md:text-8xl font-bold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text glow-text"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Typewriter
          words={[
            "Empathy AI", 
            "Your AI Companion", 
            "Bringing Emotions to AI", 
            "AI That Understands You",  
            "Intelligence with Empathy", 
            "Experience AI Like Never Before", 
            "Your Personalized AI Friend"
          ]}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </motion.h1>

      {/* Animated Cards Section */}
      <div className="mt-10 flex flex-wrap gap-6 justify-center">
        <motion.div
          className="w-72 p-6 bg-white shadow-xl rounded-lg text-center flex flex-col items-center transition-all duration-300 hover:scale-110 hover:shadow-2xl"
          whileHover={{ scale: 1.1 }}
        >
          <Lightbulb size={50} className="text-blue-500 mb-3" />
          <h3 className="text-xl font-semibold">Innovative Ideas</h3>
          <p className="text-gray-600">Empathy AI understands emotions and adapts to your needs.</p>
        </motion.div>

        <motion.div
          className="w-72 p-6 bg-white shadow-xl rounded-lg text-center flex flex-col items-center transition-all duration-300 hover:scale-110 hover:shadow-2xl"
          whileHover={{ scale: 1.1 }}
        >
          <Brain size={50} className="text-purple-500 mb-3" />
          <h3 className="text-xl font-semibold">Advanced Learning</h3>
          <p className="text-gray-600">Uses deep learning to enhance interactions over time.</p>
        </motion.div>

        <motion.div
          className="w-72 p-6 bg-white shadow-xl rounded-lg text-center flex flex-col items-center transition-all duration-300 hover:scale-110 hover:shadow-2xl"
          whileHover={{ scale: 1.1 }}
        >
          <Code size={50} className="text-green-500 mb-3" />
          <h3 className="text-xl font-semibold">Seamless Integration</h3>
          <p className="text-gray-600">Easily integrates with your favorite platforms.</p>
        </motion.div>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="mt-10 flex gap-4">
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition duration-300"
          whileHover={{ scale: 1.1 }}
          onClick={handleGetStarted}
        >
          Get Started
        </motion.button>

        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition duration-300"
          whileHover={{ scale: 1.1 }}
          onClick={handleFeedback}
        >
          Give Feedback
        </motion.button>
      </div>

      {/* Background Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-200 to-purple-300 opacity-40 animate-pulse z-[-1]"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Copyright Section */}
      <div className="absolute bottom-25 text-center text-gray-700 text-lg">
        © 2025 Vaibhav Bhagat |{" "}
        <a
          href="https://github.com/vaibhavbhagat9545"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          GitHub Profile
        </a>
      </div>
    </div>
      </section>

      {/* Who We Are Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-100 via-purple-200 to-pink-200 px-10 relative overflow-hidden">
  
  {/* Animated Headline */}
  <motion.h2
    className="text-5xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    What is Empathy AI?
  </motion.h2>

  {/* Description */}
  <motion.p
    className="text-xl mt-4 max-w-3xl text-gray-800"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 1 }}
  >
    Empathy AI is an advanced artificial intelligence system designed to analyze human emotions through conversations, voice patterns, and facial expressions. 
  </motion.p>

  {/* Feature Cards */}
  <div className="mt-10 flex flex-wrap justify-center gap-6">
    <motion.div
      className="w-72 p-6 bg-white shadow-xl rounded-lg text-center flex flex-col items-center transition-all duration-300 hover:scale-110 hover:shadow-2xl"
      whileHover={{ scale: 1.1 }}
    >
      <Lightbulb size={50} className="text-blue-500 mb-3" />
      <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
      <p className="text-gray-600">Understands emotions through deep learning and real-time analysis.</p>
    </motion.div>

    <motion.div
      className="w-72 p-6 bg-white shadow-xl rounded-lg text-center flex flex-col items-center transition-all duration-300 hover:scale-110 hover:shadow-2xl"
      whileHover={{ scale: 1.1 }}
    >
      <Heart size={50} className="text-pink-500 mb-3" />
      <h3 className="text-xl font-semibold">Emotional Intelligence</h3>
      <p className="text-gray-600">Detects tone, voice, and mood to create meaningful conversations.</p>
    </motion.div>

    <motion.div
      className="w-72 p-6 bg-white shadow-xl rounded-lg text-center flex flex-col items-center transition-all duration-300 hover:scale-110 hover:shadow-2xl"
      whileHover={{ scale: 1.1 }}
    >
      <MessageCircle size={50} className="text-green-500 mb-3" />
      <h3 className="text-xl font-semibold">Natural Conversations</h3>
      <p className="text-gray-600">Interacts in a human-like way, making conversations engaging.</p>
    </motion.div>
  </div>

</section>


<section className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 px-10">
  
  {/* Title with Animation */}
  <motion.h2
    className="text-5xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    Why Choose Empathy AI?
  </motion.h2>

  {/* Feature List - Timeline Format */}
  <div className="mt-10 relative w-full max-w-4xl">
    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-indigo-600"></div>

    {[
      { icon: <FaBrain />, title: "AI with Emotional Intelligence", desc: "Understands emotions using deep learning." },
      { icon: <FaComments />, title: "Natural Conversations", desc: "Interacts in an engaging, human-like way." },
      { icon: <FaHeart />, title: "Personalized Recommendations", desc: "Provides tailored suggestions based on emotions." },
      { icon: <FaGlobe />, title: "Enhancing Relationships", desc: "Strengthens human connections with AI support." },
      { icon: <FaLock />, title: "Secure & Private", desc: "Your data is encrypted and remains confidential." },
    ].map((feature, index) => (
      <motion.div
        key={index}
        className={`flex items-center w-full mb-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      >
        <div className="w-1/2 px-6 text-right">
          <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
          <p className="text-gray-600">{feature.desc}</p>
        </div>
        <div className="w-12 h-12 flex items-center justify-center bg-white shadow-md rounded-full border border-blue-500 text-blue-600 text-2xl">
          {feature.icon}
        </div>
        <div className="w-1/2 px-6 text-left hidden sm:block">
          <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
          <p className="text-gray-600">{feature.desc}</p>
        </div>
      </motion.div>
    ))}
  </div>

</section>



      {/* Who Can Benefit Section */}
    

<section className="h-screen flex flex-col justify-center items-center bg-gray-50 px-10">
  
  {/* Section Title */}
  <motion.h2
    className="text-5xl font-extrabold text-gray-900 mb-6"
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    Who Can Use Empathy AI?
  </motion.h2>
  
  <p className="text-xl max-w-3xl text-center text-gray-600">
    Empathy AI has helped individuals, businesses, healthcare professionals, educators, and counselors improve emotional well-being and communication.
  </p>

  {/* Cards Container */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 w-full max-w-6xl">
    
    {[
      {
        name: "Sarah Johnson",
        role: "Therapist",
        before: "/images/before.png",
        after: "/images/after.png",
        impact: "Enhanced emotional intelligence."
      },
      {
        name: "David Miller",
        role: "Corporate Manager",
        before: "/images/before2.png",
        after: "/images/after2.png",
        impact: "Improved leadership and team communication."
      },
      {
        name: "Emma Watson",
        role: "Educator",
        before: "/images/before3.png",
        after: "/images/after3.png",
        impact: "Better student engagement and emotional support."
      },
      {
        name: "Jue Lee",
        role: "Entrepreneur",
        before: "/images/before4.png",
        after: "/images/after4.png",
        impact: "Boosted customer interaction and business growth."
      }
    ].map((user, index) => (
      <motion.div
        key={index}
        className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      >
        {/* Before & After Images */}
        <div className="relative w-40 h-40 mb-4">
          <motion.img
            src={user.before}
            alt="Before"
            className="absolute w-full h-full rounded-xl shadow-md"
            initial={{ opacity: 1 }}
            whileHover={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.img
            src={user.after}
            alt="After"
            className="absolute w-full h-full rounded-xl shadow-md"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* User Information */}
        <h3 className="text-2xl font-semibold text-gray-900">{user.name}</h3>
        <p className="text-sm text-blue-600">{user.role}</p>
        <p className="text-gray-700 mt-3">{user.impact}</p>

        {/* Learn More Button */}
        <button className="mt-4 flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Learn More <FaArrowRight className="ml-2" />
        </button>
      </motion.div>
    ))}
  </div>

</section>


<section className="h-screen flex flex-col justify-center items-center bg-green-50 px-10 relative overflow-hidden">
      
      {/* Large Motivational Text */}
      <div className="text-center max-w-4xl mb-10">
        <h2 className="text-5xl font-bold text-green-800 leading-tight">
        How Empathy AI is Transforming Lives
        </h2>
      </div>

      {/* Scrolling Testimonials */}
      <div className="w-full overflow-hidden relative">
        <motion.div
          className="flex space-x-6"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 text-center min-w-[300px] transform hover:scale-105 transition-all duration-300"
            >
              <FaQuoteLeft className="text-green-400 text-2xl inline-block mb-2" />
              <p className="text-lg italic text-gray-700">{testimonial.quote}</p>
              <FaQuoteRight className="text-green-400 text-2xl inline-block mt-2" />
              <h3 className="text-xl font-semibold mt-4 text-green-700">– {testimonial.name}</h3>
            </div>
          ))}
        </motion.div>
      </div>

    </section>


      {/* Call-to-Action Buttons */}
      <section className="h-screen flex flex-col justify-center items-center bg-purple-50 px-10">
        <h2 className="text-5xl font-bold mb-6">Get Started with Empathy AI</h2>
        <div className="flex gap-4">
          <motion.button
            className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-purple-500"
            whileHover={{ scale: 1.1 }}
            onClick={handleGetStarted}
          >
            Get Started
          </motion.button>

          <motion.button
            className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-500"
            whileHover={{ scale: 1.1 }}
            onClick={handleFeedback}
          >
            Give Feedback
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Home;
