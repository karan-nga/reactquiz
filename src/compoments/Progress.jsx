export default function Progress({
  currentQuestionNumber,
  totalQuestion,
  maxScore,
  score,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        value={currentQuestionNumber + Number(answer !== null)}
        max={totalQuestion}
      ></progress>
      <p>
        Question {currentQuestionNumber + 1}/{totalQuestion}
      </p>
      <p>
        <strong>{score}</strong>/{maxScore}
      </p>
    </header>
  );
}
