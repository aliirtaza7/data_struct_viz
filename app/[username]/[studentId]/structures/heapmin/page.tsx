"use client";

import React, { useEffect, useState } from "react";
import MinHeap from "@/app/_datastructures/HeapMIn";
import { TreeNode } from "./TreeNode";
import { useGlobalStatesContext } from "../../layout";

export default function Page() {
    const [heap] = useState(new MinHeap());
    const [, setRenderTrigger] = useState(0);

    const triggerRender = () => setRenderTrigger((prev) => prev + 1);

    const { setHeading } = useGlobalStatesContext();

    useEffect(() => {
        setHeading("Min Heap");
    }, []);

    const insert = (value: number) => {
        heap.insert(value);
        triggerRender();
    };

    const deleteValue = (value: number) => {
        heap.deleteValue(value);
        triggerRender();
    };

    const renderHeap = () => {
        if (heap.size() === 0) return <div>No nodes in the Min Heap.</div>;

        return (
            <div className="flex justify-center">
                <TreeNode index={0} heap={heap} />
            </div>
        )
    }

    return (
        <div className="page-shell flex flex-col items-center justify-center w-full space-y-8">
            <div className="flex items-center justify-center space-x-4">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md"
                    onClick={() => insert(Math.floor(Math.random() * 100))}
                >
                    Insert Random Value
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md"
                    onClick={() => deleteValue(heap.peek() || 0)}
                >
                    Delete Min Value
                </button>
            </div>
            <div className="flex items-center justify-center space-x-4">
                {renderHeap()}
            </div>
        </div>
    );

}