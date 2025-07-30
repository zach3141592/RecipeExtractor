import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Navigation() {
  const router = useRouter();

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Add Image', path: '/extract-image', icon: '📷' },
    { name: 'Add URL', path: '/extract-url', icon: '🔗' },
    { name: 'Recipes', path: '/recipes', icon: '📋' },
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
              <span className="nav-icon">{item.icon}</span>
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

        .brand-text {
          font-size: 1.5rem;
          font-weight: 300;
          color: white;
          text-decoration: none;
          letter-spacing: -0.02em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .brand-text:hover {
          opacity: 0.8;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-1px);
        }

        .nav-link:hover::before {
          opacity: 1;
        }

        .nav-link.active {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .nav-link.active::before {
          opacity: 1;
        }

        .nav-icon {
          font-size: 1rem;
          opacity: 0.9;
        }

        .nav-text {
          white-space: nowrap;
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

          .nav-text {
            display: none;
          }

          .nav-icon {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0 12px;
            height: 56px;
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

          .nav-icon {
            font-size: 1rem;
          }
        }
      `}</style>
    </nav>
  );
} 