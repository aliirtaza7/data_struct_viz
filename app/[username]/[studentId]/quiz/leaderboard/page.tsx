"use client";

import type { ScoreNode } from "@/app/_backend/_quizModule/_src/_modules/leaderboard";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobalStatesContext } from "../../layout";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState<ScoreNode[]>([]);

    const router = useRouter();

    const searchParams = useSearchParams();
    const topic = searchParams.get("topic");

    const { setHeading } = useGlobalStatesContext();

    useEffect(() => {
        setHeading("Leaderboard");

        async function getLeaderboard() {
            const response = await fetch(`/api/getLeaderboard?topic=${topic}`)
            const res = await response.json();
            if (res.success) {
                setLeaderboard(res.leaderboard);
            } else (
                router.back()
            )
        }

        getLeaderboard();
    }, [router, setHeading, topic]);

    return (
        <div className="page-shell">
            <div className="glass rounded-2xl p-6 md:p-8">
                <h2 className="text-3xl font-bold text-center text-[#CDD6F4] mb-6">
                    {topic} Leaderboard
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-[#45475A]/40">
                    <table className="w-full text-sm text-left text-[#CDD6F4]">
                        <thead className="bg-[#252538]/80 uppercase text-xs tracking-wide">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Rank</th>
                                <th className="px-6 py-3 font-semibold">Student ID</th>
                                <th className="px-6 py-3 font-semibold">Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((entry, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-[#45475A]/30 hover:bg-[#1E1E2E]/40 transition"
                                >
                                    <td className="px-6 py-4">
                                        <span className="badge" style={{ background: index === 0 ? "#F9E2AF" : "#45475A" }}>
                                            #{index + 1}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{entry.studentId}</td>
                                    <td className="px-6 py-4 text-[#A6E3A1] font-semibold">{entry.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}