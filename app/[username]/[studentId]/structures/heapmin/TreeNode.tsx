import MinHeap from "@/app/_datastructures/HeapMIn";

type TreeNodeProps = {
    index: number;
    heap: MinHeap;
};

export const TreeNode:React.FC<TreeNodeProps> = ({ index, heap }) => {
    if (index >= heap.size()) {
        return null;
    }

    return (
        <div className="flex flex-col items-center">
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
                <TreeNode index={2 * index + 1} heap={heap} />
                {/* Right Child */}
                <TreeNode index={2 * index + 2} heap={heap} />
            </div>
        </div>
    );
};