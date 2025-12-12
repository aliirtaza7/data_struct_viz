"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function Page() {
    const [credentials, setCredentials] = useState({ studentId: '', password: '', username: '' });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await fetch('/api/checkLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const res = await response.json();

            if (res.success) {
                toast.success('Login successful!');
                router.push(`/${credentials.username}/${credentials.studentId}/dashboard`);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="animated-bg">
                <div className="blob-1"></div>
                <div className="blob-2"></div>
                <div className="blob-3"></div>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-md px-6 py-8 relative z-10">
                {/* Logo Section */}
                <div className="flex justify-center mb-8">
                    <div className="glass rounded-2xl p-6 shadow-2xl">
                        <Image 
                            src="/Main Logo.svg" 
                            alt="Data Struct Viz Logo" 
                            width={200} 
                            height={80}
                            className="w-auto h-auto"
                            priority
                        />
                    </div>
                </div>

                {/* Login Form */}
                <div className="glass rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-3xl font-bold text-center mb-2 text-[#CDD6F4]">
                        Welcome Back
                    </h2>
                    <p className="text-center mb-8 text-[#CDD6F4]/70">
                        Login in to continue your learning journey
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium mb-2 text-[#CDD6F4]">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                className="w-full px-4 py-3 bg-[#252538]/50 border border-[#45475A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#89B4FA] focus:border-transparent text-[#CDD6F4] placeholder-[#45475A] transition-all"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div>
                            <label htmlFor="studentId" className="block text-sm font-medium mb-2 text-[#CDD6F4]">
                                Student ID
                            </label>
                            <input
                                type="text"
                                id="studentId"
                                name="studentId"
                                required
                                value={credentials.studentId}
                                onChange={(e) => setCredentials({ ...credentials, studentId: e.target.value })}
                                className="w-full px-4 py-3 bg-[#252538]/50 border border-[#45475A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#89B4FA] focus:border-transparent text-[#CDD6F4] placeholder-[#45475A] transition-all"
                                placeholder="Enter your student ID"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2 text-[#CDD6F4]">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                className="w-full px-4 py-3 bg-[#252538]/50 border border-[#45475A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#89B4FA] focus:border-transparent text-[#CDD6F4] placeholder-[#45475A] transition-all"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-[#89B4FA] hover:bg-[#7AA3E8] rounded-lg text-[#1E1E2E] font-semibold focus:outline-none focus:ring-2 focus:ring-[#89B4FA] focus:ring-offset-2 focus:ring-offset-[#1E1E2E] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {isLoading ? 'logging in...' : 'Log In'}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => router.push('/signup')}
                                className="text-[#89B4FA] hover:text-[#7AA3E8] font-medium transition-colors"
                            >
                                Don't have an account? <span className="underline">Sign Up</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
