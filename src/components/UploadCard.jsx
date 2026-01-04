import { useState } from "react";
import "./UploadCard.css";

const API_BASE = "https://smart-resume-analyzer-backend-gmcl.onrender.com";
const getScoreColor = (score) => {
  if (score < 50) return "red";
  if (score < 65) return "yellow";
  return "green";
};


const UploadCard = () => {
  const [jd, setJd] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  /* =======================
     ANALYZE RESUME
  ======================= */
  const handleAnalyze = async () => {
    if (!resume || !jd.trim()) {
      alert("Please upload a resume and paste the job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jd", jd);

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (error) {
      alert("Backend not reachable. Please try again in a few seconds.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        {/* HEADER */}
        <h1 className="title">Smart Resume Analyzer</h1>
        <p className="subtitle">
          Upload your resume and compare it with the job description using ATS logic
        </p>

        {/* JOB DESCRIPTION */}
        <label className="label">📄 Job Description</label>
        <textarea
          placeholder="Paste the full job description (skills, role, experience...)"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />

        {/* FILE UPLOAD */}
        <label className="label">📎 Resume Upload (PDF / DOCX)</label>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setResume(e.target.files[0])}
        />

        {/* ACTION BUTTON */}
        <button
          className="btn analyze"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? (
  <span className="loading-text">
    <span className="loader"></span>
    Waking up server… analyzing resume
  </span>
) : (
  "Analyze Resume"
)}

        </button>

        {/* =======================
            RESULTS
        ======================= */}
        {result && (
          <div className="result">
            <div className="score-section">
  <div className={`score-text ${getScoreColor(result.ats_score)}`}>
    ATS Score: {result.ats_score}%
  </div>

  <div className="progress-bar">
    <div
      className={`progress-fill ${getScoreColor(result.ats_score)}`}
      style={{ width: `${result.ats_score}%` }}
    ></div>
  </div>

  <div className="score-hint">
    Target score for high acceptance: <strong>65%+</strong>
  </div>
</div>


            <ResultGroup
              title="Matched Skills"
              items={result.matched_skills}
              type="matched"
            />

            <ResultGroup
              title="Missing Skills"
              items={result.missing_skills}
              type="missing"
              emptyText="No missing skills 🎉"
            />

            <ResultGroup
              title="Matched Keywords"
              items={result.matched_keywords}
              type="keyword"
            />

            <ResultGroup
              title="Missing Keywords"
              items={result.missing_keywords}
              type="missing"
            />
          </div>
        )}

        {/* FOOTER */}
        <div className="footer">
          Smart Resume Analyzer • React + Flask
        </div>
      </div>
    </div>
  );
};

/* =======================
   RESULT GROUP COMPONENT
======================= */
const ResultGroup = ({ title, items, type, emptyText }) => {
  if (!items || items.length === 0) {
    return emptyText ? (
      <div className="tag-group">
        <div className="tag-title">{title}</div>
        <div className="tags">
          <span className="tag matched">{emptyText}</span>
        </div>
      </div>
    ) : null;
  }

  return (
    <div className="tag-group">
      <div className="tag-title">{title}</div>
      <div className="tags">
        {items.map((item, index) => (
          <span key={index} className={`tag ${type}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UploadCard;
