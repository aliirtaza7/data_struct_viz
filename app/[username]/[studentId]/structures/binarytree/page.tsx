"use client";

import React, { useEffect, useRef, useState } from "react";
import BinaryTree from "@/app/_datastructures/BinaryTrees";
import { TreeNode } from "./TreeNode";
import { toast } from "react-toastify";
import { useGlobalStatesContext } from "../../layout";

export default function Page() {
    const [tree] = useState(new BinaryTree<number>());
    const [renderTrigger, setRenderTrigger] = useState(0);
    const [deleteLeftVal, setDeleteLeftVal] = useState(1);
    const [deleteRightVal, setDeleteRightVal] = useState(1);
    const [insertVal, setInsertVal] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [traversalInProcess, setTraversalInProcess] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [newNode, setNewNode] = useState<number | null>(null);
    const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
    const [traversalOutput, setTraversalOutput] = useState<number[]>([]);

    const svgRef = useRef<SVGSVGElement>(null);

    const { isOpen, setHeading } = useGlobalStatesContext();

    useEffect(() => {
        setHeading("Binary Tree");

        const handleScroll = () => {
            setScrollY(window.scrollY);
            renderTree();
            forceRender();
        };

        const scrollableTree = document.getElementById("scrollable-tree");

        window.addEventListener('resize', handleResize);
        scrollableTree?.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            scrollableTree?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        handleResize();
    }, [isOpen]);

    const forceRender = () => setRenderTrigger((prev) => prev + 1);

    const handleResize = () => {
        renderTree();
        forceRender();
    };

    const insertNode = (data: number) => {
        // if (tree.getHeight(tree.root) > 6) {
        //     if (tree.wouldIncreaseHeight(data)) {
        //         toast.error("Binary Tree is too large.");
        //         return;
        //     }
        // }
        tree.insert(data);
        setNewNode(data);
        renderTree();
        forceRender();
        setTimeout(() => setNewNode(null), 2000);
        // toast.success(`Node with data: ${data} inserted successfully.`);
    };

    const deleteNodeLeft = (data: number) => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }
        tree.deleteNodeLeft(data, (node)=> {
            const pathToDelete = svgRef.current?.getElementById(`${node.index}`);
            if (pathToDelete) {
                svgRef.current?.removeChild(pathToDelete);
            }
        });
        renderTree();
        forceRender();
    }

    const deleteNodeRight = (data: number) => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }
        tree.deleteNodeRight(data, (node)=> {
            const pathToDelete = svgRef.current?.getElementById(`${node.index}`);
            if (pathToDelete) {
                svgRef.current?.removeChild(pathToDelete);
            }
        });
        renderTree();
        forceRender();
    }

    const preOrderTraversal = () => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }   
        
        setTraversalInProcess(true);
        setVisitedNodes([]);
        setTraversalOutput([]);
        let delay = 0;

        tree.preOrderTraversal(tree.root, (index) => {
            setTimeout(() => {
                setCurrentIndex(index);
                setVisitedNodes(prev => [...prev, index]);
                setTraversalOutput(prev => [...prev, tree.getNodeByIndex(index)?.data || 0]);
            }, delay += 500);
        });

        setTimeout(() => {
            setCurrentIndex(-1);
            setVisitedNodes([]);
            setTraversalInProcess(false);
        }, delay + 1000);
    }

    const inOrderTraversal = () => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }   
        
        setTraversalInProcess(true);
        setVisitedNodes([]);
        setTraversalOutput([]);
        let delay = 0;

        tree.inOrderTraversal(tree.root, (index) => {
            setTimeout(() => {
                setCurrentIndex(index);
                setVisitedNodes(prev => [...prev, index]);
                setTraversalOutput(prev => [...prev, tree.getNodeByIndex(index)?.data || 0]);
            }, delay += 500);
        });

        setTimeout(() => {
            setCurrentIndex(-1);
            setVisitedNodes([]);
            setTraversalInProcess(false);
        }, delay + 1000);
    }

    const postOrderTraversal = () => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }   
        
        setTraversalInProcess(true);
        setVisitedNodes([]);
        setTraversalOutput([]);
        let delay = 0;

        tree.postOrderTraversal(tree.root, (index) => {
            setTimeout(() => {
                setCurrentIndex(index);
                setVisitedNodes(prev => [...prev, index]);
                setTraversalOutput(prev => [...prev, tree.getNodeByIndex(index)?.data || 0]);
            }, delay += 500);
        });

        setTimeout(() => {
            setCurrentIndex(-1);
            setVisitedNodes([]);
            setTraversalInProcess(false);
        }, delay + 1000);
    }

    const renderTree = () => {
        if (!tree.root) return <div>No nodes in the Binary Tree.</div>;

        return (
            <div className="flex justify-center h-full w-full">
                <TreeNode index={0} node={tree.root} type="root" svgRef={svgRef} renderTrigger={renderTrigger} currentIndex={currentIndex} scrollY={scrollY} newNode={newNode} visitedNodes={visitedNodes}/>
            </div>
        )
    }

    return (
        <div className="page-shell flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center z-10 justify-center space-x-4">
            <div className="flex gap-x-3 mb-3">
                <div
                    className="px-4 py-2 bg-green-500 h-20 w-32 text-white rounded-md shadow-md flex flex-col"
                >
                    <input className="text-black" value={insertVal} onChange={(event)=>setInsertVal(Number(event.target.value))} />
                    <button onClick={() => insertNode(insertVal)}>Insert Node</button>
                </div>
                <div
                    className="px-4 py-2 bg-red-500 h-20 w-32 text-white rounded-md shadow-md flex flex-col"
                >
                    <input className="text-black" value={deleteLeftVal} onChange={(event)=>setDeleteLeftVal(Number(event.target.value))} />
                    <button onClick={() => deleteNodeLeft(deleteLeftVal)}>Delete Left Node</button>
                </div>
                <div
                    className="px-4 py-2 bg-red-500 h-20 w-32 text-white rounded-md shadow-md flex flex-col"
                >
                    <input className="text-black" value={deleteRightVal} onChange={(event)=>setDeleteRightVal(Number(event.target.value))} />
                    <button onClick={() => deleteNodeRight(deleteRightVal)}>Delete Right Node</button>
                </div>
                </div>
                <div className="flex gap-x-3 mb-4">
                <button
                    className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md shadow-md"
                    onClick={() => preOrderTraversal()}
                    disabled={traversalInProcess}
                >
                    Pre-order Traversal
                </button>
                <button
                    className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md shadow-md"
                    onClick={() => inOrderTraversal()}
                    disabled={traversalInProcess}
                >
                    In-order Traversal
                </button>
                <button
                    className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md shadow-md"
                    onClick={() => postOrderTraversal()}
                    disabled={traversalInProcess}
                >
                    Post-order Traversal
                </button>
                </div>
            </div>
            <div className="flex items-center justify-center w-screen h-screen overflow-scroll" id="scrollable-tree">
                {renderTree()}
                <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none", zIndex: -1, top: 0, left: 0 }}>
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#89B4FA" />
                        </marker>
                    </defs>
                </svg>
            </div>
            {traversalOutput.length > 0 && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg text-white text-center">
                    <h3 className="text-lg font-semibold mb-2">Traversal Output</h3>
                    <p className="text-xl">{traversalOutput.join(' → ')}</p>
                </div>
            )}
        </div>
    );
}