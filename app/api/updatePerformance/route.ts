import { NextRequest, NextResponse } from "next/server";
import { updatePerformance } from "@/app/_backend/_quizModule/_src/_modules/performance";

export async function POST(request: NextRequest) {
  const req = await request.json();

  const { studentId, topic, correct, attempted, time } = req;

  updatePerformance(studentId, topic, correct, attempted, time);
  // Return success response
  return NextResponse.json({ success: true, message: "Data updated successfully" });
}
