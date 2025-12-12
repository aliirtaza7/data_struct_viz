"use client";

import Header from "@/app/_components/Header";
import Sidebar from "@/app/_components/Sidebar";
import { createContext, ReactNode, useContext, useState } from "react";

type StructuresLayoutProps = {
    children: ReactNode;
};

type GlobalStatesType = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    heading: string;
    setHeading: React.Dispatch<React.SetStateAction<string>>;
};

const GlobalStatesContext = createContext<GlobalStatesType | undefined>(undefined);

export const useGlobalStatesContext = () => {
    const context = useContext(GlobalStatesContext);
    if (!context) {
        throw new Error("useGlobalStatesContext must be used within a GlobalStatesProvider");
    }
    return context;
}

export default function StructuresLayout({ children }: StructuresLayoutProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [heading, setHeading] = useState("");
    
    return (
        <GlobalStatesContext.Provider value={{ isOpen, setIsOpen, heading, setHeading }}>
            <div className="min-h-screen bg-[#1E1E2E]">
                <div className="flex">
                    <Sidebar />
                    <div className="flex flex-col flex-1 min-h-screen">
                        <Header />
                        <main 
                            className="flex-1 overflow-y-auto overflow-x-hidden"
                            style={{
                                marginTop: '64px',
                                marginLeft: isOpen ? '256px' : '80px',
                                transition: 'margin-left 0.3s ease-in-out',
                                minHeight: 'calc(100vh - 64px)',
                            }}
                        >
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </GlobalStatesContext.Provider>
    )
}