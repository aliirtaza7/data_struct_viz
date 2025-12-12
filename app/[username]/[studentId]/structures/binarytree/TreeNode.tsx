import React, { useEffect } from "react";
import { TreeNode as TreeNodeClass } from "@/app/_datastructures/BinaryTree";

type TreeNodeProps = {
    node: TreeNodeClass<number> | null;
    index: number;
    type: "left" | "right" | "root";
    svgRef: React.RefObject<SVGSVGElement>;
    renderTrigger: number;
    currentIndex: number;
    scrollY: number;
    newNode: number | null;
    visitedNodes: number[];
};

export const TreeNode: React.FC<TreeNodeProps> = ({ index, node, type, svgRef, renderTrigger, currentIndex, scrollY, newNode, visitedNodes }) => {

    useEffect(() => {
        if (node) {
            node.index=index
        }
    }, [renderTrigger])

    useEffect(() => {
        if (type === "root") return; // Root node has no parent

        // Parent index calculation
        const parentIndex = Math.floor((index - 1) / 2);

        // Get parent node element
        const parentNode = document.getElementById(`${parentIndex}`);
        if (!parentNode) return;

        // Get current node element
        const currentNode = document.getElementById(`${index}`);
        if (!currentNode) return;

        const parentRect = parentNode.getBoundingClientRect();
        const currentRect = currentNode.getBoundingClientRect();

        // Create path from current node to parent node
        const path = createPath(
            parentRect.left + parentRect.width / 2, // X center of parent node
            parentRect.bottom + scrollY, // Y bottom of parent node
            currentRect.left + currentRect.width / 2, // X center of current node
            currentRect.top + scrollY // Y top of current node
        );

        if (svgRef.current && path) {
            const oldPathElement = svgRef.current.getElementById(`${index}`); // Get the old path element);
            if (oldPathElement) {
                svgRef.current.removeChild(oldPathElement); // Removes the path from the SVG
            }
            const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathElement.setAttribute("d", path);
            pathElement.setAttribute("stroke", "white");
            pathElement.setAttribute("fill", "transparent");
            pathElement.setAttribute("strokeWidth", "4");
            pathElement.setAttribute("id", `${index}`);
            pathElement.setAttribute("marker-end", "url(#arrowhead)");

            svgRef.current.appendChild(pathElement);
        }
    }, [index, type, renderTrigger]);

    const createPath = (x1: number, y1: number, x2: number, y2: number) => {
        return `M ${x1} ${y1} L ${x2} ${y2}`;
    };

    if (!node) return null;

    return (
        <div className="relative flex flex-col items-center w-full h-full">
            {/* Current Node */}
            <div
                id={`${index}`}
                className={`flex justify-center items-center p-4 border-4 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg text-black ${type==="left" && "left-4"} ${type==="right" && "right-4"} ${index===currentIndex ? "border-yellow-500 bg-yellow-100 pulse" : ""} ${visitedNodes.includes(index) && index !== currentIndex ? "border-blue-500 bg-blue-100" : ""} ${newNode === node.data && "border-yellow-500 bg-yellow-200"} ${
                    (index === 0 && index !== currentIndex && !visitedNodes.includes(index))
                        ? "border-red-500 bg-red-100"
                        : "border-green-500 bg-green-100"
                }`}
            >
                <span>{node.count>1 ? `${node.data} (${node.count})` : node.data}</span>
            </div>

            {/* Left and Right Children */}
            <div className="flex gap-12 mt-6 justify-center">
                {node.left && <TreeNode index={2 * index + 1} node={node.left} type="left" svgRef={svgRef} renderTrigger={renderTrigger} currentIndex={currentIndex} scrollY={scrollY} newNode={newNode} visitedNodes={visitedNodes}/>}
                {node.right && <TreeNode index={2 * index + 2} node={node.right} type="right" svgRef={svgRef} renderTrigger={renderTrigger} currentIndex={currentIndex} scrollY={scrollY} newNode={newNode} visitedNodes={visitedNodes}/>}
            </div>
        </div>
    );
};
