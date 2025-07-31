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
        <div className="header-content">
          <img src="/logo.png" alt="Hands Logo" className="header-logo" />
          <span className="header-title">Hands</span>
        </div>
      </div>
      
      <div className="content">
          <form onSubmit={handleSubmit} className="url-form">
            <div className="input-container">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter recipe website URL or YouTube video URL..."
                className="url-input"
                required
              />
            </div>
            <div className="button-container">
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
        .extractor-container {
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

        .url-form {
          max-width: 100%;
          margin: 0 auto 24px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(30px);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.06),
            0 1px 3px rgba(0, 0, 0, 0.02);
          border: 0.5px solid rgba(0, 0, 0, 0.08);
        }

        .input-container {
          margin-bottom: 16px;
        }

        .button-container {
          display: flex;
          justify-content: center;
        }

        .url-input {
          width: 100%;
          padding: 16px 20px;
          border: 1.5px solid rgba(0, 0, 0, 0.12);
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 400;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #1d1d1f;
          outline: none;
          box-sizing: border-box;
        }

        .url-input::placeholder {
          color: #8e8e93;
          font-weight: 400;
        }

        .url-input:focus {
          border-color: #007aff;
          background: rgba(255, 255, 255, 0.98);
          transform: translateY(-1px);
          box-shadow: 
            0 0 0 4px rgba(0, 122, 255, 0.08),
            0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .extract-btn {
          background: #007aff;
          color: white;
          border: none;
          padding: 16px 24px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          min-width: 120px;
          max-width: 200px;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }

        .extract-btn:hover:not(:disabled) {
          background: #0056b3;
          transform: translateY(-1px);
          box-shadow: 
            0 6px 20px rgba(0, 122, 255, 0.3),
            0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .extract-btn:active:not(:disabled) {
          transform: translateY(0px);
          background: #004bb8;
        }

        .extract-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .extract-btn span {
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

          .url-form {
            padding: 20px;
            border-radius: 18px;
          }

          .input-container {
            margin-bottom: 16px;
          }

          .url-input {
            padding: 14px 16px;
            font-size: 16px;
            border-radius: 12px;
            border: 1.5px solid rgba(0, 0, 0, 0.15);
          }

          .url-input::placeholder {
            font-size: 15px;
          }

          .extract-btn {
            padding: 14px 24px;
            font-size: 0.95rem;
            border-radius: 12px;
            width: 100%;
            max-width: 280px;
            font-weight: 600;
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
            padding: 24px 12px;
          }

          .form-container {
            padding: 20px;
            border-radius: 16px;
          }

          .url-form {
            padding: 20px;
            border-radius: 12px;
          }

          .url-input {
            padding: 16px 18px;
            font-size: 16px;
            border-radius: 12px;
          }

          .extract-btn {
            padding: 16px 24px;
            font-size: 15px;
            border-radius: 12px;
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