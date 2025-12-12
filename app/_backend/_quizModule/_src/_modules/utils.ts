// _modules/utils.ts
import { Question } from "../_types/questions";
import HashMap from "@/app/_datastructures/HashMap"
import data from "../_data/questions.json";

// Function to load questions from JSON into a HashMap (keyed by question ID)
export function loadQuestions(topic: string, difficulty: "Easy" | "Medium" | "Hard"): HashMap<number, Question> {
  const questionsMap = new HashMap<number, Question>();

  // Filter the questions based on the topic and difficulty
  data.forEach((question) => {
    if (question.topic === topic && question.difficulty === difficulty) {
      questionsMap.set(question.id, { ...question, difficulty: question.difficulty as "Easy" | "Medium" |"Hard" });
    }
  });

  return questionsMap;
}

// Shuffle the keys of the HashMap using a modified Fisher-Yates Algorithm
export function shuffleMap(map: HashMap<number, Question>): Question[] {
  const keys = Array.from(map.keys());  // Get an array of keys
  for (let i = keys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap the keys
    [keys[i], keys[j]] = [keys[j], keys[i]];
  }

  // Return the questions in shuffled order based on the shuffled keys
  return keys.map(key => map.get(key)!);
}
