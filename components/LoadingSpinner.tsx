import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="loading">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p>Extracting and formatting your recipe...</p>
      
      <style jsx>{`
        .loading {
          text-align: center;
          padding: 40px 20px;
          color: #4a5568;
        }

        .loading p {
          font-size: 1.1rem;
          font-weight: 400;
          color: #6b7280;
          margin-top: 24px;
          letter-spacing: 0.025em;
        }

        .loading-spinner {
          position: relative;
          width: 60px;
          height: 60px;
          margin: 0 auto;
        }

        .spinner-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top: 2px solid #4f46e5;
          animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }

        .spinner-ring:nth-child(2) {
          width: 70%;
          height: 70%;
          top: 15%;
          left: 15%;
          border-top-color: #7c3aed;
          animation-delay: -0.4s;
          animation-duration: 1.2s;
        }

        .spinner-ring:nth-child(3) {
          width: 40%;
          height: 40%;
          top: 30%;
          left: 30%;
          border-top-color: #06b6d4;
          animation-delay: -0.8s;
          animation-duration: 0.9s;
        }

        @keyframes spin {
          0% { 
            transform: rotate(0deg);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% { 
            transform: rotate(360deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
} 