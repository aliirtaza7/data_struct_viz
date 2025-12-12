"use client"

import React, { useEffect, useState } from "react";
import Queue from "@/app/_datastructures/QueueArray";
import { toast } from "react-toastify";
import { useGlobalStatesContext } from "../../layout";

export default function Page() {
    const [queue] = useState(new Queue<number>(7));
    const [, setRenderTrigger] = useState(0);
    const [inputValue, setInputValue] = useState<number>(1);

    const triggerRender = () => setRenderTrigger((prev) => prev + 1);

    const { setHeading } = useGlobalStatesContext();

    useEffect(() => {
        setHeading("Queue using Array");
    }, []);

    const enqueue = (value: number) => {
        if (queue.isFull()) {
            toast.error("Queue is full, cannot enqueue.");
            return;
        }
        queue.enqueue(value);
        triggerRender();
    };

    const dequeue = () => {
        if (queue.isEmpty()) {
            toast.error("Queue is empty, nothing to dequeue.");
            return;
        }
        const dequeuedValue = queue.dequeue();
        toast.success(`Dequeued value: ${dequeuedValue}`);
        triggerRender();
    };

    const renderQueue = () => {
        const queueArray = new Array<number | null>(queue.capacity).fill(null);

        queueArray.forEach((_, index) => {
            queueArray[index] = queue.queue[index];
        });

        return queueArray.map((item, index) => (
            <div key={index}>
                <div className={`flex justify-center items-center p-4 border-4 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg relative ${(index===queue.front && index===queue.rear) && "border-purple-500 bg-purple-100"} ${index===queue.front ? "border-red-500 bg-red-100" : (index===queue.rear ?  "border-blue-500 bg-blue-100" : "border-green-500 bg-green-100")}`}>
                    <span>{item}</span>
                </div>
            </div>
        ));
    }

    return (
        <div
      className="page-shell flex flex-col w-full justify-center items-center"
    >
      {/* Stack Display */}
      <div className="flex flex-col items-center justify-center space-y-4 mb-8">
        {renderQueue()}
      </div>

      {/* Input and Buttons */}
      <div className="flex flex-col items-center space-y-4">
        {/* Input Field */}
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
            placeholder="Enter value"
            className="px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => enqueue(inputValue)}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
          >
            Enqueue
          </button>
        </div>

        {/* Pop Button */}
        <button
          onClick={() => dequeue()}
          className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
        >
          Dequeue
        </button>
      </div>
    </div>
    )
}