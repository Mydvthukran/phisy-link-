import { useState } from 'react';
import './App.css';
import ScannerForm from './components/ScannerForm';
import ResultCard from './components/ResultCard';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScanComplete = (result) => {
    setAnalysisResult(result);
    setIsLoading(false);
  };

  const handleScanStart = () => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
  };

  const handleScanError = (err) => {
    setError(err);
    setIsLoading(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-container">
          <div className="logo-icon">P</div>
          <div className="logo-text">PhishGuard AI</div>
        </div>
        <nav>
          {/* Add navigation links here if needed later */}
        </nav>
      </header>

      <main className="main-content">
        <div className="left-panel">
          <div className="hero-section">
            <h1 className="hero-title">Scan Suspicious Content</h1>
            <p className="hero-subtitle">
              Our multimodal AI analyzes URLs, text messages, and QR codes to detect phishing and scams instantly.
            </p>
          </div>
          
          <ScannerForm 
            onScanStart={handleScanStart}
            onScanComplete={handleScanComplete}
            onError={handleScanError}
            isLoading={isLoading}
          />
        </div>

        <div className="right-panel">
          <ResultCard 
            result={analysisResult} 
            isLoading={isLoading} 
            error={error} 
          />
        </div>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} PhishGuard AI. Built for the Hackathon.</p>
      </footer>
    </div>
  );
}

export default App;
