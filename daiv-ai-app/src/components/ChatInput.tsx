import React, { useRef, useEffect } from 'react';
import { Paperclip, Mic, SendHorizonal } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

const ChatInput: React.FC = () => {
  const { input, setInput, addMessage } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      addMessage(input, 'user');
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="chat-input-container">
      <div className="input-wrapper">
        <button className="input-action-btn">
          <Paperclip size={20} />
        </button>
        
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          placeholder="Message Neural Nexus..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />

        <div className="input-right-actions">
          <button className="input-action-btn">
            <Mic size={20} />
          </button>
          <button 
            className={`send-btn ${input.trim() ? 'active' : ''}`}
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <SendHorizonal size={20} />
          </button>
        </div>
      </div>
      
      <p className="disclaimer">
        AI can make mistakes. Consider checking important information.
      </p>

      <style>{`
        .chat-input-container {
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          background: transparent;
        }

        .input-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          padding: 12px 16px;
          background-color: var(--input-bg);
          border-radius: 24px;
          width: 100%;
          max-width: 800px;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .input-wrapper:focus-within {
          background-color: var(--bg-color);
          border-color: var(--border-color);
          box-shadow: var(--shadow-md);
        }

        .chat-textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          padding: 8px 0;
          font-size: 15px;
          color: var(--text-primary);
          max-height: 200px;
          line-height: 1.5;
        }

        .input-right-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 4px;
        }

        .input-action-btn {
          color: var(--text-secondary);
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .input-action-btn:hover {
          background-color: var(--hover-bg);
          color: var(--text-primary);
        }

        .send-btn {
          background-color: #e5e7eb;
          color: #9ca3af;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .send-btn.active {
          background-color: var(--text-primary);
          color: white;
        }

        .disclaimer {
          font-size: 11px;
          color: var(--text-secondary);
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default ChatInput;
