"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { useGlobalStatesContext } from "../[username]/[studentId]/layout";
import { PiSignOut, PiTreeStructureThin } from "react-icons/pi";
import { CgOptions } from "react-icons/cg";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlineLeaderboard, MdOutlineTipsAndUpdates } from "react-icons/md";
import { useState } from "react";
import { RxDashboard } from "react-icons/rx";

export default function Sidebar() {
    const [topic, setTopic] = useState("Arrays");
    const { username, studentId } = useParams();
    const { isOpen, setIsOpen } = useGlobalStatesContext();
    const router = useRouter();
    const pathname = usePathname();

    const isAuthPage = pathname === '/login' || pathname === '/signup';

    if (isAuthPage) {
        return null;
    }

    const menuItems = [
        {
            icon: <RxDashboard size={24} />,
            label: "Dashboard",
            path: `/${username}/${studentId}/dashboard`,
        },
        {
            icon: <PiTreeStructureThin size={24} />,
            label: "Visualize Structures",
            path: `/${username}/${studentId}/menu`,
        },
        {
            icon: <FaBookOpen size={24} />,
            label: "Take A Quiz",
            path: `/${username}/${studentId}/quiz`,
        },
        {
            icon: <MdOutlineLeaderboard size={24} />,
            label: "View Leaderboard",
            path: `/${username}/${studentId}/quiz/leaderboard?topic=${topic}`,
            hasDropdown: true,
        },
        {
            icon: <MdOutlineTipsAndUpdates size={24} />,
            label: "Get Recommendations",
            path: `/${username}/${studentId}/quiz/recommendations?studentId=${studentId}`,
        },
    ];

    const isActive = (path: string) => {
        if (path.includes('?')) {
            return pathname.startsWith(path.split('?')[0]);
        }
        return pathname === path;
    };

    return (
        <aside
            className={`
                ${isOpen ? "w-64" : "w-20"} 
                h-screen fixed top-0 left-0 z-40
                bg-[#252538] border-r border-[#45475A]/30
                transition-all duration-300 ease-in-out
                flex flex-col
                shadow-xl
            `}
        >
            {/* Toggle Button */}
            <div className="flex items-center justify-between p-4 border-b border-[#45475A]/30">
                {isOpen ? (
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2">
                            <CgOptions className="text-[#89B4FA]" size={20} />
                            <span className="text-[#CDD6F4] font-semibold text-sm">Menu</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg hover:bg-[#1E1E2E]/50 text-[#CDD6F4] hover:text-[#89B4FA] transition-colors"
                            aria-label="Collapse sidebar"
                        >
                            <BiArrowToLeft size={20} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-lg hover:bg-[#1E1E2E]/50 text-[#CDD6F4] hover:text-[#89B4FA] transition-colors mx-auto"
                        aria-label="Expand sidebar"
                    >
                        <BiArrowToRight size={20} />
                    </button>
                )}
            </div>

            {/* Welcome Section */}
            {isOpen && (
                <div className="p-4 border-b border-[#45475A]/30">
                    <div className="text-sm text-[#CDD6F4]/70 mb-1">Welcome back,</div>
                    <div className="text-lg font-semibold text-[#CDD6F4] truncate">
                        {username}
                    </div>
                </div>
            )}

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto py-4 px-2">
                <div className="space-y-2">
                    {menuItems.map((item, index) => (
                        <div key={index}>
                            <button
                                onClick={() => {
                                    if (!item.hasDropdown) {
                                        router.push(item.path);
                                    }
                                }}
                                className={`
                                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                                    transition-all duration-200
                                    ${
                                        isActive(item.path)
                                            ? "bg-[#89B4FA]/20 text-[#89B4FA] border-l-4 border-[#89B4FA]"
                                            : "text-[#CDD6F4] hover:bg-[#1E1E2E]/50 hover:text-[#89B4FA]"
                                    }
                                    ${!isOpen ? "justify-center" : ""}
                                `}
                            >
                                <span className={isActive(item.path) ? "text-[#89B4FA]" : ""}>
                                    {item.icon}
                                </span>
                                {isOpen && (
                                    <span className="font-medium text-sm flex-1 text-left">
                                        {item.label}
                                    </span>
                                )}
                            </button>
                            {item.hasDropdown && isOpen && (
                                <div className="mt-2 ml-4">
                                    <select
                                        onChange={(e) => {
                                            setTopic(e.target.value);
                                            router.push(`/${username}/${studentId}/quiz/leaderboard?topic=${e.target.value}`);
                                        }}
                                        value={topic}
                                        className="w-full px-3 py-2 bg-[#1E1E2E]/50 border border-[#45475A] rounded-lg text-[#CDD6F4] text-sm focus:outline-none focus:ring-2 focus:ring-[#89B4FA] focus:border-transparent"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <option value="Arrays">Arrays</option>
                                        <option value="Stacks">Stacks</option>
                                        <option value="Queues">Queues</option>
                                        <option value="Linked Lists">Linked Lists</option>
                                        <option value="Trees">Trees</option>
                                        <option value="Graphs">Graphs</option>
                                        <option value="Sorting">Sorting Algorithms</option>
                                        <option value="Searching">Searching Algorithms</option>
                                        <option value="Heap Sort">Heaps</option>
                                        <option value="Dynamic Programming">Dynamic Programming</option>
                                        <option value="Recursion">Recursion</option>
                                        <option value="Hashing">Hashing</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </nav>

            {/* Sign Out Button */}
            <div className="p-4 border-t border-[#45475A]/30">
                <button
                    onClick={() => router.push("/login")}
                    className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                        bg-[#F38BA8]/20 text-[#F38BA8] hover:bg-[#F38BA8]/30
                        transition-all duration-200
                        ${!isOpen ? "justify-center" : ""}
                    `}
                >
                    <PiSignOut size={20} />
                    {isOpen && <span className="font-medium text-sm">Sign Out</span>}
                </button>
            </div>
        </aside>
    );
}
