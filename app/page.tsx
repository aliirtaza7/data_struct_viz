"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] to-[#1E1E2E] flex items-center justify-center px-4 py-6 md:px-8 md:py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* App name header */}
        <header className="text-center py-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#CDD6F4]">Data Struct Viz</h1>
        </header>

        {/* Welcome section */}
        <section className="glass rounded-2xl p-6 md:p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#CDD6F4] mb-4">
            Welcome to Data Structures Visualizer
          </h1>
          <p className="text-[#CDD6F4]/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Explore and learn data structures through interactive visualizations, quizzes, and personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleLogin}
              className="glass border border-[#F38BA8]/60 hover:border-[#F38BA8] text-[#CDD6F4] font-semibold py-3 px-8 rounded-lg transition-all hover:bg-[#F38BA8]/10"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="glass border border-[#FAB387]/60 hover:border-[#FAB387] text-[#CDD6F4] font-semibold py-3 px-8 rounded-lg transition-all hover:bg-[#FAB387]/10"
            >
              Sign Up
            </button>
          </div>
        </section>

        {/* Features preview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-5 text-center">
            <h3 className="text-lg font-semibold text-[#CDD6F4] mb-2">
              Interactive Visualizations
            </h3>
            <p className="text-sm text-[#CDD6F4]/75">
              Dive into dynamic representations of data structures like trees, graphs, and more.
            </p>
          </div>
          <div className="glass rounded-2xl p-5 text-center">
            <h3 className="text-lg font-semibold text-[#CDD6F4] mb-2">
              Quizzes & Leaderboards
            </h3>
            <p className="text-sm text-[#CDD6F4]/75">
              Test your knowledge and compete with peers on various DSA topics.
            </p>
          </div>
          <div className="glass rounded-2xl p-5 text-center">
            <h3 className="text-lg font-semibold text-[#CDD6F4] mb-2">
              Personalized Recommendations
            </h3>
            <p className="text-sm text-[#CDD6F4]/75">
              Get tailored tips based on your performance and learning progress.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}