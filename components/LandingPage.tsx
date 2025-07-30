import React from 'react';
import { useRouter } from 'next/router';

export default function LandingPage() {
  const router = useRouter();

  const handleURLInput = () => {
    router.push('/extract-url');
  };

  const handleImageInput = () => {
    router.push('/extract-image');
  };

  return (
    <div className="landing-container">
      <div className="header">
        <h1>Hands</h1>
        <p>Extract recipes from anywhere</p>
      </div>
      
      <div className="content">

        <div className="selection-cards">
          <div className="card" onClick={handleURLInput}>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>
              </svg>
            </div>
            <h3>From URL</h3>
            <p>Extract recipes from websites or YouTube videos</p>
            <div className="card-arrow">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>

          <div className="card" onClick={handleImageInput}>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
              </svg>
            </div>
            <h3>From Image</h3>
            <p>Upload a photo of a recipe to extract text</p>
            <div className="card-arrow">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="features">
            <div className="feature">
              <span>AI-Powered</span>
            </div>
            <div className="feature">
              <span>PDF Export</span>
            </div>
            <div className="feature">
              <span>Clean Formatting</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .landing-container {
          min-height: 100vh;
          padding-top: 64px; /* Account for fixed navbar */
          background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
        }

        .header {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #333333 100%);
          color: white;
          padding: 60px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .header h1 {
          font-size: 4rem;
          margin-bottom: 16px;
          font-weight: 200;
          letter-spacing: -0.05em;
          position: relative;
          z-index: 1;
        }

        .header p {
          font-size: 1.5rem;
          opacity: 0.9;
          font-weight: 300;
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 40px;
        }

        .selection-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          margin-bottom: 80px;
        }

        .card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 48px 32px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 1px 4px rgba(0, 0, 0, 0.04);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 
            0 16px 48px rgba(0, 0, 0, 0.12),
            0 4px 16px rgba(0, 0, 0, 0.08);
        }

        .card:hover::before {
          opacity: 1;
        }

        .card-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 24px;
          color: #6366f1;
          position: relative;
          z-index: 1;
        }

        .card-icon svg {
          width: 100%;
          height: 100%;
        }

        .card h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }

        .card p {
          font-size: 1rem;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .card-arrow {
          width: 24px;
          height: 24px;
          color: #6366f1;
          margin: 0 auto;
          opacity: 0.6;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .card:hover .card-arrow {
          opacity: 1;
          transform: translateX(4px);
        }

        .footer {
          text-align: center;
        }

        .features {
          display: flex;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
        }

        .feature {
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .feature span {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .landing-container {
            padding-top: 56px; /* Smaller navbar on mobile */
          }

          .header {
            padding: 40px 24px;
          }

          .header h1 {
            font-size: 2.5rem;
          }

          .header p {
            font-size: 1.2rem;
          }

          .content {
            padding: 60px 24px;
          }

          .selection-cards {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 60px;
          }

          .card {
            padding: 36px 24px;
          }

          .features {
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .header h1 {
            font-size: 2rem;
          }

          .content {
            padding: 40px 20px;
          }

          .card {
            padding: 28px 20px;
          }
        }
      `}</style>
    </div>
  );
} 