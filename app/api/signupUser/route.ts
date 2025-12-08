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
            { status: 400, message: 'Please provide username, student ID, and password.' },
            { status: 400 }
        );
    }

    const users = loadUsers();

    // Check if the username or studentId already exists
    if (users.some(user => user.username === username || user.studentId === studentId)) {
        return NextResponse.json(
            { status: 400, message: 'Username or Student ID already exists. Please choose a different one.' },
            { status: 400 }
        );
    }

    // Add the new user
    const newUser: User = { username, studentId, password };
    users.push(newUser);

    // Save the updated user list back to the JSON file
    fs.writeFileSync(USER_FILE, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: `Signup successful! Welcome, ${username}.` });
}
