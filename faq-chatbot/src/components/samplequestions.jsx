import React from 'react';

export default function SampleQuestions({ onSelect }) {
  const questions = [
    "What services do you offer?",
    "How much does it cost?",
    "How do I get started?",
    "Do you offer support?",
    "Do you work internationally?"
  ];

  return (
    <div className="sample-questions">
      <h2>How can I Help You?</h2>
      <div className="sample-questions-row">
        {questions.map((q, i) => (
          <button key={i} onClick={() => onSelect(q)} className="sample-btn">
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
