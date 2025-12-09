import { loadPerformanceData } from "./performance";
import fs from "fs";

// const TIPS_FILE = "./app/_backend_data/tips.json";
const TIPS_FILE = "app/_backend/_quizModule/_src/_data/tips.json";
interface TipData {
  [topic: string]: string;
}

// Load predefined tips
function loadTips(): TipData {
  return JSON.parse(fs.readFileSync(TIPS_FILE, "utf-8"));
}

// Analyze performance and classify topics
export function analyzePerformance(studentId: string): {
  weakTopics: { topic: string; threshold: number }[];
  moderateTopics: { topic: string; threshold: number }[];
  strongTopics: { topic: string; threshold: number }[];
  tips: string[];
} 

{
  const performance = loadPerformanceData();
  const tips = loadTips();

  // If student has no performance data, return empty recommendations
  if (!performance[studentId]) {
    return { weakTopics: [], moderateTopics: [], strongTopics: [], tips: [] };
  }

  const topics = performance[studentId].topics;
  const weakTopics: { topic: string; threshold: number }[] = [];
  const moderateTopics: { topic: string; threshold: number }[] = [];
  const strongTopics: { topic: string; threshold: number }[] = [];
  const improvementTips: string[] = [];

  Object.keys(topics).forEach((topic) => {
    const { correct, attempted, time, difficulty } = topics[topic] as unknown as {
      correct: number;
      attempted: number;
      time: number;
      difficulty: string;
    };
    const accuracy = correct / attempted;
    const maxTime = 60; // Maximum time allowed per question (in seconds)
    const remTime = (60*attempted - time); // Remaining time for the student
    const normalizedAccuracy = accuracy * 100; // Convert accuracy to percentage
    const normalizedTime = (remTime/(maxTime*attempted))*100; // Cap the time to the max time per difficulty

    // Calculate threshold
    
    let threshold = (0.3 * normalizedTime) + (0.7 * normalizedAccuracy);
    if (difficulty === "hard") {
        threshold = threshold + 5;
    } else if (difficulty === "medium") {
        threshold = threshold + 3;
    }

    if (threshold < 60) {
      weakTopics.push({ topic, threshold });
      improvementTips.push(tips[topic.toLowerCase()] || "Practice more questions for this topic.");
    } else if (threshold >= 60 && threshold < 80) {
      moderateTopics.push({ topic, threshold });
    } else {
      strongTopics.push({ topic, threshold });
    }
    //testing
  });

  return { weakTopics, moderateTopics, strongTopics, tips: improvementTips };
}
