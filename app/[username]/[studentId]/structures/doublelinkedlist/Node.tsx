import { useEffect } from "react";
import { ListNode } from "../../../../_datastructures/DoubleLinkedList";

type NodeProps = {
    node: ListNode<number>;
    index: number;
    svgRef: React.RefObject<SVGSVGElement>;
    renderTrigger: number;
};


export default function Node({ node, index, svgRef, renderTrigger }: NodeProps) {
   useEffect(() => {
    node.index= index;
   }, [index, node]);

   useEffect(() => {
        if (!svgRef.current) return;

        const svg = svgRef.current;
        const currentRect = document.getElementById(`${index}`)?.getBoundingClientRect();
        if (!currentRect) return;

        if (node.next) {
            const nextRect = document.getElementById(`${node.next.index}`)?.getBoundingClientRect();
            if (!nextRect) return;

            const path = createPath(
                currentRect.right + currentRect.width / 2,
                currentRect.bottom + currentRect.height / 2,
                nextRect.left + nextRect.width / 2,
                nextRect.bottom + nextRect.height / 2
            );

            const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathElement.setAttribute("d", path);
            pathElement.setAttribute("stroke", "black");
            pathElement.setAttribute("fill", "transparent");
            pathElement.setAttribute("strokeWidth", "4");
            pathElement.setAttribute("id", `${index}-${node.next.index}`);
            pathElement.setAttribute("markerEnd", "url(#arrowhead)");

            svg.appendChild(pathElement);
        }
    }, [node, index, renderTrigger]);

    const createPath = (x1: number, y1: number, x2: number, y2: number) => {
        return `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
    };

    return (
        <div
            key={index}
            id={`${index}`}
            className="flex items-center justify-center relative"
        >
            <div className="flex justify-center items-center p-4 border-4 border-green-500 rounded-lg bg-green-100 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg relative text-black">
            <span className="value">{node.data}</span>
            </div>
            {/* {!!node.next && (
            <div className="flex justify-center items-center text-3xl text-green-500">
                →
            </div>
            )} */}
        </div>
    );
}