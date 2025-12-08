import fs from "fs";

const LEADERBOARD_FILE = "./app/_backend/_quizModule/_src/_data/leaderboard.json";

export type ScoreNode = {
  studentId: string;
  score: number;
  topic: string;
  left: ScoreNode | null;
  right: ScoreNode | null;
};

class BST {
  root: ScoreNode | null = null;

  insert(studentId: string, score: number, topic: string) {
    const newNode: ScoreNode = { studentId, score, topic, left: null, right: null };
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  private insertNode(node: ScoreNode, newNode: ScoreNode) {
    if (newNode.score > node.score) {
      if (!node.left) node.left = newNode;
      else this.insertNode(node.left, newNode);
    } else {
      if (!node.right) node.right = newNode;
      else this.insertNode(node.right, newNode);
    }
  }

  toSortedArray(): ScoreNode[] {
    const result: ScoreNode[] = [];
    this.inOrderTraversal(this.root, result);
    return result;
  }

  private inOrderTraversal(node: ScoreNode | null, result: ScoreNode[]) {
    if (node) {
      this.inOrderTraversal(node.left, result); // Traverse left subtree
      result.push(node); // Visit node
      this.inOrderTraversal(node.right, result); // Traverse right subtree
    }
  }
}

// Load and save leaderboard data
function loadLeaderboard(): ScoreNode[] {
  if (!fs.existsSync(LEADERBOARD_FILE)) return [];
  return JSON.parse(fs.readFileSync(LEADERBOARD_FILE, "utf-8"));
}

function saveLeaderboard(data: ScoreNode[]) {
  fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(data, null, 2));
}

// Update leaderboard
export function updateLeaderboard(studentId: string, score: number, topic: string) {
  const existingScores = loadLeaderboard();
  let isUpdated = false;

  for (let i = 0; i < existingScores.length; i++) {
    if (existingScores[i].studentId === studentId && existingScores[i].topic === topic) {
      // Update the score if the new score is higher
      if (score > existingScores[i].score) {
        existingScores[i].score = score;
      }
      isUpdated = true;
      break;
    }
  }

  // If the student or topic is not found, add the new score
  if (!isUpdated) {
    existingScores.push({ studentId, score, topic, left: null, right: null });
  }

  // Save updated leaderboard to file
  saveLeaderboard(existingScores);
}


// Get leaderboard
export function getLeaderboard(topic: string): ScoreNode[] {
  const allScores = loadLeaderboard();

  // Build a BST from the scores for the specific topic
  const bst = new BST();
  allScores
    .filter((score) => score.topic === topic)
    .forEach(({ studentId, score, topic }) => {
      bst.insert(studentId, score, topic);
    });

  // Use in-order traversal to get scores sorted in descending order
  return bst.toSortedArray();
}