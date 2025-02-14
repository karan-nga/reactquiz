export default function FinishScreen({ score, maxScore }) {
  return (
    <p className="result">
      You score <strong>{score}</strong> out of {maxScore}
    </p>
  );
}
