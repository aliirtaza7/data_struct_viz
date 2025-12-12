"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGlobalStatesContext } from "../layout";

type QuizProps = {
    params: Promise<{
        username: string;
        studentId: string;
    }>;
};

type Settings = {
    topic: string;
    difficulty: string;
    numQuestions: number;
}

export default function Quiz({ params }: QuizProps) {
    const [settings, setSettings] = useState<Settings>({ topic: 'Arrays', difficulty: 'Easy', numQuestions: 5 });

    const router = useRouter();

    const { username, studentId } = use(params);

    const { setHeading } = useGlobalStatesContext();

    useEffect(() => {
        setHeading("Quiz");
    }, [setHeading]);

    const handleStartQuiz = () => {
        if (settings.topic === '' || settings.difficulty === '' || settings.numQuestions === 0) {
            toast.warning('Please fill in all fields');
        } else {
            router.push(`/${username}/${studentId}/quiz/start?topic=${settings.topic}&difficulty=${settings.difficulty}&questions=${settings.numQuestions}`);
        }
    }

    return (
        <div className="page-shell flex justify-center">
            <div className="glass rounded-2xl p-6 md:p-8 w-full max-w-xl">
                <h1 className="text-3xl font-bold text-center mb-2 text-[#CDD6F4]">Quiz Builder</h1>
                <p className="text-center mb-6 text-[#CDD6F4]/75">
                    Tailor a practice session, {username}, and sharpen your intuition.
                </p>

                <div className="space-y-5 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-[#CDD6F4]/75 mb-1">Topic</label>
                        <select
                            onChange={(e)=>setSettings({...settings, topic: e.target.value})}
                            className="bg-[#1E1E2E]/80"
                        >
                            <option>Arrays</option>
                            <option>Stacks</option>
                            <option>Queues</option>
                            <option>Linked Lists</option>
                            <option>Trees</option>
                            <option>Graphs</option>
                            <option value="Sorting">Sorting Algorithms</option>
                            <option value="Searching">Searching Algorithms</option>
                            <option value="Heap Sort">Heaps</option>
                            <option>Dynamic Programming</option>
                            <option>Recursion</option>
                            <option>Hashing</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#CDD6F4]/75 mb-1">Difficulty</label>
                        <select
                            onChange={(e)=>setSettings({...settings, difficulty: e.target.value})}
                            className="bg-[#1E1E2E]/80"
                        >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#CDD6F4]/75 mb-1">Number of Questions</label>
                        <select
                            onChange={(e)=>setSettings({...settings, numQuestions: Number(e.target.value)})}
                            className="bg-[#1E1E2E]/80"
                        >
                            <option>5</option>
                            <option>10</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={handleStartQuiz}
                    className="btn btn-primary w-full py-3"
                >
                    Start Quiz
                </button>
            </div>
        </div>
    );
}
