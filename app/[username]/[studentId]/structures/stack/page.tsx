"use client";

import React, { useEffect, useState } from "react";
import StackArr from "@/app/_datastructures/StackArray";
import { toast } from "react-toastify";
import { useGlobalStatesContext } from "../../layout";

export default function Page() {
  const [stack] = useState(new StackArr<number>(7));
  const [renderTrigger, setRenderTrigger] = useState(0);
  const [inputValue, setInputValue] = useState<number | "">("");

  const triggerRender = () => setRenderTrigger((prev) => prev + 1);

  const { setHeading } = useGlobalStatesContext();

  useEffect(() => {
    setHeading("Stack using Array");
  }, []);

  const push = () => {
    if (inputValue === "" || isNaN(Number(inputValue))) {
      toast.error("Please enter a valid number.");
      return;
    }

    if (stack.isFull()) {
      toast.error("Stack is full, cannot push.");
      return;
    }
    stack.push(Number(inputValue));
    toast.success(`Pushed value: ${inputValue}`);
    setInputValue(""); // Clear the input field
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
    const stackArray = new Array<number | null>(stack.maxSize).fill(null);

    stackArray.forEach((_, index) => {
      stackArray[index] = stack.items[index];
    });

    return stackArray.map((item, index) => (
      <div key={index}>
        <div
          className={`flex justify-center items-center p-4 border-4 w-20 h-20 text-center text-xl font-semibold shadow-lg relative ${
            index === stack.top
              ? "border-red-500 bg-red-100"
              : "border-green-500 bg-green-100"
          }`}
        >
          <span>{item !== null ? item : "-"}</span>
        </div>
      </div>
    ));
  };

  return (
    <div
      className="page-shell flex flex-col w-full justify-center items-center"
    >
      {/* Stack Display */}
      <div className="flex flex-col items-center justify-center space-y-4 mb-8">
        {renderStack()}
      </div>

      {/* Input and Buttons */}
      <div className="flex flex-col items-center space-y-4">
        {/* Input Field */}
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Enter value"
            className="px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={push}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
          >
            Push
          </button>
        </div>

        {/* Pop Button */}
        <button
          onClick={pop}
          className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
        >
          Pop
        </button>
      </div>
    </div>
  );
}
