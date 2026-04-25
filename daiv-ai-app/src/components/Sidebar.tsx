import React, { useState, useRef, useEffect } from 'react';
import { Plus, MessageSquare, Edit3, Trash2, X, MoreHorizontal, Sparkles, Settings, LogOut, User, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from '../store/useChatStore';

const Sidebar: React.FC = () => {
  const { 
    chats, 
    activeChatId, 
    setActiveChat, 
    createNewChat, 
    renameChat, 
    setModal, 
    isSidebarOpen, 
    toggleSidebar 
  } = useChatStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRename = (id: string) => {
    renameChat(id, editValue);
    setEditingId(null);
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.aside 
          className="sidebar"
          initial={{ x: -260 }}
          animate={{ x: 0 }}
          exit={{ x: -260 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        >
          <div className="sidebar-header">
            <div className="logo-group">
              <h2 className="brand-name"><span className="brand-accent-green">Daiv</span><span className="brand-accent-black">AI</span></h2>
            </div>
            <button className="icon-btn close-btn" onClick={toggleSidebar}>
              <X size={20} />
            </button>
          </div>

          <button className="new-chat-btn" onClick={createNewChat}>
            <Plus size={20} />
            <span>New Chat</span>
          </button>

          <div className="sidebar-divider" />

          <div className="chats-container">
            <div className="section-title">TODAY</div>
            <div className="chat-list">
              {chats.map((chat) => (
                <div 
                  key={chat.id} 
                  className={`chat-item-box ${activeChatId === chat.id ? 'active' : ''}`}
                  onClick={() => setActiveChat(chat.id)}
                >
                  <div className="chat-item-header">
                    <MessageSquare size={16} className="chat-icon" />
                    {editingId === chat.id ? (
                      <input
                        className="rename-input"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => handleRename(chat.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRename(chat.id);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span className="chat-title">{chat.title}</span>
                    )}
                  </div>
                  
                  <div className="chat-item-footer">
                    <span className="chat-date">Today</span>
                    <div className="chat-actions">
                      <button 
                        className="action-btn-small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(chat.id);
                          setEditValue(chat.title);
                        }}
                      >
                        <Edit3 size={12} />
                      </button>
                      <button 
                        className="action-btn-small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModal('delete-chat', { id: chat.id, title: chat.title });
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-footer" ref={profileMenuRef}>
            <button 
              className={`user-profile ${profileMenuOpen ? 'active' : ''}`}
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              <div className="user-avatar">U</div>
              <div className="user-info">
                <span className="user-name">User</span>
                <span className="user-email">user@daivai.com</span>
              </div>
              <MoreHorizontal size={18} className="more-icon" />
            </button>

            <AnimatePresence>
              {profileMenuOpen && (
                <motion.div 
                  className="profile-popup glass"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <button className="popup-item">
                    <User size={18} />
                    <span>My Account</span>
                  </button>
                  <div className="popup-divider" />
                  <button className="popup-item highlight-green">
                    <Sparkles size={18} />
                    <span>Upgrade Plan</span>
                  </button>
                  <div className="popup-divider" />
                  <button className="popup-item">
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>
                  <div className="popup-divider" />
                  <button className="popup-item">
                    <HelpCircle size={18} />
                    <span>Help & Support</span>
                  </button>
                  <div className="popup-divider" />
                  <button className="popup-item logout">
                    <LogOut size={18} />
                    <span>Log out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.aside>
      )}

      <style>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          background-color: #f9fafb;
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 100;
        }

        .sidebar-header {
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-name {
          font-size: 20px;
          font-weight: 700;
        }

        .brand-accent-green {
          color: var(--primary-color);
        }

        .brand-accent-black {
          color: var(--text-primary);
        }

        .close-btn {
          color: var(--text-secondary);
        }

        .new-chat-btn {
          margin: 16px;
          padding: 12px;
          background-color: var(--primary-color);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 600;
          box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);
        }

        .new-chat-btn:hover {
          background-color: #059669;
          transform: translateY(-1px);
        }

        .chats-container {
          flex: 1;
          overflow-y: auto;
          padding: 0 12px;
        }

        .section-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          margin: 20px 8px 8px;
          letter-spacing: 0.05em;
        }

        .chat-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .chat-item-box {
          display: flex;
          flex-direction: column;
          padding: 2px 8px;
          border-radius: 8px;
          cursor: pointer;
          gap: 0px;
          border: 1px solid transparent;
          transition: all 0.2s;
          background-color: transparent;
        }

        .chat-item-box:hover {
          background-color: var(--hover-bg);
          border-color: var(--border-color);
        }

        .chat-item-box.active {
          background-color: white;
          border-color: #10b981;
          box-shadow: 0 2px 4px rgba(16, 185, 129, 0.05);
        }

        .chat-item-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .chat-icon {
          flex-shrink: 0;
          color: var(--text-secondary);
        }

        .chat-item-box.active .chat-icon {
          color: var(--primary-color);
        }

        .chat-title {
          flex: 1;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .chat-item-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 26px;
        }

        .chat-date {
          font-size: 10px;
          color: #9ca3af;
        }

        .action-btn-small {
          padding: 4px;
          border-radius: 4px;
          color: var(--text-secondary);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .chat-item-box:hover .action-btn-small {
          opacity: 1;
        }

        .action-btn-small:hover {
          background-color: rgba(0, 0, 0, 0.05);
          color: var(--text-primary);
        }

        .rename-input {
          flex: 1;
          background: transparent;
          border: none;
          color: inherit;
          font-size: 14px;
          padding: 0;
        }

        .chat-actions {
          display: flex;
          gap: 2px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .chat-item:hover .chat-actions {
          opacity: 1;
        }

        .action-btn {
          padding: 4px;
          border-radius: 4px;
          color: var(--text-secondary);
        }

        .action-btn:hover {
          background-color: rgba(0, 0, 0, 0.05);
          color: var(--text-primary);
        }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid var(--border-color);
          position: relative;
        }

        .user-profile {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 8px;
          border-radius: 12px;
          transition: background-color 0.2s;
        }

        .user-profile:hover, .user-profile.active {
          background-color: var(--hover-bg);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background-color: var(--primary-color);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .user-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 0px;
          min-width: 0;
          padding: 0;
          margin: 0;
        }

        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1;
          margin: 0;
          padding: 0;
          display: block;
        }

        .user-email {
          font-size: 11px;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          line-height: 1;
          margin: 0;
          padding: 0;
          display: block;
          text-align: left;
        }

        .more-icon {
          color: var(--text-secondary);
        }

        .profile-popup {
          position: absolute;
          bottom: 70px;
          left: 16px;
          right: 16px;
          background-color: white;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          z-index: 200;
        }

        .popup-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border-radius: 8px;
          font-size: 14px;
          color: var(--text-primary);
          transition: background-color 0.2s;
        }

        .popup-item:hover {
          background-color: var(--hover-bg);
        }

        .popup-item.highlight-green {
          color: var(--primary-color);
        }

        .popup-item.logout {
          color: #ef4444;
          margin-top: 4px;
        }

        .sidebar-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 0 16px;
        }

        .popup-divider {
          height: 1px;
          background-color: #f3f4f6;
          margin: 0;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default Sidebar;
