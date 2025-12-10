"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiUser, FiSettings, FiHelpCircle } from "react-icons/fi";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const scrollableHeight = documentHeight - windowHeight;
            const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isAuthPage = pathname === '/login' || pathname === '/signup';

    if (isAuthPage) {
        return null;
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#45475A]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-4">
                        <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity flex items-center"
                            onClick={() => {
                                const pathParts = pathname.split('/');
                                if (pathParts.length >= 3) {
                                    router.push(`/${pathParts[1]}/${pathParts[2]}/dashboard`);
                                }
                            }}
                        >
                            <Image 
                                src="/Main Logo.svg" 
                                alt="Data Struct Viz Logo" 
                                width={120} 
                                height={40}
                                className="h-8 w-auto object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Animated Progress Line */}
                    <div className="flex-1 mx-8 hidden md:block">
                        <div className="relative h-1 bg-[#45475A]/30 rounded-full overflow-hidden">
                            <div 
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#89B4FA] via-[#A6E3A1] to-[#F9E2AF] rounded-full transition-all duration-300"
                                style={{ width: `${scrollProgress}%` }}
                            />
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => {
                                const pathParts = pathname.split('/');
                                if (pathParts.length >= 3) {
                                    router.push(`/${pathParts[1]}/${pathParts[2]}/dashboard`);
                                }
                            }}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#252538]/50 transition-colors text-[#CDD6F4]"
                        >
                            <FiUser className="w-5 h-5" />
                            <span className="hidden sm:inline">My Account</span>
                        </button>
                        <button
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#252538]/50 transition-colors text-[#CDD6F4]"
                        >
                            <FiSettings className="w-5 h-5" />
                            <span className="hidden sm:inline">Settings</span>
                        </button>
                        <button
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#252538]/50 transition-colors text-[#CDD6F4]"
                        >
                            <FiHelpCircle className="w-5 h-5" />
                            <span className="hidden sm:inline">Help</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

