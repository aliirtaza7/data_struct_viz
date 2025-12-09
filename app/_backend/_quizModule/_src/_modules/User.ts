import fs from 'fs';

type User = {
    username: string;
    studentId: string;
    password: string;
};

const USER_FILE = './app/_backend/_quizModule/_src/_data/users.json';

function login(username: string, studentId: string, password: string): string {
    try {
        // Read the users.json file
        const data = fs.readFileSync(USER_FILE, 'utf-8');
        const users: User[] = JSON.parse(data);

        // Find the user with the given username, studentId, and password
        const user = users.find(
            (user) =>
                user.username === username &&
                user.studentId === studentId &&
                user.password === password
        );

        if (user) {
            return `Login successful! Welcome, ${user.username}.`;
        } else {
            return 'Invalid username, student ID, or password.';
        }
    } catch (error) {
        console.error('Error reading users.json:', error);
        return 'An error occurred while processing the login.';
    }
}

function signup(username: string, studentId: string, password: string): string {
    try {
        // Read the users.json file
        const data = fs.readFileSync(USER_FILE, 'utf-8');
        const users: User[] = JSON.parse(data);

        // Check if the username or studentId already exists
        if (
            users.some(
                (user) =>
                    user.username === username || user.studentId === studentId
            )
        ) {
            return 'Username or Student ID already exists. Please choose a different username or student ID.';
        }

        // Add the new user
        const newUser: User = { username, studentId, password };
        users.push(newUser);

        // Write the updated users list back to the file
        fs.writeFileSync(USER_FILE, JSON.stringify(users, null, 2));

        return `Signup successful! Welcome, ${username}.`;
    } catch (error) {
        console.error('Error reading or writing users.json:', error);
        return 'An error occurred while processing the signup.';
    }
}

