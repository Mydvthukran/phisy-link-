import './ResultCard.css';
import RiskGauge from './RiskGauge';

const ResultCard = ({ result, isLoading, error }) => {
  if (error) {
    return (
      <div className="result-card-container error glass-panel">
        <div className="error-icon">⚠️</div>
        <h3>Analysis Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="result-card-container loading glass-panel">
        <div className="pulse-loader"></div>
        <p className="loading-text">AI is analyzing content across multiple models...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-card-container empty glass-panel">
        <div className="empty-icon">🛡️</div>
        <h3>Ready to Scan</h3>
        <p>Enter a URL, paste a message, or upload an image to begin.</p>
      </div>
    );
  }

  const getStatusClass = (level) => {
    switch(level) {
      case 'SAFE': return 'status-safe';
      case 'SUSPICIOUS': return 'status-suspicious';
      case 'MALICIOUS': return 'status-malicious';
      default: return '';
    }
  };

  return (
    <div className={`result-card-container glass-panel ${getStatusClass(result.risk_level)}`}>
      <div className="result-header">
        <h2>Analysis Result</h2>
        <span className={`risk-badge ${getStatusClass(result.risk_level)}`}>
          {result.risk_level}
        </span>
      </div>

      <div className="gauge-section">
        <RiskGauge score={result.risk_score} level={result.risk_level} />
      </div>

      <div className="result-details">
        <div className="detail-section">
          <h3>Why we flagged this:</h3>
          <ul className="indicators-list">
            {result.indicators.map((indicator, index) => (
              <li key={index}>
                <span className="bullet">•</span>
                {indicator}
              </li>
            ))}
          </ul>
        </div>

        <div className="detail-section recommendation-section">
          <h3>Recommendation:</h3>
          <p className="recommendation-text">{result.recommendation}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
