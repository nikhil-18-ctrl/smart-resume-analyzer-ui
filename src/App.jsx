import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import UploadCard from "./components/UploadCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LANDING PAGE */}
        <Route path="/" element={<LandingPage />} />

        {/* ANALYZER PAGE */}
        <Route path="/analyze" element={<UploadCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
