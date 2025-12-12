import MaxHeap from "@/app/_datastructures/HeapMax";
import { useEffect } from "react";

type TreeNodeProps = {
    index: number;
    heap: MaxHeap;
    svgRef: React.RefObject<SVGSVGElement>;
};

export const TreeNode:React.FC<TreeNodeProps> = ({ index, heap, svgRef }) => {
    if (index >= heap.size()) {
        return null;
    }

    useEffect(() => {
        if (index === 0) {
            return;
        }

        const parentIndex = Math.floor((index - 1) / 2);

        const parent = document.getElementById(parentIndex.toString());
        const current = document.getElementById(index.toString());

        if (!parent || !current) {
            return;
        }

        let parentRect = parent.getBoundingClientRect();
        let currentRect = current.getBoundingClientRect();

        const path = createPath(
            parentRect.left + parentRect.width / 2, // X center of parent node
            currentRect.top + scrollY, // Y top of current node
            currentRect.left + currentRect.width / 2, // X center of current node
            parentRect.bottom + scrollY, // Y bottom of parent node
        );

        const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement.setAttribute("d", path);
        pathElement.setAttribute("stroke", "black");
        pathElement.setAttribute("fill", "transparent");
        pathElement.setAttribute("strokeWidth", "4");
        pathElement.setAttribute("id", index.toString());

        svgRef.current?.appendChild(pathElement);
    }, [index])

    const createPath = (x1: number, y1: number, x2: number, y2: number) => {
        return `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
    };

    return (
        <div id={index.toString()} className="flex flex-col items-center">
            {/* Current Node */}
            <div
                className={`flex justify-center items-center p-4 border-4 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg text-black ${
                    index === 0
                        ? "border-red-500 bg-red-100"
                        : "border-green-500 bg-green-100"
                }`}
            >
                <span>{heap.heap[index]}</span>
            </div>

            {/* Left and Right Children */}
            <div className="flex gap-4 mt-4">
                {/* Left Child */}
                <TreeNode index={2 * index + 1} heap={heap} svgRef={svgRef}/>
                {/* Right Child */}
                <TreeNode index={2 * index + 2} heap={heap} svgRef={svgRef}/>
            </div>
        </div>
    );
};