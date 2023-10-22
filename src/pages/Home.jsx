import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setQuestions } from '../store/slices/questionsSlice';
import data from "../SupportFiles/questions.json";

const Home = () => {
  const dispatch = useDispatch();

  const startQuiz = () => {
    const questionsData = data.questions;
    dispatch(setQuestions(questionsData));
  };
  return (
    <div className="min-h-screen bg-wallpaper bg-[center_right_-550px] bg-no-repeat bg-cover sm:bg-center">
      <section className="bg-slate-950/30 min-h-screen grid items-center ">
        <h2 className="text-white/90 text text-center text-3xl font-semibold font-serif">
          Harry Potter <br /> Quiz
        </h2>

        <div className="flex flex-col mx-8 sm:w-[600px] sm:m-auto">
          <Link
            to="/quiz"
            className="text-white p-2 text-2xl border-2 border-white bg-slate-900 rounded-xl my-2 text-center"
          >
            Jugar
          </Link>

          <Link
            to="/scores"
            className="text-white p-2 text-2xl border-2 border-white bg-slate-900 rounded-xl my-2 text-center"
          >
            Puntuaciones
          </Link>
        </div>
      </section>
    </div>
  );
};
export default Home;
