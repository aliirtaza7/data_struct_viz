"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useGlobalStatesContext } from "../layout";
import { useRouter } from "next/navigation";

type DashboardProps = {
    params: Promise<{
        username: string;
        studentId: string;
    }>;
};

export default function Dashboard({ params }: DashboardProps) {
    const [topic, setTopic] = useState("Arrays");

    const router = useRouter();

    const { username, studentId } = use(params);

    const { setHeading } = useGlobalStatesContext();

    useEffect(() => {
        setHeading("Dashboard");
    }, [setHeading]);

    return (
        <div className="w-full min-h-[calc(100vh-64px)] px-4 py-6 md:px-8 md:py-8">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Welcome section */}
                <section className="glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#CDD6F4] mb-2">
                            Dashboard
                        </h1>
                        <p className="text-[#CDD6F4]/80 text-base md:text-lg">
                            Welcome, <span className="font-semibold">{username}</span>
                        </p>
                    </div>
                    <div className="text-sm text-[#CDD6F4]/70 md:text-right">
                        <p className="font-medium">Data Struct Viz</p>
                        <p>Track your progress and dive into visualizations.</p>
                    </div>
                </section>

                {/* Quick actions */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        href={`/${username}/${studentId}/menu`}
                        className="glass rounded-2xl p-5 hover:border-[#89B4FA]/60 border border-transparent transition-all group"
                    >
                        <h2 className="text-lg font-semibold text-[#CDD6F4] mb-1">
                            Visualize Data Structures
                        </h2>
                        <p className="text-sm text-[#CDD6F4]/75 mb-3">
                            Explore interactive visualizations for lists, trees, graphs, and more.
                        </p>
                        <span className="inline-flex items-center text-sm font-medium text-[#89B4FA] group-hover:text-[#7AA3E8]">
                            Open visualizer
                            <span className="ml-1">↗</span>
                        </span>
                    </Link>

                    <button
                        onClick={() =>
                            router.push(
                                `/${username}/${studentId}/quiz/leaderboard?topic=${topic}`
                            )
                        }
                        className="glass rounded-2xl p-5 text-left hover:border-[#89B4FA]/60 border border-transparent transition-all"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h2 className="text-lg font-semibold text-[#CDD6F4] mb-1">
                                    Leaderboard
                                </h2>
                                <p className="text-sm text-[#CDD6F4]/75">
                                    See how you rank against other learners.
                                </p>
                            </div>
                        </div>
                        <div className="mt-2">
                            <label
                                htmlFor="topic"
                                className="block text-xs font-medium text-[#CDD6F4]/70 mb-1"
                            >
                                Topic
                            </label>
                            <select
                                id="topic"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full px-3 py-2 bg-[#1E1E2E]/60 border border-[#45475A] rounded-lg text-[#CDD6F4] text-sm focus:outline-none focus:ring-2 focus:ring-[#89B4FA] focus:border-transparent"
                            >
                                <option value="Arrays">Arrays</option>
                                <option value="Stacks">Stacks</option>
                                <option value="Queues">Queues</option>
                                <option value="Linked Lists">Linked Lists</option>
                                <option value="Trees">Trees</option>
                                <option value="Graphs">Graphs</option>
                                <option value="Sorting">Sorting Algorithms</option>
                                <option value="Searching">Searching Algorithms</option>
                                <option value="Heap Sort">Heaps</option>
                                <option value="Dynamic Programming">Dynamic Programming</option>
                                <option value="Recursion">Recursion</option>
                                <option value="Hashing">Hashing</option>
                            </select>
                        </div>
                    </button>

                    <Link
                        href={`/${username}/${studentId}/quiz/recommendations`}
                        className="glass rounded-2xl p-5 hover:border-[#A6E3A1]/60 border border-transparent transition-all"
                    >
                        <h2 className="text-lg font-semibold text-[#CDD6F4] mb-1">
                            Get Recommendations
                        </h2>
                        <p className="text-sm text-[#CDD6F4]/75 mb-3">
                            Personalized tips based on your quiz performance and progress.
                        </p>
                        <span className="inline-flex items-center text-sm font-medium text-[#A6E3A1]">
                            View recommendations
                        </span>
                    </Link>

                    <Link
                        href={`/${username}/${studentId}/quiz`}
                        className="glass rounded-2xl p-5 hover:border-[#F38BA8]/60 border border-transparent transition-all"
                    >
                        <h2 className="text-lg font-semibold text-[#CDD6F4] mb-1">
                            Attempt a Quiz
                        </h2>
                        <p className="text-sm text-[#CDD6F4]/75 mb-3">
                            Test your understanding with curated questions and instant feedback.
                        </p>
                        <span className="inline-flex items-center text-sm font-medium text-[#F38BA8]">
                            Start quiz
                        </span>
                    </Link>
                </section>
            </div>
        </div>
    );
}
