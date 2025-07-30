import React, { useState, useRef } from 'react';
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

export default function ImageExtractor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecipeData | null>(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError('');
      setResult(null);
    } else {
      setError('Please select a valid image file (PNG, JPG, JPEG, WebP)');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image file');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('/api/extract-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { error?: string } } };
      setError(axiosError.response?.data?.error || 'Failed to extract recipe from image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Hands</h1>
        <p>Extract recipes from images using AI-powered text recognition</p>
      </div>
      
      <div className="content">
        <form onSubmit={handleSubmit} className="upload-form">
          <div 
            className={`upload-area ${dragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
            
            {selectedFile ? (
              <div className="file-preview">
                <div className="file-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                  </svg>
                </div>
                <div className="file-info">
                  <span className="file-name">{selectedFile.name}</span>
                  <span className="file-size">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <button 
                  type="button" 
                  className="remove-file"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="upload-content">
                <div className="upload-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
                  </svg>
                </div>
                <h3>Upload Recipe Image</h3>
                <p>Drag and drop an image here, or click to select</p>
                <span className="supported-formats">PNG, JPG, JPEG, WebP supported</span>
              </div>
            )}
          </div>

          {selectedFile && (
            <button 
              type="submit" 
              disabled={loading}
              className="extract-btn"
            >
              <span>{loading ? 'Extracting...' : 'Extract Recipe'}</span>
            </button>
          )}
        </form>

        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}
        
        {result && <RecipeResult data={result} />}
      </div>

      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 1px 4px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
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
          padding: 60px 40px;
        }

        .upload-form {
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

        .upload-area {
          border: 2px dashed rgba(0, 0, 0, 0.2);
          border-radius: 24px;
          padding: 60px 40px;
          text-align: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          margin-bottom: 32px;
        }

        .upload-area:hover,
        .upload-area.drag-active {
          border-color: #000000;
          background: rgba(0, 0, 0, 0.05);
          transform: translateY(-3px);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.15),
            0 4px 16px rgba(0, 0, 0, 0.08);
        }

        .upload-area.has-file {
          border-color: #000000;
          background: rgba(0, 0, 0, 0.05);
        }

        .upload-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #000000;
          margin-bottom: 8px;
        }

        .upload-content p {
          font-size: 1rem;
          color: #333333;
          margin-bottom: 16px;
        }

        .supported-formats {
          font-size: 0.875rem;
          color: #666666;
        }

        .upload-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 24px;
          color: #000000;
        }

        .upload-icon svg {
          width: 100%;
          height: 100%;
        }

        .file-preview {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 20px;
          max-width: 400px;
          margin: 0 auto;
          position: relative;
        }

        .file-icon {
          width: 48px;
          height: 48px;
          color: #000000;
          flex-shrink: 0;
        }

        .file-icon svg {
          width: 100%;
          height: 100%;
        }

        .file-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          text-align: left;
        }

        .file-name {
          font-weight: 500;
          color: #000000;
          font-size: 0.875rem;
        }

        .file-size {
          color: #666666;
          font-size: 0.75rem;
        }

        .remove-file {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: none;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .remove-file:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .extract-btn {
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
          color: white;
          border: none;
          padding: 24px 40px;
          border-radius: 20px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 160px;
          position: relative;
          overflow: hidden;
          width: 100%;
          max-width: 200px;
          margin: 0 auto;
          display: block;
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

          .upload-area {
            padding: 40px 20px;
          }

          .file-preview {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .header h1 {
            font-size: 2rem;
          }

          .content {
            padding: 32px 20px;
          }

          .upload-area {
            padding: 32px 16px;
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
          background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
          min-height: 100vh;
          padding: 20px;
          color: #000000;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
} 