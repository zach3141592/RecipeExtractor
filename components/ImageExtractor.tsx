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
    <div className="image-container">
      <div className="header">
        <div className="header-content">
          <img src="/logo.png" alt="Hands Logo" className="header-logo" />
          <span className="header-title">Hands</span>
        </div>
      </div>
      
      <div className="content">
        <div className="form-container">
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
        </div>

        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}
        
        {result && <RecipeResult data={result} />}
      </div>

      <style jsx>{`
        .image-container {
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
          /* Improve touch interaction */
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          /* Better mobile touch handling */
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
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
            padding: 32px 16px;
          }

          .form-container {
            padding: 24px;
            border-radius: 20px;
          }

          .upload-form {
            padding: 24px;
            border-radius: 16px;
          }

          .upload-area {
            padding: 36px 20px;
            border-radius: 20px;
            margin-bottom: 24px;
            min-height: 180px;
            /* Enhanced mobile touch area */
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
          }

          .upload-area:active {
            transform: scale(0.98);
            background: rgba(0, 0, 0, 0.08);
          }

          .upload-content h3 {
            font-size: 1.3rem;
            margin-bottom: 6px;
          }

          .upload-content p {
            font-size: 0.95rem;
            line-height: 1.4;
            margin-bottom: 12px;
          }

          .supported-formats {
            font-size: 0.8rem;
          }

          .file-preview {
            flex-direction: column;
            text-align: center;
            gap: 12px;
            padding: 16px;
            border-radius: 12px;
          }

          .file-name {
            font-size: 0.85rem;
          }

          .extract-btn {
            padding: 18px 32px;
            font-size: 16px;
            border-radius: 14px;
            width: 100%;
            max-width: none;
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

          .upload-form {
            padding: 20px;
            border-radius: 12px;
          }

          .upload-area {
            padding: 28px 16px;
            border-radius: 16px;
            margin-bottom: 20px;
            min-height: 160px;
          }

          .upload-content h3 {
            font-size: 1.2rem;
          }

          .upload-content p {
            font-size: 0.9rem;
            line-height: 1.3;
          }

          .upload-icon {
            width: 44px;
            height: 44px;
            margin-bottom: 12px;
          }

          .extract-btn {
            padding: 16px 24px;
            font-size: 15px;
            border-radius: 12px;
          }
        }
      `}</style>


    </div>
  );
} 