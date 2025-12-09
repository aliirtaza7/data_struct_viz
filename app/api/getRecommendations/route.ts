import { NextRequest, NextResponse } from 'next/server';
import { analyzePerformance } from '@/app/_backend/_quizModule/_src/_modules/recommendation';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const studentId = url.searchParams.get("studentId");
  
    if (studentId) {
      const recommendations = analyzePerformance(studentId);
      return NextResponse.json({ success: true, recommendations });
    }
    return NextResponse.json({ success: false, message: "Invalid request" });

}