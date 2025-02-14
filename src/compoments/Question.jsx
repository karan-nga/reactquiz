import Option from "./option";
export default function Question({ currentQuestion, dispatch, answer, score }) {
  console.log(currentQuestion);
  return (
    <div>
      <h4>{currentQuestion.question}</h4>
      <Option
        question={currentQuestion}
        dispatch={dispatch}
        answer={answer}
        score={score}
      />
    </div>
  );
}
