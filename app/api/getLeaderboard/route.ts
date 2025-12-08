// this provides leaderboard data to frontend.
import { getLeaderboard } from "@/app/_backend/_quizModule/_src/_modules/leaderboard";
import { NextRequest, NextResponse } from "next/server";


// give data to frontend
export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const topic = url.searchParams.get("topic");
  
    if (topic) {
      const leaderboard = getLeaderboard(topic);
      return NextResponse.json({ success: true, leaderboard });
    }
  
    return NextResponse.json({ success: false, message: "Invalid request" });
}