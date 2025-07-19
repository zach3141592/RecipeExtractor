import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error">
      {message}
      
      <style jsx>{`
        .error {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #dc2626;
          padding: 20px 24px;
          border-radius: 16px;
          margin-top: 24px;
          font-weight: 500;
          backdrop-filter: blur(10px);
          animation: slideInDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(239, 68, 68, 0.1);
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
} 