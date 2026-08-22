import { useState } from 'react';
import './ScannerForm.css';
import { analyzeContent } from '../services/api';

const ScannerForm = ({ onScanStart, onScanComplete, onError, isLoading }) => {
  const [activeTab, setActiveTab] = useState('url');
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue && !file) return;

    onScanStart();

    try {
      const payload = {
        type: activeTab,
        content: inputValue,
        file: file // Note: File handling would need formData for real API, but this is fine for MVP mockup
      };

      const result = await analyzeContent(payload);
      onScanComplete(result);
    } catch (err) {
      onError(err.message || 'An error occurred during analysis.');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setInputValue(selectedFile.name);
    }
  };

  return (
    <div className="scanner-form-container glass-panel">
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'url' ? 'active' : ''}`}
          onClick={() => { setActiveTab('url'); setInputValue(''); setFile(null); }}
          type="button"
        >
          URL
        </button>
        <button 
          className={`tab ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => { setActiveTab('text'); setInputValue(''); setFile(null); }}
          type="button"
        >
          Text / Message
        </button>
        <button 
          className={`tab ${activeTab === 'image' ? 'active' : ''}`}
          onClick={() => { setActiveTab('image'); setInputValue(''); setFile(null); }}
          type="button"
        >
          Image / QR
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-body">
        {activeTab !== 'image' ? (
          <div className="input-group">
            <textarea
              className="scan-input"
              placeholder={activeTab === 'url' ? "https://suspicious-link.com/login..." : "Paste suspicious email, SMS, or message here..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows={activeTab === 'text' ? 5 : 2}
              required
            />
          </div>
        ) : (
          <div className="file-upload-group">
            <label className="file-upload-area">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden-file-input"
                required
              />
              <div className="upload-placeholder">
                {file ? (
                  <div className="file-selected">
                    <span className="file-name">{file.name}</span>
                    <span className="change-file">Click to change</span>
                  </div>
                ) : (
                  <div className="upload-prompt">
                    <span className="upload-icon">📁</span>
                    <span>Click to upload screenshot or QR code</span>
                  </div>
                )}
              </div>
            </label>
          </div>
        )}

        <button 
          type="submit" 
          className={`submit-btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading || (!inputValue && !file)}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Content'}
        </button>
      </form>
    </div>
  );
};

export default ScannerForm;
