import React from 'react';
import { Bot, User, Edit3, Trash2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import ChatInput from './components/ChatInput';
import Modal from './components/Modal';
import { useChatStore } from './store/useChatStore';

const App: React.FC = () => {
  const { chats, activeChatId, setModal, isSidebarOpen } = useChatStore();

  const activeChat = chats.find(c => c.id === activeChatId);
  const messages = activeChat?.messages || [];

  return (
    <div className="app-container">
      <Sidebar />
      
      <div className={`main-wrapper ${isSidebarOpen ? 'shifted' : ''}`}>
        <Navbar />
        
        <main className="main-content">
          {messages.length === 0 ? (
            <Home />
          ) : (
            <div className="chat-history-view">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-row-full ${msg.role}`}>
                  <div className="message-container-inner">
                    <div className="avatar-wrapper">
                      {msg.role === 'assistant' ? (
                        <div className="bot-avatar"><Bot size={18} /></div>
                      ) : (
                        <div className="user-avatar-circle"><User size={18} /></div>
                      )}
                    </div>
                    <div className="message-content-wrapper">
                      <div className="message-header-info">
                        <span className="sender-name">
                          {msg.role === 'assistant' ? 'Neural Nexus' : 'You'}
                        </span>
                        <span className="timestamp">{msg.timestamp}</span>
                      </div>
                      <div className="message-bubble-full">
                        {msg.content}
                      </div>
                    </div>
                    
                    {msg.role === 'user' && (
                      <div className="message-hover-actions">
                        <button className="msg-action-btn" onClick={() => setModal('edit-message', msg)}>
                          <Edit3 size={14} />
                        </button>
                        <button className="msg-action-btn" onClick={() => setModal('delete-message', msg)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <ChatInput />
      </div>

      <Modal />

      <style>{`
        .app-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          background-color: var(--bg-color);
          overflow: hidden;
        }

        .main-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100vh;
          transition: all 0.3s ease;
          position: relative;
        }

        .main-content {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .chat-history-view {
          flex: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .message-row-full {
          width: 100%;
          padding: 24px 0;
          transition: background-color 0.2s;
        }

        .message-row-full:hover {
          background-color: var(--sidebar-bg);
        }

        .message-container-inner {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          gap: 16px;
          position: relative;
        }

        .avatar-wrapper {
          flex-shrink: 0;
        }

        .bot-avatar {
          width: 32px;
          height: 32px;
          background-color: #10b981;
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-avatar-circle {
          width: 32px;
          height: 32px;
          background-color: var(--border-color);
          color: var(--text-secondary);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .message-content-wrapper {
          flex: 1;
          min-width: 0;
        }

        .message-header-info {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .sender-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .timestamp {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .message-bubble-full {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-primary);
          white-space: pre-wrap;
          word-break: break-word;
        }

        .message-hover-actions {
          position: absolute;
          top: 0;
          right: 20px;
          display: none;
          gap: 4px;
          background-color: var(--bg-color);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 4px;
          box-shadow: var(--shadow-sm);
        }

        .message-row-full:hover .message-hover-actions {
          display: flex;
        }

        .msg-action-btn {
          padding: 6px;
          color: var(--text-secondary);
          border-radius: 4px;
        }

        .msg-action-btn:hover {
          background-color: var(--hover-bg);
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .sidebar.open {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
          }
          
          .main-wrapper.shifted {
            opacity: 0.5;
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
