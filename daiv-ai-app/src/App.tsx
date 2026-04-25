import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ChatInput from './components/ChatInput';
import { useChatStore } from './store/useChatStore';

const App: React.FC = () => {
  const messages = useChatStore((state) => state.messages);

  return (
    <div className="app-wrapper">
      <Navbar />
      
      <main className="main-content">
        {messages.length === 0 ? (
          <Home />
        ) : (
          <div className="chat-history">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-row ${msg.role}`}>
                <div className="message-bubble">
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <ChatInput />

      <style>{`
        .app-wrapper {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          background-color: var(--bg-color);
        }

        .main-content {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .chat-history {
          flex: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
        }

        .message-row {
          display: flex;
          width: 100%;
        }

        .message-row.user {
          justify-content: flex-end;
        }

        .message-row.assistant {
          justify-content: flex-start;
        }

        .message-bubble {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 15px;
          line-height: 1.5;
        }

        .user .message-bubble {
          background-color: var(--input-bg);
          color: var(--text-primary);
          border-bottom-right-radius: 4px;
        }

        .assistant .message-bubble {
          background-color: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          border-bottom-left-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default App;
