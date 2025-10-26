import React from 'react';
import logo from '../assets/logo.jpg'; 

export default function Navbar({ showChat, setShowChat, resetChat }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Chatbot Logo" className="navbar-logo" />
        <h2 className="chatbot-title">AskBuddy</h2>
      </div>
      <div className="navbar-buttons">
        {!showChat ? (
          <button className="nav-button" onClick={() => {setShowChat(true);resetChat(true)}}>Try It Out</button>
        ) : (
          <>
            <button className="nav-button" onClick={() => setShowChat(false)}>Back</button>
            <button className="nav-button" onClick={resetChat}>New Chat</button>
          </>
        )}
      </div>
    </nav>
  );
}
