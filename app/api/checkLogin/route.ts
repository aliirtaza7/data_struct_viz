// this API route is responsible for checking if the user's login
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

type User = {
    username: string;
    studentId: string;
    password: string;
};

const USER_FILE = './app/_backend/_quizModule/_src/_data/users.json';

function loadUsers(): User[] {
    try {
        const data = fs.readFileSync(USER_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users.json:', error);
        return [];
    }
}

export async function POST(request: NextRequest) {
    const req = await request.json();
    const { username, studentId, password } = req;

    // Check if all required fields are provided
    if (!username || !studentId || !password) {
        return NextResponse.json(
            { message: 'Please provide username, student ID, and password.' },
            { status: 400 }
        );
    }

    const users = loadUsers();

    // Find the user with the given username, studentId, and password
    const user = users.find(user => user.username === username && user.studentId === studentId && user.password === password);

    if (user) {
        return NextResponse.json({
            success: true,
            message: `Login successful! Welcome, ${user.username}.`,
        });
    } else {
        return NextResponse.json(
            { success: false, message: 'Invalid username, student ID, or password.' },
            { status: 401 }
        );
    }
}
