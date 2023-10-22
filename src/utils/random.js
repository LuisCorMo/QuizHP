import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions } from "../store/slices/questionsSlice";
import data from "../SupportFiles/questions.json";


const useQuestions = (questionsData) => {
  const dispatch = useDispatch();
  const questionsInRedux = useSelector((state) => state.questions.questions);

  const getRandom = (elements) => {
    const randomIndex = Math.floor(Math.random() * elements.length);
    return elements[randomIndex];
  };

  const questionSet = new Set(
    questionsInRedux.map((question) => JSON.stringify(question))
  );
  let timer;

  const [question, setQuestion] = useState(getRandom(data.questions));
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [seconds, setSeconds] = useState(15);

  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [incorrectAnswerIndex, setIncorrectAnswerIndex] = useState(null);

  const handleNewQuestion = () => {
    if (round < 12 && questionSet.size > 0) {
      // Reinicia el contador
      clearTimeout(timer);
      setSeconds(15);

      // Selecciona una pregunta aleatoria del conjunto
      const questionArray = Array.from(questionSet);
      const newQuestionIndex = Math.floor(Math.random() * questionArray.length);
      const newQuestion = JSON.parse(questionArray[newQuestionIndex]);
      setQuestion(newQuestion);

      // Elimina la pregunta seleccionada del conjunto
      questionSet.delete(JSON.stringify(newQuestion));

      // Mezcla las respuestas correctas e incorrectas
      const allAnswers = [
        ...newQuestion.wrong_answers,
        newQuestion.correct_answer,
      ].sort(() => Math.random() - 0.5);

      setAnswers(allAnswers);

      // Establecer las preguntas en el store de Redux
      dispatch(setQuestions([...questionsInRedux, newQuestion]));
    }
  };

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === question.correct_answer) {
      // Cambia el color del botón de respuesta correcta aquí
      setCorrectAnswerIndex(answers.indexOf(question.correct_answer));
      setScore(score + 25);
    } else {
      // Cambia el color del botón de respuesta incorrecta aquí
      setIncorrectAnswerIndex(answers.indexOf(selectedAnswer));
    }

    // Espera un breve período de tiempo antes de mostrar la siguiente pregunta
    setTimeout(() => {
      // Reinicia los índices de respuesta correcta e incorrecta
      setCorrectAnswerIndex(null);
      setIncorrectAnswerIndex(null);

      handleRound();
      handleNewQuestion();
    }, 200); // Espera 1000 milisegundos (1 segundo)
  };

  const handleRound = () => {
    if (round < 12) {
      setRound(round + 1);
      handleNewQuestion();
    }
  };

  useEffect(() => {
    handleNewQuestion();
  }, []);

  useEffect(() => {
    timer = setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        // Al llegar a cero, solo avanza a la siguiente pregunta si no es la última ronda
        if (round < 12) {
          handleRound();
        }
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [seconds, round]);

  return {
    question,
    answers,
    handleAnswer,
    score,
    round,
    seconds,
    handleNewQuestion,
    correctAnswerIndex,
    incorrectAnswerIndex,
  };
};

export default useQuestions;
