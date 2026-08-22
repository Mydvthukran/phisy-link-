import './RiskGauge.css';

const RiskGauge = ({ score, level }) => {
  // Score is 0-100. We map it to a rotation from -90deg to 90deg.
  const rotation = (score / 100) * 180 - 90;
  
  const getLevelColor = () => {
    switch(level) {
      case 'SAFE': return 'var(--status-safe)';
      case 'SUSPICIOUS': return 'var(--status-suspicious)';
      case 'MALICIOUS': return 'var(--status-malicious)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="risk-gauge-container">
      <div className="gauge-outer">
        <div className="gauge-inner"></div>
        <div 
          className="gauge-needle" 
          style={{ transform: `rotate(${rotation}deg)` }}
        ></div>
        <div className="gauge-center-dot" style={{ backgroundColor: getLevelColor() }}></div>
      </div>
      
      <div className="gauge-labels">
        <span>0</span>
        <div className="score-display" style={{ color: getLevelColor() }}>
          <span className="score-value">{score}</span>
          <span className="score-text">Risk Score</span>
        </div>
        <span>100</span>
      </div>
    </div>
  );
};

export default RiskGauge;
