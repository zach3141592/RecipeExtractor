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
        <div className="header-content">
          <img src="/logo.png" alt="Hands Logo" className="header-logo" />
          <span className="header-title">Hands</span>
        </div>
      </div>
      
      <div className="content">
        {/* Recent Recipes Section */}
        <div className="recent-recipes-section">
          <div className="section-header">
            <h2>Recent Recipes</h2>
            <button className="view-all-btn" onClick={() => router.push('/recipes')}>
              View All
            </button>
          </div>
          
          <div className="recipes-scroll-container">
            <div className="recipes-horizontal-scroll">
              {/* Mock recent recipes */}
              <div className="recipe-card">
                <div className="recipe-image">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <div className="recipe-info">
                  <h4>Example</h4>
                  <p>25 mins</p>
                </div>
              </div>

              <div className="recipe-card">
                <div className="recipe-image">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <div className="recipe-info">
                  <h4>Example</h4>
                  <p>30 mins</p>
                </div>
              </div>

              <div className="recipe-card">
                <div className="recipe-image">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <div className="recipe-info">
                  <h4>Example</h4>
                  <p>15 mins</p>
                </div>
              </div>

              <div className="recipe-card">
                <div className="recipe-image">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <div className="recipe-info">
                  <h4>Example</h4>
                  <p>60 mins</p>
                </div>
              </div>

              <div className="recipe-card">
                <div className="recipe-image">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <div className="recipe-info">
                  <h4>Example</h4>
                  <p>20 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="selection-cards">
          <div className="card" onClick={handleURLInput}>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>
              </svg>
            </div>
            <h3>Upload From URL</h3>
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
            <h3>Upload From Image</h3>
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
          padding-bottom: 100px; /* Account for bottom tab bar */
          background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
          max-width: 428px; /* iPhone 14 Pro Max width */
          margin: 0 auto;
          position: relative;
        }

        .header {
          background: #000000;
          color: white;
          padding: max(54px, env(safe-area-inset-top)) 20px 16px;
          position: relative;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-logo {
          width: 28px;
          height: 28px;
        }

        .header-title {
          font-size: 1.3rem;
          font-weight: 400;
          color: white;
          letter-spacing: -0.02em;
        }

        .content {
          max-width: 100%;
          margin: 0 auto;
          padding: 48px 20px 32px;
        }

        /* Recent Recipes Section */
        .recent-recipes-section {
          margin-bottom: 32px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding: 0 4px;
        }

        .section-header h2 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1d1d1f;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .view-all-btn {
          background: none;
          border: none;
          color: #007aff;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .view-all-btn:hover {
          background: rgba(0, 122, 255, 0.08);
        }

        .view-all-btn:active {
          background: rgba(0, 122, 255, 0.15);
          transform: scale(0.95);
        }

        .recipes-scroll-container {
          position: relative;
          margin: 0 -20px; /* Extend to screen edges */
        }

        .recipes-horizontal-scroll {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding: 0 20px;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
        }

        .recipes-horizontal-scroll::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }

        .recipe-card {
          flex: 0 0 auto;
          width: 118px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(30px);
          border-radius: 16px;
          padding: 14px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border: 0.5px solid rgba(0, 0, 0, 0.06);
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.04),
            0 1px 3px rgba(0, 0, 0, 0.02);
        }

        .recipe-card:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 8px 30px rgba(0, 0, 0, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .recipe-card:active {
          transform: translateY(0px) scale(0.97);
        }

        .recipe-image {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #007aff 0%, #0056b3 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px;
          color: white;
        }

        .recipe-image svg {
          width: 24px;
          height: 24px;
        }

        .recipe-info {
          text-align: center;
        }

        .recipe-info h4 {
          font-size: 0.8rem;
          font-weight: 600;
          color: #1d1d1f;
          margin: 0 0 3px 0;
          line-height: 1.2;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .recipe-info p {
          font-size: 0.7rem;
          color: #6d6d70;
          margin: 0;
          font-weight: 400;
        }

        .selection-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 48px;
        }

        .card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(30px);
          border-radius: 20px;
          padding: 32px 24px;
          border: 0.5px solid rgba(0, 0, 0, 0.08);
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.06),
            0 1px 3px rgba(0, 0, 0, 0.02);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          /* Better mobile touch interaction */
          -webkit-tap-highlight-color: rgba(0, 122, 255, 0.1);
          touch-action: manipulation;
          /* Ensure minimum touch target size */
          min-height: 140px;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 122, 255, 0.04) 0%, rgba(88, 86, 214, 0.04) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .card:hover::before {
          opacity: 1;
        }

        .card:active {
          transform: translateY(-2px) scale(0.98);
        }

        .card-icon {
          width: 52px;
          height: 52px;
          margin: 0 auto 20px;
          color: #007aff;
          position: relative;
          z-index: 1;
        }

        .card-icon svg {
          width: 100%;
          height: 100%;
          stroke-width: 1.5;
        }

        .card h3 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1d1d1f;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
          line-height: 1.3;
        }

        .card p {
          font-size: 0.95rem;
          color: #6d6d70;
          line-height: 1.5;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
          font-weight: 400;
        }

        .card-arrow {
          width: 20px;
          height: 20px;
          color: #007aff;
          margin: 0 auto;
          opacity: 0.7;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .card:hover .card-arrow {
          opacity: 1;
          transform: translateX(3px);
        }

        .footer {
          text-align: center;
        }

        .features {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .feature {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          border: 0.5px solid rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(10px);
        }

        .feature span {
          font-size: 0.8rem;
          color: #6d6d70;
          font-weight: 500;
        }

        @media (max-width: 428px) {
          .header {
            padding: max(54px, env(safe-area-inset-top)) 16px 14px;
          }

          .header-logo {
            width: 26px;
            height: 26px;
          }

          .header-title {
            font-size: 1.2rem;
          }

          .content {
            padding: 36px 18px 24px;
          }

          .section-header h2 {
            font-size: 1.2rem;
          }

          .view-all-btn {
            font-size: 0.85rem;
          }

          .recipes-scroll-container {
            margin: 0 -18px;
          }

          .recipes-horizontal-scroll {
            padding: 0 18px;
            gap: 14px;
          }

          .recipe-card {
            width: 110px;
            padding: 12px;
          }

          .recipe-image {
            width: 48px;
            height: 48px;
            margin-bottom: 8px;
          }

          .recipe-image svg {
            width: 22px;
            height: 22px;
          }

          .recipe-info h4 {
            font-size: 0.75rem;
          }

          .recipe-info p {
            font-size: 0.65rem;
          }

          .selection-cards {
            gap: 14px;
            margin-bottom: 36px;
          }

          .card {
            padding: 28px 22px;
            border-radius: 18px;
            min-height: 130px;
          }

          .card h3 {
            font-size: 1.25rem;
            margin-bottom: 6px;
          }

          .card p {
            font-size: 0.9rem;
            line-height: 1.4;
            margin-bottom: 18px;
          }

          .card-icon {
            width: 48px;
            height: 48px;
            margin-bottom: 16px;
          }

          .features {
            gap: 8px;
          }

          .feature {
            padding: 6px 12px;
            border-radius: 12px;
          }

          .feature span {
            font-size: 0.75rem;
          }
        }

        /* Smaller iPhones */
        @media (max-width: 375px) {
          .header {
            padding: max(50px, env(safe-area-inset-top)) 14px 12px;
          }

          .header-logo {
            width: 24px;
            height: 24px;
          }

          .header-title {
            font-size: 1.1rem;
          }

          .content {
            padding: 28px 16px 20px;
          }

          .section-header h2 {
            font-size: 1.1rem;
          }

          .view-all-btn {
            font-size: 0.8rem;
          }

          .recipes-scroll-container {
            margin: 0 -16px;
          }

          .recipes-horizontal-scroll {
            padding: 0 16px;
            gap: 12px;
          }

          .recipe-card {
            width: 106px;
            padding: 10px;
          }

          .recipe-image {
            width: 44px;
            height: 44px;
            margin-bottom: 6px;
          }

          .recipe-image svg {
            width: 20px;
            height: 20px;
          }

          .recipe-info h4 {
            font-size: 0.7rem;
          }

          .recipe-info p {
            font-size: 0.6rem;
          }

          .card {
            padding: 24px 18px;
            border-radius: 16px;
          }

          .card h3 {
            font-size: 1.2rem;
          }

          .card p {
            font-size: 0.85rem;
            margin-bottom: 16px;
          }

          .card-icon {
            width: 44px;
            height: 44px;
            margin-bottom: 14px;
          }

          .features {
            gap: 6px;
          }

          .feature {
            padding: 5px 10px;
          }

          .feature span {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
} 