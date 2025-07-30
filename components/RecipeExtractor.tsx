import React, { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import RecipeResult from './RecipeResult';
import ErrorMessage from './ErrorMessage';

interface RecipeData {
  success: boolean;
  title: string;
  source: string;
  formatted_recipe: string;
  original_url: string;
}

export default function RecipeExtractor() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecipeData | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('/api/extract', { url: url.trim() });
      setResult(response.data);
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { error?: string } } };
      setError(axiosError.response?.data?.error || 'Failed to extract recipe');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="container">
      <div className="header">
        <h1>hands</h1>
        <p>Extract clean, formatted recipes from any website or YouTube video</p>
      </div>
      
      <div className="content">
        <form onSubmit={handleSubmit} className="url-form">
          <div className="input-group">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter recipe website URL or YouTube video URL..."
              className="url-input"
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="extract-btn"
            >
              <span>{loading ? 'Extracting...' : 'Extract Recipe'}</span>
            </button>
          </div>
        </form>

        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}
        
        {result && <RecipeResult data={result} />}
      </div>

      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 2px 16px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .header {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
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
          font-size: 3.2rem;
          margin-bottom: 16px;
          font-weight: 300;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 1;
        }

        .header p {
          font-size: 1.2rem;
          opacity: 0.8;
          font-weight: 300;
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .content {
          padding: 60px 40px;
        }

        .url-form {
          margin-bottom: 50px;
        }

        .input-group {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          align-items: stretch;
        }

        .url-input {
          flex: 1;
          padding: 20px 24px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 16px;
          font-size: 16px;
          font-weight: 400;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #2d3748;
        }

        .url-input::placeholder {
          color: rgba(45, 55, 72, 0.5);
        }

        .url-input:focus {
          outline: none;
          border-color: #4f46e5;
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-1px);
          box-shadow: 
            0 8px 24px rgba(79, 70, 229, 0.12),
            0 2px 8px rgba(79, 70, 229, 0.08);
        }

        .extract-btn {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          border: none;
          padding: 20px 32px;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 140px;
          position: relative;
          overflow: hidden;
        }

        .extract-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .extract-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 
            0 12px 32px rgba(79, 70, 229, 0.3),
            0 4px 16px rgba(79, 70, 229, 0.2);
        }

        .extract-btn:hover:not(:disabled)::before {
          opacity: 1;
        }

        .extract-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .extract-btn span {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .container {
            margin: 10px;
            border-radius: 20px;
          }

          .header {
            padding: 40px 24px;
          }

          .header h1 {
            font-size: 2.4rem;
          }

          .header p {
            font-size: 1.1rem;
          }

          .content {
            padding: 40px 24px;
          }

          .input-group {
            flex-direction: column;
            gap: 12px;
          }

          .url-input {
            padding: 18px 20px;
          }

          .extract-btn {
            padding: 18px 28px;
          }
        }

        @media (max-width: 480px) {
          .header h1 {
            font-size: 2rem;
          }

          .content {
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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
          background-size: 400% 400%;
          animation: gradientShift 20s ease infinite;
          min-height: 100vh;
          padding: 20px;
          color: #2d3748;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
} 