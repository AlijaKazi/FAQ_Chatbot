import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages, onFeedback }) {
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map(msg => (
        <MessageBubble key={msg.id} msg={msg} onFeedback={(fb) => onFeedback(msg.id, fb)} />
      ))}
      <div ref={endRef} />
    </div>
  );
}
