import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import QuizPage from "./pages/QuizPage/QuizPage";
import AnalysisPage from "./pages/AnalysisPage/AnalysisPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/quiz" element={<QuizPage />}></Route>
          <Route path="/analysis" element={<AnalysisPage />}></Route>
          <Route path="/results" element={<ResultsPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
