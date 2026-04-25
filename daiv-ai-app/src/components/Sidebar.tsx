import React, { useState, useRef, useEffect } from 'react';
import { Plus, MessageSquare, Edit3, Trash2, X, MoreHorizontal, User, Sparkles, Settings, HelpCircle, LogOut, Check } from 'lucide-react';
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
    <>
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-group">
            <h2 className="brand-name">Daiv<span className="brand-accent">AI</span></h2>
          </div>
          <button className="icon-btn close-btn" onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </div>

        <button className="new-chat-btn" onClick={createNewChat}>
          <Plus size={20} />
          <span>New Chat</span>
        </button>

        <div className="chat-history">
          <p className="history-label">Today</p>
          <div className="history-list">
            {chats.map((chat) => (
              <div 
                key={chat.id} 
                className={`history-item ${activeChatId === chat.id ? 'active' : ''}`}
                onClick={() => setActiveChat(chat.id)}
              >
                <MessageSquare size={18} className="item-icon" />
                
                {editingId === chat.id ? (
                  <div className="edit-input-wrapper">
                    <input 
                      autoFocus
                      className="edit-chat-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRename(chat.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="edit-actions">
                      <button className="confirm-btn" onClick={(e) => { e.stopPropagation(); handleRename(chat.id); }}>
                        <Check size={14} />
                      </button>
                      <button className="cancel-btn" onClick={(e) => { e.stopPropagation(); setEditingId(null); }}>
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="item-title">{chat.title}</span>
                    <div className="item-actions">
                      <button 
                        className="action-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(chat.id);
                          setEditValue(chat.title);
                        }}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        className="action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModal('delete-chat', chat);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="profile-container" ref={profileMenuRef}>
            <button 
              className="profile-btn"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              <div className="user-avatar">U</div>
              <div className="user-info">
                <span className="username">User</span>
                <span className="user-email">user@daivai.com</span>
              </div>
              <MoreHorizontal size={18} className="more-icon" />
            </button>

            {profileMenuOpen && (
              <div className="profile-menu glass">
                <button className="menu-item">
                  <User size={18} />
                  <span>My Account</span>
                </button>
                <button className="menu-item upgrade">
                  <Sparkles size={18} />
                  <span>Upgrade Plan</span>
                </button>
                <button className="menu-item">
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
                <button className="menu-item">
                  <HelpCircle size={18} />
                  <span>Help & Support</span>
                </button>
                <div className="menu-divider"></div>
                <button className="menu-item logout">
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .sidebar {
          width: 280px;
          background-color: var(--sidebar-bg);
          height: 100vh;
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--border-color);
          transition: transform 0.3s ease, margin-left 0.3s ease;
          position: relative;
          z-index: 50;
        }

        .sidebar.closed {
          margin-left: -280px;
        }

        .sidebar-header {
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-name {
          font-size: 20px;
          font-weight: 700;
          color: var(--primary-color);
        }

        .brand-accent {
          color: var(--text-primary);
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
          gap: 12px;
          font-weight: 600;
          font-size: 15px;
          transition: background-color 0.2s;
        }

        .new-chat-btn:hover {
          background-color: #059669;
        }

        .chat-history {
          flex: 1;
          overflow-y: auto;
          padding: 0 12px;
        }

        .history-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          margin: 20px 8px 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .history-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          color: var(--text-primary);
          transition: background-color 0.2s;
          margin-bottom: 4px;
          position: relative;
        }

        .history-item:hover {
          background-color: var(--hover-bg);
        }

        .history-item.active {
          background-color: var(--hover-bg);
          font-weight: 500;
        }

        .item-icon {
          color: var(--text-secondary);
          flex-shrink: 0;
        }

        .item-title {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
        }

        .item-actions {
          display: none;
          gap: 4px;
        }

        .history-item:hover .item-actions {
          display: flex;
        }

        .action-btn {
          padding: 4px;
          color: var(--text-secondary);
          border-radius: 4px;
        }

        .action-btn:hover {
          background-color: var(--border-color);
          color: var(--text-primary);
        }

        .edit-input-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
        }

        .edit-chat-input {
          flex: 1;
          background: var(--bg-color);
          border: 1px solid var(--primary-color);
          border-radius: 4px;
          padding: 2px 8px;
          font-size: 14px;
          width: 0;
        }

        .edit-actions {
          display: flex;
          gap: 4px;
        }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid var(--border-color);
        }

        .profile-container {
          position: relative;
        }

        .profile-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          border-radius: 12px;
          transition: background-color 0.2s;
        }

        .profile-btn:hover {
          background-color: var(--hover-bg);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background-color: var(--primary-color);
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }

        .user-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          overflow: hidden;
        }

        .username {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .user-email {
          font-size: 12px;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }

        .more-icon {
          color: var(--text-secondary);
        }

        .profile-menu {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 0;
          right: 0;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 8px;
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 14px;
          color: var(--text-primary);
          transition: background-color 0.2s;
        }

        .menu-item:hover {
          background-color: var(--hover-bg);
        }

        .menu-item.upgrade {
          color: var(--primary-color);
          font-weight: 500;
        }

        .menu-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 4px 8px;
        }

        .menu-item.logout {
          color: #ef4444;
        }

        .menu-item.logout:hover {
          background-color: #fef2f2;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
