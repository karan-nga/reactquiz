export default function NextButton({
  dispact,
  answer,
  currentQuestion,
  totalQuestion,
}) {
  if (answer === null) return null;
  if (currentQuestion + 1 < totalQuestion) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispact({ type: "nextQuestion" })}
        >
          Next
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispact({ type: "quizEnd" })}
        >
          Finish
        </button>
      </div>
    );
  }
}
