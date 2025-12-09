import type { Question } from "../_types/questions";
import { updatePerformance } from "./performance";

function completeQuiz(studentId: string, topic: string, correct: number, attempted: number, time: number) {
  // Update performance data
  updatePerformance(studentId, topic, correct, attempted, time);
}


// Filter questions by topic and difficulty
export function getQuestions(questions: Question[], topic: string, difficulty: "Easy" | "Medium" | "Hard"): Question[] {
  return questions.filter((q) => q.topic === topic && q.difficulty === difficulty);
}

// Validate a user's answer
export function checkAnswer(question: Question, selectedOption: number): boolean {
  return question.correctAnswer === selectedOption;
}

// Calculate final score
export function calculateScore(userAnswers: { questionId: number; selectedOption: number }[], questions: Question[]): number {
  return userAnswers.reduce((score, answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    return question && checkAnswer(question, answer.selectedOption) ? score + 1 : score;
  }, 0);
}