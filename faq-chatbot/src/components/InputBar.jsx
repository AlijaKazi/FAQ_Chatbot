import React from 'react';

export default function InputBar({ input, setInput, sendMessage }) {
  const submit = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="input-bar">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKey}
        placeholder="Type your question... (Enter to send)"
      />
      <button onClick={submit}>Send</button>
    </div>
  );
}
