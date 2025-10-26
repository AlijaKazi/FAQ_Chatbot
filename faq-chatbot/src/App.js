import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import SampleQuestions from './components/samplequestions';

export default function App() {
  const [chatHistory, updateChatHistory] = useState([]);
  const [input, setInput] = useState('');
  const [msgId, setMsgId] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showSamples, setShowSamples] = useState(true);

  const sendMessage = async (text) => {
  if (!hasStarted) setHasStarted(true);
  setShowSamples(false);

  const userMsg = { id: msgId, sender: 'user', text };
  updateChatHistory(prev => [...prev, userMsg]);
  setMsgId(prev => prev + 1);

  try {
  const res = await axios.post('http://localhost:5000/chat', { message: text });
  const botMsg = { id: msgId + 1, sender: 'bot', text: res.data.response };
  updateChatHistory(prev => [...prev, botMsg]);
  setMsgId(prev => prev + 1);
} catch (e) {
  const errorMsg = { id: msgId + 1, sender: 'bot', text: 'Sorry, I am having trouble answering.' };
  updateChatHistory(prev => [...prev, errorMsg]);
  setMsgId(prev => prev + 1);
}

};


  const handleFeedback = (id, feedback) => {
    console.log(`Feedback for message ${id}: ${feedback}`);
  };

  const resetChat = () => {
    updateChatHistory([]); // Clear chat without setMessages
    setInput('');
    setMsgId(1);
    setHasStarted(false);
    setShowSamples(true);
  };

  return (
    <div className="layout">
      <main className="app">
        <Navbar
          showChat={showChat}
          setShowChat={(val) => {
            setShowChat(val);
            if (val) resetChat(); // Reset when chat is reopened
          }}
          resetChat={resetChat}
        />

        {!showChat ? (
          <section className="intro">
            <div className="intro-hero">
              <h1>Welcome to AskBuddy</h1>
              <h2>Your 24/7 FAQ Assistant</h2>
              <p>
                Say goodbye to long wait times and endless help articles. Our AI-powered chatbot delivers instant, accurate answers to your most common questions anytime, anywhere.
              </p>
            </div>

            <div className="intro-grid">
              {[
                { icon: '💡', title: 'Ask Anything', desc: 'From order tracking to account help, just type your question and get an instant response.' },
                { icon: '⚡', title: 'Fast & Reliable', desc: 'No more waiting for support tickets. Get answers in seconds, powered by AI.' },
                { icon: '🌐', title: 'Always Available', desc: 'Whether it’s midnight or Monday morning, your assistant is ready to help.' },
                { icon: '🔒', title: 'Secure & Private', desc: 'Your data is safe. We never store personal information or require login.' },
                { icon: '📈', title: 'Smarter Every Day', desc: 'The more you ask, the better it gets. Our chatbot learns and improves over time.' },
                { icon: '🎯', title: 'Built for You', desc: 'Designed to simplify your experience and help you find what you need—fast.' }
              ].map((item, i) => (
                <div className="intro-card" key={i}>
                  <div className="intro-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>

           <div className="intro-extra">
  <h2 className="extra-title">Why Use This Chatbot?</h2>
  <div className="feature-scroll-wrapper">
    <div className="feature-scroll">
      {[...Array(2)].map((_, repeatIndex) => (
        <div className="feature-track" key={repeatIndex}>
          {[
            { icon: '⚡', text: 'Instant answers, no waiting' },
            { icon: '🔐', text: 'No login or account needed' },
            { icon: '🤖', text: 'Friendly, human-like responses' },
            { icon: '📱', text: 'Works on desktop and mobile' },
            { icon: '🧠', text: 'Learns and improves over time' },
            { icon: '🎯', text: 'Built for your needs' }
          ].map((item, i) => (
            <div className="feature-card" key={`${repeatIndex}-${i}`}>
              <span className="feature-icon">{item.icon}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
</div>

            <div className="intro-cta">
              <span>💬</span>
              <p>
                Ready to get started? Click <strong>“Try It Out”</strong> above and ask your first question.
              </p>
            </div>
          </section>
        ) : (
          <section className="chat-container fade-in">
            {!hasStarted && showSamples && (
              <div className="chat-intro">
                <SampleQuestions onSelect={sendMessage} />
              </div>
            )}
            <ChatWindow messages={chatHistory} onFeedback={handleFeedback} />
            <InputBar input={input} setInput={setInput} sendMessage={sendMessage} />
          </section>
        )}
      </main>
    </div>
  );
}
