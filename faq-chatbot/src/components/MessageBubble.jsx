import React from 'react';

export default function MessageBubble({ msg, onFeedback }) {
  const isUser = msg.sender === 'user';
  return (
    <div className={isUser ? 'bubble-row user' : 'bubble-row bot'}>
      <div className={isUser ? 'bubble user-bubble' : 'bubble bot-bubble'}>
        <div className="bubble-text">{msg.text}</div>
      </div>
      {!isUser && (
        <div className="feedback">
          <span className="feedback-label">Was this helpful?</span>
          <button onClick={() => onFeedback('helpful')}>👍</button>
          <button onClick={() => onFeedback('not_helpful')}>👎</button>
        </div>
      )}
    </div>
  );
}
