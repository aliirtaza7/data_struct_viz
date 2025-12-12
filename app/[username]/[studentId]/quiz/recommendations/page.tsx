"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import { useGlobalStatesContext } from "../../layout";

type Recommendations = {
    weakTopics: {
      topic: string;
      threshold: number;
    }[],
    moderateTopics: {
      topic: string;
      threshold: number;
    }[],
    strongTopics: {
      topic: string;
      threshold: number;
    }[],
    tips: string[];
  }

export default function Page() {
    const { studentId } = useParams();

    const [recommendations, setRecommendations] = useState<Recommendations | undefined>();

    const { setHeading } = useGlobalStatesContext();

    useEffect(() => {
        setHeading("Recommendations");

        async function getRecommendations() {
            const response = await fetch(`/api/getRecommendations?studentId=${studentId}`);
            const res = await response.json();
            if (res.success) {
                setRecommendations(res.recommendations);
            }
        }

        getRecommendations();
    }, [setHeading, studentId]);

    if (
        recommendations &&
        (recommendations.weakTopics.length > 0 ||
          recommendations.moderateTopics.length > 0 ||
          recommendations.strongTopics.length > 0 ||
          recommendations.tips.length > 0)
      ) {
        return (
          <div className="page-shell">
            <div className="glass rounded-2xl p-6 md:p-8 w-full max-w-4xl mx-auto space-y-6">
            {recommendations.weakTopics.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-[#F38BA8] mb-3">Weak Topics</h3>
                <ul className="space-y-3">
                  {recommendations.weakTopics.map((topic, index) => (
                    <li
                      key={index}
                      className="rounded-2xl border border-[#F38BA8]/40 bg-[#F38BA8]/10 px-4 py-3"
                    >
                      <span className="font-semibold">Topic:</span> {topic.topic}
                    </li>
                  ))}
                </ul>
              </div>
            )}
      
            {recommendations.moderateTopics.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-[#F9E2AF] mb-3">
                  Moderate Topics
                </h3>
                <ul className="space-y-3">
                  {recommendations.moderateTopics.map((topic, index) => (
                    <li
                      key={index}
                      className="rounded-2xl border border-[#F9E2AF]/40 bg-[#F9E2AF]/10 px-4 py-3"
                    >
                      <span className="font-semibold">Topic:</span> {topic.topic}
                    </li>
                  ))}
                </ul>
              </div>
            )}
      
            {recommendations.strongTopics.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-[#A6E3A1] mb-3">
                  Strong Topics
                </h3>
                <ul className="space-y-3">
                  {recommendations.strongTopics.map((topic, index) => (
                    <li
                      key={index}
                      className="rounded-2xl border border-[#A6E3A1]/40 bg-[#A6E3A1]/10 px-4 py-3"
                    >
                      <span className="font-semibold">Topic:</span> {topic.topic}
                    </li>
                  ))}
                </ul>
              </div>
            )}
      
            {recommendations.tips.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-[#89B4FA] mb-3">Tips</h3>
                <ul className="space-y-3">
                  {recommendations.tips.map((tip, index) => (
                    <li
                      key={index}
                      className="rounded-2xl border border-[#89B4FA]/40 bg-[#89B4FA]/10 px-4 py-3"
                    >
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
        <div className="page-shell flex justify-center">
            <div className="glass rounded-2xl p-8 text-center max-w-lg">
                <h1 className="text-2xl font-bold text-[#CDD6F4] mb-2">No recommendations yet</h1>
                <p className="text-[#CDD6F4]/70">
                    Complete a few quizzes to unlock tailored guidance and insights.
                </p>
            </div>
        </div>
    );
}