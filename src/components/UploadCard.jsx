import { useState } from "react";
import "./UploadCard.css";

const API_BASE = "https://smart-resume-analyzer-backend-gmcl.onrender.com";

const UploadCard = () => {
  const [jd, setJd] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [structured, setStructured] = useState(null);

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
    setStructured(null);

    try {
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Backend not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     STRUCTURED RESUME
  ======================= */
  const handleStructured = async () => {
    if (!resume || !jd.trim()) return;

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jd", jd);

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/structured-resume`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();
      setStructured(data);
    } catch (err) {
      alert("Failed to generate structured resume.");
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
        <div className="file-box">
          <label className="label">📎 Resume Upload (PDF / DOCX)</label>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setResume(e.target.files[0])}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="actions">
          <button
            className="btn analyze"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>

          {result && (
            <button
              className="btn optimize"
              onClick={handleStructured}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Structured Resume"}
            </button>
          )}
        </div>

        {/* =======================
            ANALYSIS RESULT
        ======================= */}
        {result && (
          <div className="result">
            <div className="score">ATS Score: {result.ats_score}%</div>

            <ResultGroup title="Matched Skills" items={result.matched_skills} type="matched" />
            <ResultGroup
              title="Missing Skills"
              items={result.missing_skills}
              type="missing"
              emptyText="No missing skills 🎉"
            />
            <ResultGroup title="Matched Keywords" items={result.matched_keywords} type="keyword" />
            <ResultGroup title="Missing Keywords" items={result.missing_keywords} type="missing" />
          </div>
        )}

        {/* =======================
            STRUCTURED RESUME
        ======================= */}
        {structured && (
          <div className="result">
            <div className="score">
              ATS Improvement: {structured.ats_score_before}% →{" "}
              {structured.ats_score_after}%
            </div>

            <textarea readOnly value={structured.structured_resume} />

            <p className="subtitle" style={{ marginTop: "12px" }}>
              ⚠️ No fake skills added. Resume was ethically rephrased and structured.
            </p>
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
   REUSABLE RESULT GROUP
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
        {items.map((item, i) => (
          <span key={i} className={`tag ${type}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UploadCard;
