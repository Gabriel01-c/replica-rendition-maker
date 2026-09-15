import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/live-secreta")({
  component: LiveSecreta,
});

function LiveSecreta() {
  const [quizUrl, setQuizUrl] = useState("/live-secreta-quiz/index.html");

  useEffect(() => {
    setQuizUrl(`/live-secreta-quiz/index.html${window.location.search}`);
  }, []);

  return (
    <iframe
      src={quizUrl}
      title="Quiz Aula Magna Emergência Obstétrica"
      style={{
        display: "block",
        width: "100%",
        height: "100dvh",
        border: 0,
        background: "#edf5f9",
      }}
    />
  );
}
