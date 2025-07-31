import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Navigation() {
  const router = useRouter();

  const navItems = [
    { 
      name: 'Home', 
      path: '/', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      )
    },
    { 
      name: 'Image', 
      path: '/extract-image',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
      )
    },
    { 
      name: 'URL', 
      path: '/extract-url',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      )
    },
    { 
      name: 'Recipes', 
      path: '/recipes',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      )
    },
    { 
      name: 'Account', 
      path: '/account',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname === path;
  };

  return (
    <>
      {/* Bottom Tab Bar Navigation */}
      <nav className="bottom-nav">
        <div className="tab-bar">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`tab-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <div className="tab-icon">
                {item.icon}
              </div>
              <span className="tab-label">{item.name}</span>
            </Link>
          ))}
        </div>
        
        {/* iOS Home Indicator */}
        <div className="home-indicator"></div>
      </nav>

      <style jsx>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border-top: 0.33px solid rgba(255, 255, 255, 0.15);
          padding-bottom: env(safe-area-inset-bottom);
          box-shadow: 0 -1px 0 0 rgba(255, 255, 255, 0.08);
        }

        .tab-bar {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 6px 12px 8px;
          max-width: 428px; /* iPhone 14 Pro Max width */
          margin: 0 auto;
          position: relative;
        }

        .tab-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8px 12px 6px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 60px;
          min-height: 52px;
          border-radius: 12px;
          position: relative;
          background: transparent;
        }

        .tab-item.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }

        .tab-item.active::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          background: #ffffff;
          border-radius: 2px;
          transform: translate(-50%, -50%) translateY(-18px);
          opacity: 0.9;
        }

        .tab-item:active {
          transform: scale(0.92) translateY(0px);
          background: rgba(255, 255, 255, 0.1);
        }

        .tab-item.active:active {
          transform: scale(0.92) translateY(-1px);
          background: rgba(255, 255, 255, 0.2);
        }

        .tab-icon {
          width: 26px;
          height: 26px;
          margin-bottom: 3px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          stroke-width: 1.8;
        }

        .tab-item.active .tab-icon {
          transform: scale(1.05);
          stroke-width: 2.2;
        }

        .tab-label {
          font-size: 11px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.2px;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif;
          margin-top: 1px;
        }

        .tab-item.active .tab-label {
          font-weight: 600;
        }

        .home-indicator {
          width: 134px;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
          margin: 8px auto 2px;
        }

        /* iPhone-specific optimizations */
        @supports (padding: max(0px)) {
          .bottom-nav {
            padding-bottom: max(8px, env(safe-area-inset-bottom));
          }
        }

        /* Dark mode support - keeping same as light mode since toolbar is now dark */
        @media (prefers-color-scheme: dark) {
          .bottom-nav {
            background: rgba(0, 0, 0, 0.9);
            border-top-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 -1px 0 0 rgba(255, 255, 255, 0.1);
          }

          .tab-item {
            color: rgba(255, 255, 255, 0.8);
          }

          .tab-item.active {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.2);
          }

          .tab-item.active::before {
            background: #ffffff;
          }

          .tab-item:active {
            background: rgba(255, 255, 255, 0.15);
          }

          .tab-item.active:active {
            background: rgba(255, 255, 255, 0.25);
          }

          .home-indicator {
            background: rgba(255, 255, 255, 0.4);
          }
        }

        /* Smaller iPhones */
        @media (max-width: 375px) {
          .tab-bar {
            padding: 4px 8px 6px;
          }

          .tab-item {
            min-width: 54px;
            min-height: 48px;
            padding: 6px 8px 4px;
            border-radius: 10px;
          }

          .tab-icon {
            width: 24px;
            height: 24px;
            margin-bottom: 2px;
          }

          .tab-item.active .tab-icon {
            transform: scale(1.03);
          }

          .tab-label {
            font-size: 10px;
            margin-top: 0px;
          }

          .home-indicator {
            width: 120px;
            margin: 6px auto 2px;
          }
        }
      `}</style>
    </>
  );
} 