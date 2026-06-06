import { useEffect, useId, useRef, useState } from 'react';
import Skeleton from '../Skeleton/Skeleton.jsx';
import './ChatBox.less';
import { CHATBOX_TEXT } from '../../utils/constants';

export default function ChatBox({ messages, onSend, loading, disabled }) {
  const [question, setQuestion] = useState('');
  const listRef = useRef(null);
  const inputId = useId();

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || loading || disabled) return;

    onSend(trimmed);
    setQuestion('');
  };

  // Intercept Enter key presses on the input bar (excluding shift + enter breaks)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <section className="chat-box" aria-labelledby="chat-heading">
      
      {/* 1. SCROLLABLE CONVERSATIONAL CONTAINER VIEWPORT */}
      <div ref={listRef} className="chat-box__messages" role="log">
        {messages.length === 0 && !loading && (
          <div className="chat-box__empty-state">
            <span className="chat-box__empty-icon" aria-hidden="true">💡</span>
            <p className="chat-box__empty-text">{CHATBOX_TEXT.empty}</p>
          </div>
        )}

        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`chat-box__bubble chat-box__bubble--${msg.role}`}
            >
              <div className="chat-box__bubble-header">
                <span className="chat-box__avatar-marker" aria-hidden="true">
                  {isUser ? '' : '🤖'}
                </span>
                <span className="chat-box__role">
                  {isUser ? '' : CHATBOX_TEXT.coachLabel}
                </span>
              </div>

              <div className="chat-box__message-body">
                {/* Properly formats long text variables into spaced out readable text blocks */}
                {msg.text.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="chat-box__message-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="chat-box__loading">
            <div className="chat-box__bubble chat-box__bubble--coach chat-box__bubble--skeleton">
              <div className="chat-box__bubble-header">
                <span className="chat-box__avatar-marker">🤖</span>
                <span className="chat-box__role">{CHATBOX_TEXT.coachLabel}</span>
              </div>
              <Skeleton type="card" />
            </div>
          </div>
        )}
      </div>

      {/* 2. SLICK CONTROLLER INPUT HUB BAR */}
      <form className="chat-box__form" onSubmit={handleSubmit}>
        <div className="chat-box__input-wrapper">
          <input
            id={inputId}
            className="chat-box__input"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={disabled ? "Analysis processing..." : CHATBOX_TEXT.placeholder}
            disabled={disabled || loading}
            maxLength={800}
            autoComplete="off"
          />
          
          <button
            type="submit"
            className="chat-box__button"
            disabled={disabled || loading || !question.trim()}
            aria-label={CHATBOX_TEXT.send}
          >
            <svg 
              className="chat-box__send-svg"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </form>

    </section>
  );
}