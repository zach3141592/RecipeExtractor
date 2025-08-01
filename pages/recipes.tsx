import Head from 'next/head';
import Navigation from '../components/Navigation';

export default function Recipes() {
  return (
    <>
      <Head>
        <title>Hands - Your Recipes</title>
        <meta name="description" content="View and manage your extracted recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navigation />
      
      <div className="recipes-container">
        <div className="header">
          <div className="header-content">
            <img src="/logo.png" alt="Hands Logo" className="header-logo" />
            <span className="header-title">Hands</span>
          </div>
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
             
                <span>Extract from URL</span>
              </a>
              <a href="/extract-image" className="action-btn">

                <span>Extract from Image</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .recipes-container {
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
          padding: 32px 20px;
        }

        .empty-state {
          text-align: center;
          max-width: 100%;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(30px);
          border-radius: 20px;
          padding: 40px 24px;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.06),
            0 1px 3px rgba(0, 0, 0, 0.02);
          border: 0.5px solid rgba(0, 0, 0, 0.08);
        }

        .empty-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 24px;
          color: #8e8e93;
        }

        .empty-icon svg {
          width: 100%;
          height: 100%;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1d1d1f;
          margin-bottom: 12px;
        }

        .empty-state p {
          font-size: 1rem;
          color: #6d6d70;
          margin-bottom: 24px;
          line-height: 1.4;
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
          padding: 14px 20px;
          background: #007aff;
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }

        .action-btn:hover {
          background: #0056b3;
          transform: translateY(-1px);
          box-shadow: 
            0 6px 20px rgba(0, 122, 255, 0.3),
            0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .action-btn:active {
          transform: translateY(0px);
          background: #004494;
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

        @media (max-width: 428px) {
          .header {
            padding: max(44px, env(safe-area-inset-top)) 16px 32px;
          }

          .header h1 {
            font-size: 2.5rem;
            line-height: 1.2;
            margin-bottom: 12px;
          }

          .header p {
            font-size: 1.1rem;
            line-height: 1.4;
          }

          .content {
            padding: 24px 16px;
          }

          .empty-state {
            padding: 28px 18px;
            border-radius: 18px;
          }

          .empty-state h3 {
            font-size: 1.4rem;
            margin-bottom: 10px;
          }

          .empty-state p {
            font-size: 0.9rem;
            line-height: 1.3;
            margin-bottom: 20px;
          }

          .empty-icon {
            width: 52px;
            height: 52px;
            margin-bottom: 16px;
          }

          .action-buttons {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }

          .action-btn {
            width: 100%;
            max-width: 180px;
            justify-content: center;
            padding: 12px 20px;
            font-size: 0.9rem;
            border-radius: 12px;
            font-weight: 600;
          }

          .btn-icon {
            font-size: 1rem;
          }
        }

        /* Smaller iPhones */
        @media (max-width: 375px) {
          .header h1 {
            font-size: 2.2rem;
          }

          .header p {
            font-size: 1rem;
          }

          .content {
            padding: 20px 12px;
          }

          .empty-state {
            padding: 24px 16px;
            border-radius: 16px;
          }

          .empty-state h3 {
            font-size: 1.3rem;
            margin-bottom: 8px;
          }

          .empty-state p {
            font-size: 0.85rem;
            line-height: 1.3;
            margin-bottom: 18px;
          }

          .empty-icon {
            width: 48px;
            height: 48px;
            margin-bottom: 14px;
          }

          .action-btn {
            max-width: none;
            padding: 12px 18px;
            font-size: 0.85rem;
            border-radius: 10px;
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