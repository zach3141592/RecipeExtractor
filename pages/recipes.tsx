import Head from 'next/head';
import Navigation from '../components/Navigation';

export default function Recipes() {
  return (
    <>
      <Head>
        <title>Hands - Your Recipes</title>
        <meta name="description" content="View and manage your extracted recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navigation />
      
      <div className="recipes-container">
        <div className="header">
          <h1>Your Recipes</h1>
          <p>Manage and browse your extracted recipes</p>
        </div>
        
        <div className="content">
          <div className="empty-state">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"/>
              </svg>
            </div>
            <h3>No recipes yet</h3>
            <p>Start extracting recipes from URLs or images to see them here.</p>
            <div className="action-buttons">
              <a href="/extract-url" className="action-btn">
                <span className="btn-icon">🔗</span>
                <span>Extract from URL</span>
              </a>
              <a href="/extract-image" className="action-btn">
                <span className="btn-icon">📷</span>
                <span>Extract from Image</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .recipes-container {
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

        .empty-state {
          text-align: center;
          max-width: 500px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 60px 40px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 1px 4px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 32px;
          color: #666666;
        }

        .empty-icon svg {
          width: 100%;
          height: 100%;
        }

        .empty-state h3 {
          font-size: 2rem;
          font-weight: 600;
          color: #000000;
          margin-bottom: 16px;
        }

        .empty-state p {
          font-size: 1.1rem;
          color: #666666;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .action-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 24px;
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
          color: white;
          text-decoration: none;
          border-radius: 16px;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .action-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.2),
            0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .action-btn:hover::before {
          opacity: 1;
        }

        .btn-icon {
          font-size: 1.2rem;
          position: relative;
          z-index: 1;
        }

        .action-btn span:last-child {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .recipes-container {
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

          .empty-state {
            padding: 40px 24px;
          }

          .action-buttons {
            flex-direction: column;
            align-items: center;
          }

          .action-btn {
            width: 100%;
            max-width: 200px;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .header h1 {
            font-size: 2rem;
          }

          .content {
            padding: 40px 20px;
          }

          .empty-state {
            padding: 32px 20px;
          }
        }
      `}</style>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #000000;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
} 