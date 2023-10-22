export const bgAnswer = {
  correct_answer: "bg-green-600",
  wrong_answers: "bg-red-600",
}


import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import { useDispatch } from 'react-redux';
import { setQuestions } from "./store/slices/questionsSlice";
import data from "./SupportFiles/questions.json";

function App() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [questionsData, setQuestionsData] = useState([]);

  useEffect(() => {
    
    const questionsData = data.questions

    setQuestionsData(questionsData);
    dispatch(setQuestions(questionsData));
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <section className="min-h-screen grid">
      {isLoading ? (
        //Loader

        <div className="grid items-center justify-center bg-slate-300">
          <article className="w-[180px] h-[180px] grid rounded-full">
            <img
              src="/images/escudoH.png"
              className="animate-[ping_1.5s_infinite]"
              alt=""
            />
          </article>
        </div>
      ) : (
        //App

        <div className="bg-wallpaper min-h-full max-w-full bg-[center_right_-550px] bg-no-repeat bg-cover sm:bg-center">
          {/* <Home /> */}

          <Quiz questionsData={questionsData}/>
          {/* <Routes>
          <Route path="/Quiz" element={<Quiz />}/>
          </Routes> */}
        </div>
      )}
    </section>
  );
}

export default App;
