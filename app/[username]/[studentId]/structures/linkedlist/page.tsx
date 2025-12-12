"use client";

import React, { useEffect, useState } from "react";
import LinkedList, { ListNode } from "@/app/_datastructures/LinkedList";
import { useGlobalStatesContext } from "../../layout";

export default function Page() {
  const [list] = useState(new LinkedList<number>());
  const [, setRenderTrigger] = useState(0);
  const [insertVal, setInsertVal] = useState<number | "">("");
  const [deleteVal, setDeleteVal] = useState<number | "">("");

  const triggerRender = () => setRenderTrigger((prev) => prev + 1);

  const { setHeading } = useGlobalStatesContext();

  useEffect(() => {
    setHeading("Linked List");
  }, []);

  const addNode = () => {
    if (insertVal !== "" && !isNaN(Number(insertVal))) {
      list.append(Number(insertVal));
      triggerRender();
      setInsertVal("");
    }
  };

  const removeNode = () => {
    if (deleteVal !== "" && !isNaN(Number(deleteVal))) {
      list.delete(Number(deleteVal));
      triggerRender();
      setDeleteVal("");
    }
  };

  const renderNodes = () => {
    if (!list.head) return <div>No nodes in the Linked List.</div>;

    const nodes: ListNode<number>[] = [];
    let current: ListNode<number> | null = list.head;

    do {
      if (!current) break;
      nodes.push(current);
      current = current.next;
    } while (current !== null);

    return nodes.map((node, index) => (
      <div key={index} className="flex items-center space-x-4">
        <div className="flex justify-center items-center p-4 border-4 border-green-500 rounded-lg bg-green-100 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg">
          <span>{node.value}</span>
        </div>
        {!!node.next && (
          <div className="flex justify-center items-center text-3xl text-black">
            →
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="page-shell flex flex-col w-full justify-center items-center p-6">
      <div className="flex flex-col items-center justify-center w-full space-y-8">
        <div className="flex items-center justify-center">{renderNodes()}</div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full max-w-md">
          {/* Insert Section */}
          <div className="flex flex-col items-center bg-blue-500 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-lg font-semibold mb-4">Insert Node</h2>
            <input
              type="number"
              placeholder="Enter value"
              value={insertVal}
              onChange={(e) => setInsertVal(Number(e.target.value))}
              className="w-full p-2 mb-4 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={addNode}
              className="w-full py-2 bg-blue-700 hover:bg-blue-600 rounded-md font-bold text-white transition-all"
            >
              Insert
            </button>
          </div>

          {/* Delete Section */}
          <div className="flex flex-col items-center bg-red-500 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-lg font-semibold mb-4">Delete Node</h2>
            <input
              type="number"
              placeholder="Enter value"
              value={deleteVal}
              onChange={(e) => setDeleteVal(Number(e.target.value))}
              className="w-full p-2 mb-4 text-black rounded-md focus:outline-none focus:ring focus:ring-red-300"
            />
            <button
              onClick={removeNode}
              className="w-full py-2 bg-red-700 hover:bg-red-600 rounded-md font-bold text-white transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
