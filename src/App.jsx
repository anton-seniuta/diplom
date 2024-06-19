import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    //
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
