"use server";

import readline from "readline";
import { loadQuestions, shuffleMap } from "./_modules/utils";
import { calculateScore } from "./_modules/quiz";

// Console interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Main function to start the quiz
export async function main(topic: string, difficulty: "Easy" | "Medium" | "Hard", answer: number, numQuestions: 5 | 10) {
  console.log("Welcome to the DSA Quiz!");

  // Load the questions directly into the 'questionsMap' (HashMap)
  const questionsMap = loadQuestions(topic, difficulty);

  if (questionsMap.size() === 0) {
    console.log("No questions available for the chosen topic and difficulty.");
    rl.close();
    return;
  }

  // Step 1: Shuffle the questions using the modified Fisher-Yates algorithm
  const shuffledQuestions = shuffleMap(questionsMap);

  // Step 2: Select the required number of questions (5 or 10)
  const selectedQuestions = shuffledQuestions.slice(0, numQuestions);

  // Step 3: Conduct the quiz
  const userAnswers: { questionId: number; selectedOption: number }[] = [];
  for (const question of selectedQuestions) {
    console.log(`\n${question.questionText}`);
    question.options.forEach((option, index) => console.log(`${index + 1}. ${option}`));

    // Simulate user answer (you can replace this with actual user input)
    userAnswers.push({ questionId: question.id, selectedOption: answer });
  }

  // Step 4: Calculate the final score
  const score = calculateScore(userAnswers, selectedQuestions);
  console.log(`\nYour final score is: ${score}/${selectedQuestions.length}`);
  rl.close();
  return selectedQuestions;
}
