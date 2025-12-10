"use client";

import { useGlobalStatesContext } from "../[username]/[studentId]/layout";

export default function Header() {
    const { isOpen, heading } = useGlobalStatesContext();

    return (
        <div
            className={`
                fixed top-0 left-0 right-0 px-4 py-3
                bg-[#252538]/80 backdrop-blur-sm
                border-b border-[#45475A]/30
                transition-all duration-300 z-40
            `}
            style={{
                marginLeft: isOpen ? "256px" : "80px",
            }}
        >
            <div className="flex justify-center items-center">
                <h1 className="text-2xl font-semibold text-[#CDD6F4]">{heading || "Dashboard"}</h1>
            </div>
        </div>
    );
}
