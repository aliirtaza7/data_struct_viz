"use client";

import React, { useEffect, useState } from "react";
import StackLL, { ListNode } from "@/app/_datastructures/StackLL";
import { toast } from "react-toastify";
import { useGlobalStatesContext } from "../../layout";

export default function Page() {
  const [stack] = useState(new StackLL<number>());
  const [renderTrigger, setRenderTrigger] = useState(0);
  const [inputValue, setInputValue] = useState<number | "">("");

  const triggerRender = () => setRenderTrigger((prev) => prev + 1);

  const { setHeading } = useGlobalStatesContext();

  useEffect(() => {
    setHeading("Stack using Linked List");
  }, []);

  const push = () => {
    if (inputValue === "" || isNaN(Number(inputValue))) {
      toast.error("Please enter a valid number.");
      return;
    }

    stack.push(Number(inputValue));
    toast.success(`Pushed value: ${inputValue}`);
    setInputValue(""); // Clear input field
    triggerRender();
  };

  const pop = () => {
    if (stack.isEmpty()) {
      toast.error("Stack is empty, nothing to pop.");
      return;
    }
    const poppedValue = stack.pop();
    toast.success(`Popped value: ${poppedValue}`);
    triggerRender();
  };

  const renderStack = () => {
    if (stack.isEmpty()) return <div className="text-gray-500">No nodes in the Stack.</div>;

    const nodes: ListNode<number>[] = [];
    let current: ListNode<number> | null = stack.top;

    while (current !== null) {
      nodes.push(current);
      current = current.next;
    }

    return nodes.map((node, index) => (
      <div
        key={index}
        className="flex flex-col items-center justify-center relative mb-4"
      >
        <div
          className={`flex justify-center items-center p-4 border-4 w-20 h-20 text-center text-xl font-semibold shadow-lg relative ${
            node === stack.top
              ? "border-red-500 bg-red-100"
              : "border-green-500 bg-green-100"
          }`}
        >
          <span>{node.value}</span>
        </div>
        {index !== nodes.length - 1 && (
          <div className="text-3xl text-green-500 font-bold">↓</div>
        )}
      </div>
    ));
  };

  return (
    <div className="page-shell flex flex-col gap-6">
      <div className="glass w-full max-w-3xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 sticky top-6 z-10">
        <div className="flex items-center w-full md:w-auto space-x-3">
          <input
            type="number"
            value={inputValue}
            onChange={(e) =>
              setInputValue(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="Enter value"
          />
          <button
            onClick={push}
            className="btn btn-primary px-6 py-2"
          >
            Push
          </button>
        </div>
        <button
          onClick={pop}
          className="btn px-6 py-2 bg-[#F38BA8]/20 text-[#F38BA8]"
        >
          Pop
        </button>
      </div>

      <div className="panel flex flex-col items-center justify-center min-h-[60vh]">
        {renderStack()}
      </div>
    </div>
  );
}
