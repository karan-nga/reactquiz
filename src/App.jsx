import { useEffect, useReducer, useState } from "react";
import "./index.css";
import Header from "./compoments/Header";
import MainComp from "./compoments/MainComp";
import Loader from "./compoments/Loader";
import Error from "./compoments/Error";
import StartScreen from "./compoments/StartScreen";
import Question from "./compoments/Question";
import NextButton from "./compoments/NextButton";
import Progress from "./compoments/Progress";
import FinishScreen from "./compoments/FinishScreen";
const initialState = {
  question: [],
  status: "loading",
  index: 0,
  answer: null,
  point: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        question: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start": {
      return {
        ...state,
        status: "active",
      };
    }
    case "newAnswer": {
      const currentQuestion = state.question.at(state.index);
      return {
        ...state,
        answer: action.payload,
        point:
          action.payload == currentQuestion.correctOption
            ? state.point + currentQuestion.points
            : state.point,
      };
    }
    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }
    case "quizEnd": {
      return {
        ...state,
        status: "completed",
      };
    }
    default:
      throw new Error("Action not found");
  }
}
function App() {
  const [{ question, status, index, answer, point }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((e) => dispatch({ type: "dataFailed", payload: [] }));
  }, []);
  const numQuestion = question.length;
  const maxScore = question.reduce((a, b) => a + b.points, 0);

  return (
    <div className="app">
      <Header />
      <MainComp>
        {status == "loading" && <Loader />}
        {status == "error" && <Error />}
        {status == "ready" && (
          <StartScreen totalQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status == "active" && (
          <>
            <Progress
              currentQuestionNumber={index}
              totalQuestion={numQuestion}
              maxScore={maxScore}
              score={point}
              answer={answer}
            />
            <Question
              currentQuestion={question[index]}
              dispatch={dispatch}
              answer={answer}
              score={point}
            />
            <NextButton
              dispact={dispatch}
              answer={answer}
              currentQuestion={index}
              totalQuestion={numQuestion}
            />
          </>
        )}
        {status == "completed" && (
          <FinishScreen score={point} maxScore={maxScore} />
        )}
      </MainComp>
    </div>
  );
}

export default App;
