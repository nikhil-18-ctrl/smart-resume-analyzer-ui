import "./RightPanel.css";

const RightPanel = () => {
  return (
    <div className="right-panel">
      {/* Ambient blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      {/* Glass Info Card */}
      <div className="ats-info-card">
        <h3>How ATS Evaluates Your Resume</h3>

        <ul>
          <li>📄 Scans resume content (not design)</li>
          <li>🔑 Matches skills & keywords</li>
          <li>📊 Calculates relevance score</li>
          <li>🎯 65%+ = high shortlist chance</li>
        </ul>

        <p className="note">
          Tip: Clear wording + relevant keywords matter more than visuals.
        </p>
      </div>
    </div>
  );
};

export default RightPanel;
