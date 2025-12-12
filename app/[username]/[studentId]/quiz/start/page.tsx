"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { type Question } from "@/app/_backend/_quizModule/_src/_types/questions";
import { useGlobalStatesContext } from "../../layout";
import { toast } from "react-toastify";

type StartQuizProps = {
    params: Promise<{
        username: string;
        studentId: string;
    }>;
};

export default function StartQuiz({ params }: StartQuizProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const [submitted, setSubmitted] = useState(false);


    const { username, studentId } = use(params);

    const router = useRouter();
    const searchParams = useSearchParams();
    const topic = searchParams.get("topic");
    const difficulty = searchParams.get("difficulty");
    const numQuestions = searchParams.get("questions");

    const timeLimit = 60;

    const [timeLeft, setTimeLeft] = useState(timeLimit);

    const { setHeading } = useGlobalStatesContext();

    useEffect(() => {
        async function getQuestions() {
            const response = await fetch("/api/getQuestions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    value: {
                        topic,
                        difficulty,
                        numQuestions,
                        answer: -1,
                    },
                }),
            });

            const res = await response.json();
            if (res.success && res.questions.length>0) {
                setQuestions(res.questions);
                setIsLoading(false);
                setUserAnswers(Array(Number(numQuestions)).fill(-1)); // Initialize answers
            } else {
                toast.error("No questions found for the selected topic and difficulty. Please try again later.");
                router.push(`/${username}/${studentId}/quiz`);
            }
        }

        if (topic && difficulty && numQuestions) {
            setHeading(`Quiz: ${topic} | Difficulty: ${difficulty}`);
            getQuestions();
        }
    }, [topic, difficulty, numQuestions, router, setHeading]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleNextQuestion();
        }

        if (!submitted) {
            const timer = setTimeout(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [submitted, timeLeft]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setSubmitted(false);
            setCurrentQuestionIndex((prev) => prev + 1);
            setTimeLeft(timeLimit); // Reset timer for the next question
        }
    };

    const handleAnswerChange = (answerIndex: number) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = answerIndex;
        setUserAnswers(updatedAnswers);
    };

    const handleSubmitAnswer = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const userAnswer = userAnswers[currentQuestionIndex];

        if (userAnswer === -1) {
            return;
        }

        setTimeTaken((prev) => prev + (timeLimit - timeLeft));

        if (currentQuestion.correctAnswer === userAnswer) {
            setScore((prev) => prev + 1);
        }

        setSubmitted(true);
    }

    const handleSubmitQuiz = async () => {
        setIsLoading(true);

        // Submit score to the server
        await fetch("/api/updateLeaderboard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                studentId,
                score: (score/questions.length)*100,
                topic,
            }),
        });

        // Update performance data
        await fetch("/api/updatePerformance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                studentId,
                topic,
                correct: score,
                attempted: questions.length,
                time: timeTaken,
            }),
        });

        setShowResults(true);
        setHeading("Quiz Results");
        setIsLoading(false);
    };

    if (showResults) {
        return (
            <div className="page-shell flex justify-center">
                <div className="glass rounded-2xl p-8 w-full max-w-xl text-center space-y-4">
                    <h1 className="text-3xl font-bold text-[#CDD6F4]">Results</h1>
                    <p className="text-[#A6E3A1] text-lg font-semibold">
                        Score: {score} / {questions.length}
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                        <button
                            onClick={() => router.push(`/${username}/${studentId}/quiz/recommendations?studentId=${studentId}`) }
                            className="btn btn-primary w-full py-3"
                        >
                            Get Recommendations
                        </button>
                        <button
                            onClick={() => router.push(`/${username}/${studentId}/quiz/leaderboard?topic=${topic}`)}
                            className="btn w-full py-3 bg-[#252538] text-[#CDD6F4]"
                        >
                            Show Leaderboard
                        </button>
                        <button
                            onClick={() => router.push(`/${username}/${studentId}/quiz`)}
                            className="btn w-full py-3 bg-[#F38BA8]/20 text-[#F38BA8]"
                        >
                            Back to Quiz Hub
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="page-shell flex justify-center">
                <div className="glass rounded-2xl p-8 w-full max-w-md text-center">
                    <h1 className="text-2xl font-bold text-[#CDD6F4]">Loading...</h1>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="page-shell flex justify-center">
            <div className="glass rounded-2xl p-6 w-full max-w-3xl space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#CDD6F4]">Quiz</h1>
                        <p className="text-sm text-[#CDD6F4]/70">
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </p>
                    </div>
                    <div className="badge bg-[#252538] text-[#F9E2AF]">
                        {timeLeft}s left
                    </div>
                </div>

                <div className="rounded-2xl border border-[#45475A]/40 p-5 bg-[#1E1E2E]/60">
                    <p className="text-sm font-medium text-[#CDD6F4] mb-4">{currentQuestion.questionText}</p>
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                            <label
                                key={index}
                                htmlFor={`${currentQuestionIndex}-${index}`}
                                className={`flex items-center space-x-3 rounded-2xl border border-[#45475A]/40 px-4 py-3 cursor-pointer transition ${
                                    userAnswers[currentQuestionIndex] === index
                                        ? "bg-[#89B4FA]/20 border-[#89B4FA]/60"
                                        : "hover:bg-[#252538]/60"
                                }`}
                            >
                                <input
                                    type="radio"
                                    id={`${currentQuestionIndex}-${index}`}
                                    name={`question-${currentQuestionIndex}`}
                                    value={index}
                                    disabled={submitted}
                                    checked={userAnswers[currentQuestionIndex] === index}
                                    onChange={() => handleAnswerChange(index)}
                                    className="accent-[#89B4FA]"
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between gap-3">
                    <button
                        onClick={handleSubmitAnswer}
                        disabled={submitted}
                        className={`btn w-full py-3 ${submitted ? "bg-[#45475A] cursor-not-allowed text-[#CDD6F4]" : "btn-primary"}`}
                    >
                        Submit Answer
                    </button>
                    {currentQuestionIndex < questions.length - 1 ? (
                        <button
                            onClick={handleNextQuestion}
                            className="btn w-full py-3 bg-[#252538] text-[#CDD6F4]"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmitQuiz}
                            className="btn w-full py-3 bg-[#F38BA8]/20 text-[#F38BA8]"
                        >
                            End Quiz
                        </button>
                    )}
                </div>

                {submitted && (
                    <div
                        className={`text-center mt-4 rounded-2xl px-4 py-3 ${
                            currentQuestion.correctAnswer === userAnswers[currentQuestionIndex]
                                ? "bg-[#A6E3A1]/20 text-[#A6E3A1]"
                                : "bg-[#F38BA8]/20 text-[#F38BA8]"
                        }`}
                    >
                        <p className="font-semibold">
                            {currentQuestion.correctAnswer === userAnswers[currentQuestionIndex]
                                ? "Correct!"
                                : `Explanation: ${currentQuestion.explanation}`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
