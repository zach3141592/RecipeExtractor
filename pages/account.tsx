import Head from 'next/head';
import Navigation from '../components/Navigation';

export default function Account() {
  return (
    <>
      <Head>
        <title>Hands - Account</title>
        <meta name="description" content="Manage your account settings and preferences" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navigation />
      
      <div className="account-container">
        <div className="header">
          <div className="header-content">
            <img src="/logo.png" alt="Hands Logo" className="header-logo" />
            <span className="header-title">Hands</span>
          </div>
        </div>
        
        <div className="content">
          <div className="account-section">
            <div className="profile-card">
              <div className="profile-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Account Settings</h3>
              <p>Manage your profile and preferences</p>
            </div>

            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="setting-content">
                  <span className="setting-title">Profile</span>
                  <span className="setting-description">Edit your personal information</span>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </div>
                <div className="setting-content">
                  <span className="setting-title">Preferences</span>
                  <span className="setting-description">App settings and notifications</span>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <div className="setting-content">
                  <span className="setting-title">My Recipes</span>
                  <span className="setting-description">View saved recipe collection</span>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16,17 21,12 16,7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                </div>
                <div className="setting-content">
                  <span className="setting-title">Sign Out</span>
                  <span className="setting-description">Log out of your account</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .account-container {
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
          padding: 32px 16px;
        }

        .account-section {
          max-width: 100%;
          margin: 0 auto;
        }

        .profile-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(30px);
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          margin-bottom: 24px;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.06),
            0 1px 3px rgba(0, 0, 0, 0.02);
          border: 0.5px solid rgba(0, 0, 0, 0.08);
        }

        .profile-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 20px;
          color: #007aff;
        }

        .profile-icon svg {
          width: 100%;
          height: 100%;
          stroke-width: 1.5;
        }

        .profile-card h3 {
          font-size: 1.4rem;
          font-weight: 600;
          color: #1d1d1f;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .profile-card p {
          font-size: 0.95rem;
          color: #6d6d70;
          line-height: 1.5;
          font-weight: 400;
        }

        .settings-list {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(30px);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.06),
            0 1px 3px rgba(0, 0, 0, 0.02);
          border: 0.5px solid rgba(0, 0, 0, 0.08);
        }

        .setting-item {
          display: flex;
          align-items: center;
          padding: 20px 24px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
        }

        .setting-item:last-child {
          border-bottom: none;
        }

        .setting-item:hover {
          background: rgba(0, 122, 255, 0.04);
        }

        .setting-item:active {
          background: rgba(0, 122, 255, 0.08);
          transform: scale(0.98);
        }

        .setting-icon {
          width: 24px;
          height: 24px;
          color: #007aff;
          margin-right: 16px;
          flex-shrink: 0;
        }

        .setting-icon svg {
          width: 100%;
          height: 100%;
        }

        .setting-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .setting-title {
          font-size: 1rem;
          font-weight: 500;
          color: #1d1d1f;
          line-height: 1.3;
        }

        .setting-description {
          font-size: 0.85rem;
          color: #6d6d70;
          line-height: 1.4;
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
            padding: 28px 14px;
          }

          .profile-card {
            padding: 28px 20px;
            border-radius: 18px;
          }

          .profile-icon {
            width: 56px;
            height: 56px;
            margin-bottom: 16px;
          }

          .profile-card h3 {
            font-size: 1.3rem;
          }

          .profile-card p {
            font-size: 0.9rem;
          }

          .settings-list {
            border-radius: 18px;
          }

          .setting-item {
            padding: 18px 20px;
          }

          .setting-icon {
            width: 22px;
            height: 22px;
            margin-right: 14px;
          }

          .setting-title {
            font-size: 0.95rem;
          }

          .setting-description {
            font-size: 0.8rem;
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
            padding: 24px 12px;
          }

          .profile-card {
            padding: 24px 18px;
            border-radius: 16px;
          }

          .profile-icon {
            width: 52px;
            height: 52px;
            margin-bottom: 14px;
          }

          .settings-list {
            border-radius: 16px;
          }

          .setting-item {
            padding: 16px 18px;
          }
        }
      `}</style>
    </>
  );
}