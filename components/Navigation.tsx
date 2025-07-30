import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Navigation() {
  const router = useRouter();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Add Image', path: '/extract-image' },
    { name: 'Add URL', path: '/extract-url' },
    { name: 'Recipes', path: '/recipes' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link href="/">
            <img src="/logo.png" alt="Hands Logo" className="brand-logo" />
            <span className="brand-text">Hands</span>
          </Link>
        </div>
        
        <div className="nav-links">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="nav-text">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #333333 100%);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 1000;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 64px;
        }

        .nav-brand {
          display: flex;
          align-items: center;
        }

        .nav-brand a {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .brand-logo {
          height: 32px;
          width: auto;
          transition: all 0.2s ease;
        }

        .brand-logo:hover {
          opacity: 0.8;
          transform: scale(1.02);
        }

        .brand-text {
          font-size: 1.5rem;
          font-weight: 300;
          color: white !important;
          text-decoration: none !important;
          letter-spacing: -0.02em;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          top: -2px;
        }

        .brand-text:hover {
          color: white !important;
          opacity: 0.8;
          transform: scale(1.02);
          text-decoration: none !important;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          border-radius: 8px;
          color: white !important;
          text-decoration: none !important;
          font-size: 0.875rem;
          font-weight: 500;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          outline: none;
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.1);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .nav-link:hover {
          color: white !important;
          text-decoration: none !important;
          opacity: 0.8;
          transform: scale(1.02);
        }

        .nav-link:hover::before {
          transform: scaleX(1);
        }

        .nav-link:hover .nav-text {
          color: white !important;
          text-decoration: none !important;
        }

        .nav-link:focus {
          color: white !important;
          background: rgba(255, 255, 255, 0.1);
          text-decoration: none !important;
          outline: none;
        }

        .nav-link.active {
          color: white !important;
          background: rgba(255, 255, 255, 0.15);
          text-decoration: none !important;
        }

        .nav-link.active::before {
          transform: scaleX(1);
        }

        .nav-text {
          white-space: nowrap;
          color: white !important;
          text-decoration: none !important;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .nav-container {
            padding: 0 16px;
          }

          .nav-links {
            gap: 4px;
          }

          .nav-link {
            padding: 8px 12px;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0 12px;
            height: 56px;
          }

          .brand-logo {
            height: 28px;
          }

          .brand-text {
            font-size: 1.25rem;
          }

          .nav-links {
            gap: 2px;
          }

          .nav-link {
            padding: 6px 8px;
          }
        }
      `}</style>
    </nav>
  );
} 