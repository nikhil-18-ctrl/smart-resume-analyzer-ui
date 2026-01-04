import UploadCard from "./components/UploadCard";
import RightPanel from "./components/RightPanel";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      {/* Main Resume Analyzer Card */}
      <UploadCard />

      {/* Ambient ATS Info Panel (hidden on mobile) */}
      <RightPanel />
    </div>
  );
}

export default App;
