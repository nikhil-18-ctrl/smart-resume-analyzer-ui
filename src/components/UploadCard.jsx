import { useState } from "react";
import "./UploadCard.css";

const UploadCard = () => {
  const [jd, setJd] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [optimized, setOptimized] = useState(null);

  /* =======================
     ANALYZE RESUME
  ======================= */
  const handleAnalyze = async () => {
    if (!resume || !jd.trim()) {
      alert("Please upload resume and paste the job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jd", jd);

    setLoading(true);
    setResult(null);
    setOptimized(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Backend not reachable. Is Flask running?");
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     OPTIMIZE RESUME
  ======================= */
  const handleOptimize = async () => {
    if (!resume || !jd.trim()) return;

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jd", jd);

    setLoading(true);

    try {
      const res = await fetch(
        "http://127.0.0.1:5000/api/optimize-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setOptimized(data);
    } catch (err) {
      alert("Failed to optimize resume.");
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

        </div>

        {/* =======================
            ANALYSIS RESULT
        ======================= */}
        {result && (
          <div className="result">
            <div className="score">
              ATS Score: {result.ats_score}%
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

        {/* =======================
            OPTIMIZED RESUME
        ======================= */}
        {optimized && (
          <div className="result">
            <div className="score">
              ATS Improvement: {optimized.ats_score_before}% →{" "}
              {optimized.ats_score_after}%
            </div>

            <textarea readOnly value={optimized.optimized_resume_text} />

            <p className="subtitle" style={{ marginTop: "12px" }}>
              ⚠️ Skills were not modified. Only keywords were improved.
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
