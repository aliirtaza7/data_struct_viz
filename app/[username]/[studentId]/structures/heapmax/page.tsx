"use client";

import React, { useEffect, useRef, useState } from "react";
import MaxHeap from "@/app/_datastructures/HeapMax";
import { TreeNode } from "./TreeNode";
import { useGlobalStatesContext } from "../../layout";

export default function Page() {
    const [heap] = useState(new MaxHeap());
    const [, setRenderTrigger] = useState(0);

    const svgRef = useRef<SVGSVGElement>(null);

    const triggerRender = () => setRenderTrigger((prev) => prev + 1);

    const { setHeading } = useGlobalStatesContext();

    useEffect(() => {
        setHeading("Max Heap");
    }, []);

    const insert = (value: number) => {
        heap.insert(value);
        triggerRender();
    };

    const deleteValue = (value: number) => {
        const index = heap.deleteValue(value);
        svgRef.current?.getElementById(`${index}`)?.remove();
        triggerRender();
    };

    const renderHeap = () => {
        if (heap.size() === 0) return <div>No nodes in the Max Heap.</div>;

        return (
            <div className="flex justify-center">
                <TreeNode index={0} heap={heap} svgRef={svgRef}/>
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
                    Delete Max Value
                </button>
            </div>
            <div className="flex items-start justify-center w-screen h-screen overflow-scroll" id="scrollable-tree">
                {renderHeap()}
                <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none", zIndex: -1, top: 0, left: 0 }}></svg>
            </div>
        </div>
    );

}