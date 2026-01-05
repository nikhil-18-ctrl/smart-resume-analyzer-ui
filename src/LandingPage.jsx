import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* HEADER */}
      <header className="app-header">
        <div className="header-left">
          <img
            src="/logo.png"
            alt="Smart Resume Analyzer Logo"
            className="logo"
          />
          <span className="brand">Smart Resume Analyzer</span>
        </div>
      </header>

      {/* MAIN LANDING CONTENT */}
      <div className="landing">
        {/* HERO */}
        <section className="hero">
          <h1>Smart Resume Analyzer</h1>
          <p className="tagline">
            ATS-aware resume analysis — ethical, intelligent, and recruiter-friendly.
          </p>

          <button className="cta" onClick={() => navigate("/analyze")}>
            Start Analyzing
          </button>
        </section>

        {/* HOW IT WORKS */}
        <section className="section">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">📄 Upload your resume</div>
            <div className="step">📝 Paste the job description</div>
            <div className="step">📊 Get ATS score & insights</div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="section dark">
          <h2>Key Features</h2>
          <ul className="features">
            <li>✔ ATS score using real similarity logic</li>
            <li>✔ Matched & missing skills detection</li>
            <li>✔ Keyword analysis aligned with JD</li>
            <li>✔ Ethical analysis (no fake skills)</li>
            <li>✔ Cloud deployed & accessible anywhere</li>
          </ul>
        </section>

        {/* ETHICS */}
        <section className="section">
          <h2>Our Ethics</h2>
          <p className="ethics">
            We do <strong>not</strong> add fake skills, experience, or claims.
            This tool only analyzes your resume and provides honest insights
            aligned with Applicant Tracking Systems.
          </p>
        </section>

        {/* FOOTER */}
        <footer className="landing-footer">
          © 2024 Smart Resume Analyzer | Built by <strong>Nikhil Geedi</strong>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
