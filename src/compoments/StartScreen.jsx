export default function StartScreen({ totalQuestion, dispatch }) {
  function startQuiz() {
    dispatch({ type: "start" });
  }

  return (
    <div className="start">
      <h2>Welcome to react quiz</h2>
      <h3>{totalQuestion} Question to test your react knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}
