"use client";

import React, { useEffect, useRef, useState } from "react";

import CircularLinkedList, { ListNode } from "@/app/_datastructures/CircularLinkedList";
import { useGlobalStatesContext } from "../../layout";

export default function Page() {
  const [cll] = useState(new CircularLinkedList<number>());
  const [renderTrigger, setRenderTrigger] = useState(0);

  const svgRef = useRef<SVGSVGElement>(null);

  const { setHeading } = useGlobalStatesContext();

  useEffect(() => {
    setHeading("Circular Linked List");
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    if (svgRef.current.getElementById("path")) {
      svgRef.current.removeChild(svgRef.current.getElementById("path"));
    }

    const firstNode = document.getElementById("0");
    if (!firstNode) return;

    const lastNode = document.getElementById(`${cll.size - 1}`);
    if (!lastNode) return;

    const firstNodeRect = firstNode.getBoundingClientRect();
    const lastNodeRect = lastNode.getBoundingClientRect();

    const path = createPath(
      lastNodeRect.right,
      lastNodeRect.top + lastNodeRect.height / 2,
      firstNodeRect.left,
      firstNodeRect.top + firstNodeRect.height / 2
    );

    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElement.setAttribute("d", path);
    pathElement.setAttribute("stroke", "black");
    pathElement.setAttribute("fill", "transparent");
    pathElement.setAttribute("strokeWidth", "4");
    pathElement.setAttribute("id", "path");
    pathElement.setAttribute("marker-end", "url(#arrowhead)");

    svgRef.current.appendChild(pathElement);
  }, [renderTrigger])

  const triggerRender = () => setRenderTrigger((prev) => prev + 1);

  const createPath = (x1: number, y1: number, x2: number, y2: number) => {
    const controlOffset = 200; // Height of the curve above the nodes
    const horizontalOffset = 250; // Horizontal distance for control points

    // Control point near the last node (higher and to the right)
    const controlPointX1 = x1 + horizontalOffset;
    const controlPointY1 = Math.min(y1, y2) - controlOffset;

    // Control point near the first node (higher and to the left)
    const controlPointX2 = x2 - horizontalOffset;
    const controlPointY2 = Math.min(y1, y2) - controlOffset;

    return `M ${x1} ${y1} 
            C ${controlPointX1} ${controlPointY1}, 
              ${controlPointX2} ${controlPointY2}, 
              ${x2} ${y2}`;
  };


  const addNode = (value: number) => {
    cll.add(value);
    triggerRender();
  };

  const removeNode = (value: number) => {
    cll.remove(value);
    triggerRender();
  };

  const renderNodes = () => {
    if (!cll.head) return <div>No nodes in the Circular Linked List.</div>;

    const nodes: ListNode<number>[] = [];
    let current = cll.head;

    // Loop through the CLL starting from the head.
    do {
      if (!current) break;
      nodes.push(current);
      current = current.next!;
    } while (current !== cll.head);

    return nodes.map((node, index) => (
      <div
        key={index}
        className="flex items-center justify-center relative"
        id={`${index}`}
      >
        <div className="flex justify-center items-center border-4 border-green-500 rounded-lg bg-green-100 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg relative">
          <span className="value">{node.data}</span>
        </div>
        {node.next !== cll.head && (
          <div className="flex justify-center items-center text-3xl text-black">
            →
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="page-shell flex flex-col w-full justify-center items-center overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full relative space-y-8">
        <div className="flex items-center justify-center">
          {renderNodes()}
        </div>
        <div className="flex justify-center items-center mt-10 space-x-6">
          <button
            className="bg-red-600 text-white w-28 h-12 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all"
            onClick={() => addNode(10)}
          >
            Add Node
          </button>
          <button
            className="bg-red-600 text-white w-28 h-16 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all"
            onClick={() => removeNode(10)}
          >
            Remove Node
          </button>
        </div>
      </div>
      <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none", zIndex: 10, top: 0, left: 0 }}>
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="10"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="black" />
              </marker>
            </defs>
          </svg>
    </div>
  );
}
