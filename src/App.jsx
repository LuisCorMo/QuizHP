import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Scores from "./pages/Scores";
import data from "./SupportFiles/questions.json";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setQuestions } from "./store/slices/questionsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const questionsData = data.questions;
    dispatch(setQuestions(questionsData));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/scores" element={<Scores />} />
    </Routes>
  );
}

export default App;
