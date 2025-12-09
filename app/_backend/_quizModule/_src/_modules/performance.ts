import fs from "fs";

// Interface for performance data
interface TopicPerformance {
  topic: string;
  correct: number;
  attempted: number;
  time: number; // Total time spent on the topic
}


interface StudentPerformance {
  [studentId: string]: {
    topics: { [topic: string]: TopicPerformance };
  };
}

const PERFORMANCE_FILE = "./app/_backend/_quizModule/_src/_data/performance.json";

// Load performance data
export function loadPerformanceData(): StudentPerformance {
  if (!fs.existsSync(PERFORMANCE_FILE)) return {};
  const data = fs.readFileSync(PERFORMANCE_FILE, "utf-8");
  return JSON.parse(data) as StudentPerformance;
}

// Save updated performance datA
export function savePerformanceData(data: StudentPerformance): void {
  fs.writeFileSync(PERFORMANCE_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// Update performance after a quiz
export function updatePerformance(
  studentId: string,
  topic: string,
  correct: number,
  attempted: number,
  time: number
): void {
  const performance = loadPerformanceData();
  if (!performance[studentId]) performance[studentId] = { topics: {} };

  performance[studentId].topics[topic] = {
    topic, 
    correct: (performance[studentId].topics[topic]?.correct || 0) + correct,
    attempted: (performance[studentId].topics[topic]?.attempted || 0) + attempted,
    time: (performance[studentId].topics[topic]?.time || 0) + time,
  };

  savePerformanceData(performance);
}
