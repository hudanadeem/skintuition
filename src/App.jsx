import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import QuizPage from "./pages/QuizPage/QuizPage";
import AnalysisPage from "./pages/AnalysisPage/AnalysisPage";

function App() {
  return (
    <>
      <BrowserRouter
        future={{
          v7_startTransition: true, // Opt-in to React.startTransition behavior
          v7_relativeSplatPath: true, // Opt-in to new relative splat path behavior
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/quiz" element={<QuizPage />}></Route>
          <Route path="/analysis" element={<AnalysisPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
