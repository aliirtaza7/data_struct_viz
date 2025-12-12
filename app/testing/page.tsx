"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

type Question = {
  id: number;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type Recommendation = {
  weakTopics: { topic: string; threshold: number }[];
  moderateTopics: { topic: string; threshold: number }[];
  strongTopics: { topic: string; threshold: number }[];
  tips: string[];
};

export default function Page() {
  const [value, setValue] = useState({ topic: "", difficulty: "Easy" as "Easy" | "Medium" | "Hard", answer: -1, numQuestions: 5 });
  const [render, setRender] = useState<number>(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0); // Percentage progress
  const [badge, setBadge] = useState<string | null>(null);

  const studentId = "student123"; // Replace with actual student ID from context/auth

  // Fetch quiz questions
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/getQuestions/", {
        body: JSON.stringify({ value, studentId, score }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const serverData = await response.json();

      if (Array.isArray(serverData) && serverData.length > 0) {
        setQuestion(serverData[0]);
        setProgress((prev) => prev + 10); // Increment progress by 10% for each question
      } else {
        console.error("Invalid data format:", serverData);
      }

      setIsCorrect(null);
    }
    fetchData();
  }, [render]);

  // Set the timer dynamically based on difficulty
  useEffect(() => {
    if (question) {
      const difficultyTimer = question.difficulty === "Easy" ? 25 : question.difficulty === "Medium" ? 40 : 60;
      setTimer(difficultyTimer);

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleNextQuestion(); // Skip to the next question
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [question]);

  // Fetch recommendations
  const fetchRecommendations = async () => {
    const response = await fetch(`/api/getData/?studentId=${studentId}`);
    const data = await response.json();
    setRecommendations(data);
  };

  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (value.answer !== -1 && question) {
      const isAnswerCorrect = value.answer === question.correctAnswer;
      setIsCorrect(isAnswerCorrect);

      if (isAnswerCorrect) {
        const points = question.difficulty === "Easy" ? 10 : question.difficulty === "Medium" ? 20 : 30;
        setScore((prev) => prev + points);

        // Check for badge milestones
        if (score + points >= 100) setBadge("100 Points Achieved!");
        else if (points >= 50) setBadge("Great Start!");
      }
    }
  };

  // Handle next question
  const handleNextQuestion = () => {
    setRender((prev) => prev + 1);
  };

  // Chart Data for Recommendations
  const chartData = recommendations
    ? {
        labels: [
          ...recommendations.weakTopics.map((t) => t.topic),
          ...recommendations.moderateTopics.map((t) => t.topic),
          ...recommendations.strongTopics.map((t) => t.topic),
        ],
        datasets: [
          {
            label: "Performance (in %)",
            data: [
              ...recommendations.weakTopics.map((t) => t.threshold),
              ...recommendations.moderateTopics.map((t) => t.threshold),
              ...recommendations.strongTopics.map((t) => t.threshold),
            ],
            backgroundColor: [
              ...recommendations.weakTopics.map(() => "red"),
              ...recommendations.moderateTopics.map(() => "yellow"),
              ...recommendations.strongTopics.map(() => "green"),
            ],
          },
        ],
      }
    : null;

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Quiz</h1>

        {/* Timer Display */}
        {timer > 0 && (
          <div className="text-lg font-bold text-gray-700 mb-4">Time Remaining: {timer}s</div>
        )}

        {/* Score and Progress */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-blue-700">Score: {score}</div>
          <div className="w-2/3 bg-gray-200 h-4 rounded-lg">
            <div
              className="bg-blue-500 h-4 rounded-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Badge Display */}
        {badge && (
          <div className="text-center bg-green-100 text-green-700 p-2 rounded-lg mb-4">
            🎉 {badge}
          </div>
        )}

        {/* Question and Options */}
        {question && (
          <div>
            <h2 className="text-lg font-semibold">{question.questionText}</h2>
            <ul>
              {question.options.map((option, index) => (
                <li key={index}>
                  <button
                    className={`w-full p-2 my-1 text-left rounded ${
                      value.answer === index ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                    onClick={() => setValue({ ...value, answer: index })}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Feedback Display */}
        {isCorrect !== null && (
          <div
            className={`p-4 mt-4 rounded text-center ${
              isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {isCorrect ? "Correct!" : `Incorrect. ${question?.explanation}`}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmitAnswer}
            disabled={value.answer === -1 || isCorrect !== null}
          >
            Submit Answer
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleNextQuestion}>
            Next Question
          </button>
        </div>

        {/* Recommendations */}
        <div className="mt-6">
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={fetchRecommendations}>
            Show Recommendations
          </button>

          {recommendations && chartData && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800">Performance Summary</h3>
              <Bar data={chartData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
