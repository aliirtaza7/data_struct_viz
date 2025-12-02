# Data Struct Viz

**Data Struct Viz** is a learning platform for **Data Structures and Algorithms (DSA)** that combines interactive visualizations, practice quizzes, leaderboard tracking, and personalized recommendations to help students understand and master DSA concepts.

---

## Table of Contents
- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
Learning DSA can be challenging without proper visualization and practice. **Data Struct Viz** aims to make learning interactive and personalized by providing:

- Visual representations of data structures
- Adaptive quizzes for testing understanding
- Leaderboards to motivate students
- Personalized recommendations based on performance

This platform is ideal for students, competitive programmers, and anyone looking to strengthen their understanding of DSA concepts.

---

## Core Features

- **Interactive Visualizers**  
  Visualize common data structures like:  
  - Trees  
  - Graphs  
  - Heaps  
  - Linked Lists  
  - Queues & Stacks  
  - Hash Tables  

- **Quiz System**  
  - Timed and adaptive quizzes  
  - Performance tracking  
  - Leaderboards for motivation  

- **Recommendation Engine**  
  - Suggests practice topics based on student performance  

- **Persistence**  
  - Simple JSON-based storage for users, questions, leaderboard, and performance  

- **Authentication & Dynamic Routes**  
  - Each student has personalized routes: `/[username]/[studentId]`  

---

## Tech Stack
- Frontend: HTML, CSS, JavaScript (or React/Vue if applicable)  
- Backend: Node.js / Express (or specify your backend)  
- Data Storage: JSON-based persistence  
- Authentication: JWT or session-based (depending on implementation)  


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
