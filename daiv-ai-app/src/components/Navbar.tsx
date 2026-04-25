import React from 'react';
import { Menu, ChevronDown, Zap } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

const Navbar: React.FC = () => {
  const toggleSidebar = useChatStore((state) => state.toggleSidebar);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="icon-btn" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        <div className="model-selector">
          <div className="model-icon">
            <Zap size={16} fill="white" color="white" />
          </div>
          <span className="model-name">Neural Nexus</span>
          <ChevronDown size={16} className="chevron" />
        </div>
      </div>
      
      <style>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          height: 60px;
          background: transparent;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 8px;
          color: var(--text-secondary);
        }

        .icon-btn:hover {
          background-color: var(--hover-bg);
          color: var(--text-primary);
        }

        .model-selector {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background-color: var(--sidebar-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .model-selector:hover {
          background-color: var(--hover-bg);
        }

        .model-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background-color: var(--primary-color);
          border-radius: 6px;
        }

        .model-name {
          font-weight: 500;
          font-size: 14px;
          color: var(--text-primary);
        }

        .chevron {
          color: var(--text-secondary);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
