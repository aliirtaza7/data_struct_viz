"use client";

import React, { useEffect, useRef, useState } from "react";

import DoublyLinkedList, { ListNode } from "@/app/_datastructures/DoubleLinkedList";
import Node from "./Node";
import { useGlobalStatesContext } from "../../layout";

export default function Page() {
  const [list] = useState(new DoublyLinkedList<number>());
  const [renderTrigger, setRenderTrigger] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const { setHeading } = useGlobalStatesContext();

  useEffect(() => {
    setHeading("Doubly Linked List");
  }, []);

  const triggerRender = () => setRenderTrigger((prev) => prev + 1);

  const addNode = (value: number) => {
    list.addFirst(value);
    triggerRender();
  };

  const removeNode = (value: number) => {
    list.remove(value);
    triggerRender();
  };

  const renderNodes = () => {
    if (!list.head) return <div>No nodes in the Linked List.</div>;

    const nodes: ListNode<number>[] = [];
    let current : ListNode<number> | null = list.head;

    // Loop through the CLL starting from the head.
    do {
      if (!current) break;
      nodes.push(current);
      current = current.next;
    } while (current!==null);

    return nodes.map((node, index) => (
      <Node node={node} index={index} svgRef={svgRef} renderTrigger={renderTrigger}/>
    ));
  };

  return (
    <div className="page-shell flex flex-col w-full justify-center items-center overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full h-full relative space-y-8">
        <div className="flex items-center justify-center gap-x-8">
            {renderNodes()}
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
        <div className="flex justify-center items-center mt-10 space-x-6">
          <button
            className="bg-red-600 text-white w-28 h-12 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all"
            onClick={() => addNode(10)}
          >
            Add Node
          </button>
          <button
            className="bg-red-600 text-white w-28 h-12 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all"
            onClick={() => removeNode(10)}
          >
            Remove Node
          </button>
        </div>
      </div>
    </div>
  );
}
