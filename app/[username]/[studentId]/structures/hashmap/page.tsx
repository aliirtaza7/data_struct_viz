"use client";

import React, { useEffect, useState } from "react";
import HashMap from "@/app/_datastructures/HashMap";
import { toast } from "react-toastify";
import { useGlobalStatesContext } from "../../layout";

export default function Page() {
    const [map] = useState(new HashMap<string, string>(10));
    const [, setRenderTrigger] = useState(0);
    const [entry, setEntry] = useState({ key: "", value: "" });
    const [removeKey, setRemoveKey] = useState("");
    const [newKey, setNewKey] = useState<string | null>(null);

    const forceRender = () => setRenderTrigger((prev) => prev + 1);

    const { setHeading } = useGlobalStatesContext();

    useEffect(() => {
        setHeading("Hash Map");
    }, []);

    const insertEntry = (key: string, value: string) => {
        map.set(key, value);
        setNewKey(key);
        forceRender();
        setTimeout(() => setNewKey(null), 2000);
    };

    const removeEntry = (key: string) => {
        const deleted = map.delete(key);
        forceRender();
        if (!deleted) {
            toast.error("Key not found");
        } else {
            toast.success("Entry removed successfully");
        }
    };

    return (
        <div
            className="page-shell flex flex-col items-center justify-center w-full p-6"
        >
            <div className="flex justify-center items-center mb-6">
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-4">Insert Entry</h2>
                    <input
                        type="text"
                        className="mb-3 w-full p-2 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Key"
                        value={entry.key}
                        onChange={(e) => setEntry((prev) => ({ ...prev, key: e.target.value }))}
                    />
                    <input
                        type="text"
                        className="mb-3 w-full p-2 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Value"
                        value={entry.value}
                        onChange={(e) => setEntry((prev) => ({ ...prev, value: e.target.value }))}
                    />
                    <button
                        onClick={() => insertEntry(entry.key, entry.value)}
                        className="py-2 px-4 w-full bg-blue-700 hover:bg-blue-600 rounded-md font-bold focus:outline-none focus:ring focus:ring-blue-400"
                    >
                        Insert Entry
                    </button>
                </div>

                {/* Remove Entry Section */}
                <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-4">Remove Entry</h2>
                    <input
                        type="text"
                        className="mb-3 w-full p-2 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring focus:ring-red-300"
                        placeholder="Enter key to remove"
                        value={removeKey}
                        onChange={(e) => setRemoveKey(e.target.value)}
                    />
                    <button
                        onClick={() => removeEntry(removeKey)}
                        className="py-2 px-4 w-full bg-red-700 hover:bg-red-600 rounded-md font-bold focus:outline-none focus:ring focus:ring-red-400"
                    >
                        Remove Entry
                    </button>
                </div>
            </div>

            {/* Map Display Section */}
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Current Entries</h2>
                <div className="divide-y divide-gray-300">
                    {map.map.map((entry, index) => (
                        <div
                            key={index}
                            className={`py-2 text-sm flex justify-between ${entry && entry[0] === newKey ? "bg-yellow-200" : "text-gray-700"}`}
                        >
                            {entry ? (
                                <>
                                    <span className="font-medium">Key:</span> {entry[0]}
                                    <span className="font-medium">Value:</span> {entry[1]}
                                </>
                            ) : (
                                <span className="text-gray-500">Empty</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}