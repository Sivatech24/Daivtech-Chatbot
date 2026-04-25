import React, { useRef, useEffect } from 'react';
import { Paperclip, Mic, Send } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

const ChatInput: React.FC = () => {
  const { input, setInput, addMessage, currentModel } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      addMessage(input, 'user');
      setInput('');
      
      // Simulate bot response
      setTimeout(() => {
        addMessage(`Hello! I'm ${currentModel}, your intelligent assistant. How can I help you today?`, 'assistant');
      }, 1000);
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
      <div className="chat-input-wrapper glass">
        <button className="input-icon-btn">
          <Paperclip size={20} />
        </button>
        
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          placeholder={`Message ${currentModel}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          rows={1}
        />

        <div className="input-right-actions">
          <button className="input-icon-btn">
            <Mic size={20} />
          </button>
          <button 
            className={`send-btn ${input.trim() ? 'active' : ''}`}
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
      <div className="input-footer">
        <p className="disclaimer">
          Press Enter to send, Shift+Enter for new line | {input.length} / 4000
        </p>
        <p className="disclaimer mt-1">
          AI can make mistakes. Consider checking important information.
        </p>
      </div>

      <style>{`
        .chat-input-container {
          padding: 20px;
          max-width: 840px;
          margin: 0 auto;
          width: 100%;
          position: sticky;
          bottom: 0;
          background: linear-gradient(to top, var(--bg-color) 80%, transparent);
          z-index: 10;
        }

        .chat-input-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          padding: 12px 16px;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          background-color: var(--sidebar-bg);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .chat-input-wrapper:focus-within {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
        }

        .chat-textarea {
          flex: 1;
          border: none;
          background: transparent;
          color: var(--text-primary);
          font-size: 15px;
          line-height: 1.5;
          padding: 8px 0;
          resize: none;
          outline: none;
          max-height: 200px;
        }

        .input-right-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 4px;
        }

        .input-icon-btn {
          color: var(--text-secondary);
          padding: 8px;
          border-radius: 10px;
          transition: background-color 0.2s, color 0.2s;
        }

        .input-icon-btn:hover {
          background-color: var(--hover-bg);
          color: var(--text-primary);
        }

        .send-btn {
          background-color: var(--border-color);
          color: var(--text-secondary);
          padding: 8px;
          border-radius: 10px;
          transition: all 0.2s;
        }

        .send-btn.active {
          background-color: var(--primary-color);
          color: white;
          box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);
        }

        .input-footer {
          margin-top: 12px;
          text-align: center;
        }

        .disclaimer {
          font-size: 11px;
          color: var(--text-secondary);
          letter-spacing: 0.02em;
        }

        .mt-1 {
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
};

export default ChatInput;
