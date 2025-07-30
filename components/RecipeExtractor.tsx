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
    <div className="extractor-container">
      <div className="header">
        <h1>Hands</h1>
        <p>Extract clean, formatted recipes from any website or YouTube video</p>
      </div>
      
      <div className="content">
        <div className="form-container">
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
        </div>

        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}
        
        {result && <RecipeResult data={result} />}
      </div>

      <style jsx>{`
        .extractor-container {
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

        .form-container {
          max-width: 600px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 1px 4px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .url-form {
          margin-bottom: 50px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.05),
            0 1px 4px rgba(0, 0, 0, 0.02);
        }

        .input-group {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          align-items: stretch;
        }

        .url-input {
          flex: 1;
          padding: 24px 28px;
          border: 2px solid rgba(0, 0, 0, 0.15);
          border-radius: 20px;
          font-size: 16px;
          font-weight: 400;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          color: #000000;
          outline: none;
        }

        .url-input::placeholder {
          color: #666666;
          font-weight: 300;
        }

        .url-input:focus {
          border-color: #000000;
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-2px);
          box-shadow: 
            0 0 0 6px rgba(0, 0, 0, 0.08),
            0 8px 32px rgba(0, 0, 0, 0.12);
        }

        .extract-btn {
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
          color: white;
          border: none;
          padding: 24px 32px;
          border-radius: 20px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 160px;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }

        .extract-btn::before {
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

        .extract-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 
            0 16px 48px rgba(0, 0, 0, 0.25),
            0 8px 24px rgba(0, 0, 0, 0.15);
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
          .extractor-container {
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
          color: #000000;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
} 