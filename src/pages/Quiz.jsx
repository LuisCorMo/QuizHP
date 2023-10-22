import CircleProgressBar from "../components/CircleProgressBar";
import useQuestions from "../utils/random";
import Round from "../components/Round";
import Score from "../components/Score";
import { useSelector, useDispatch } from "react-redux";

const Quiz = () => {
  const dispatch = useDispatch();
  const questionsInRedux = useSelector((state) => state.questions.questions);

  const {
    question,
    answers,
    handleAnswer,
    score,
    round,
    seconds,
    correctAnswerIndex,
    incorrectAnswerIndex
  } = useQuestions(questionsInRedux);

  return (
    <section className="min-h-screen bg-wallpaper bg-[center_right_-550px] bg-no-repeat bg-cover sm:bg-center">
      <div className="bg-slate-950/30 pt-4">
        {/* top */}

        <div className="grid grid-cols-3 gap-8 text-center text-white p-6 sm:w-[600px] sm:m-auto">
          <article className="grid items-center">
            <Round round={round} />
          </article>

          <article>
            <div className="grid text-center justify-center sm:w-[120px] sm:m-auto">
              <CircleProgressBar seconds={seconds} />
            </div>
          </article>

          <article className="grid items-center">
            <Score score={score} />
          </article>
        </div>

        {/* Questions */}

        <div className="h-[120px]">
          <h2 className="text-2xl p-2 mt-[80px] text-white text-center pb-6">
            {question.question}
          </h2>
        </div>

        {/* Answers */}

        <div className="flex flex-col mx-8 mt-[100px] sm:mt-[80px] sm:w-[600px] sm:m-auto">
          {answers.map((answer, index) => (
            <button
              key={index}
              className={`text-white p-2 text-2xl border-2 border-white rounded-xl my-1 ${
                correctAnswerIndex === index
                  ? "bg-green-600"
                  : incorrectAnswerIndex === index
                  ? "bg-red-600"
                  : "bg-slate-900"
              }`}
              onClick={() => {
                handleAnswer(answer);
              }}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Quiz;
