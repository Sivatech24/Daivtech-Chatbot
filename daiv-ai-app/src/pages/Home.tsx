import React from 'react';
import { Zap } from 'lucide-react';
import ActionCard from '../components/ActionCard';
import { useChatStore } from '../store/useChatStore';

const Home: React.FC = () => {
  const setInput = useChatStore((state) => state.setInput);

  const actions = [
    { title: 'Code Help', description: 'Debug and write better code' },
    { title: 'Explanations', description: 'Understand complex topics' },
    { title: 'Creative Writing', description: 'Generate content and ideas' },
    { title: 'Problem Solving', description: 'Find solutions to challenges' },
  ];

  return (
    <div className="home-container fade-in">
      <div className="welcome-section">
        <div className="main-logo">
          <Zap size={48} fill="white" color="white" />
        </div>
        <h1 className="brand-name">
          Daiv<span className="brand-accent">AI</span>
        </h1>
        <p className="subtext">Ask me anything. I'm here to help.</p>
      </div>

      <div className="actions-grid">
        {actions.map((action, index) => (
          <ActionCard
            key={index}
            title={action.title}
            description={action.description}
            onClick={() => setInput(action.title)}
          />
        ))}
      </div>

      <style>{`
        .home-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
        }

        .welcome-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 40px;
        }

        .main-logo {
          width: 80px;
          height: 80px;
          background-color: var(--primary-color);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 0 40px var(--primary-glow);
        }

        .brand-name {
          font-size: 32px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .brand-accent {
          color: var(--text-primary);
        }

        .subtext {
          font-size: 16px;
          color: var(--text-secondary);
          text-align: center;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          width: 100%;
        }

        @media (max-width: 640px) {
          .actions-grid {
            grid-template-columns: 1fr;
          }
          
          .brand-name {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
