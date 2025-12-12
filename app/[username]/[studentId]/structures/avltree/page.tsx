"use client";

import React, { useEffect, useRef, useState } from "react";
import AVLTree from "@/app/_datastructures/AVLTree";
import { TreeNode } from "./TreeNode";
import { toast } from "react-toastify";
import { useGlobalStatesContext } from "../../layout";

export default function Page() {
    const [tree] = useState(new AVLTree<number>());
    const [renderTrigger, setRenderTrigger] = useState(0);
    const [insertVal, setInsertVal] = useState(1);
    const [deleteVal, setDeleteVal] = useState(1);
    const [searchVal, setSearchVal] = useState(1);
    const svgRef = useRef<SVGSVGElement>(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [traversalInProcess, setTraversalInProcess] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const { isOpen, setHeading } = useGlobalStatesContext();

    useEffect(() => {
        setHeading("AVL Tree");

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
        tree.insert(data);
        renderTree();
        forceRender();
    };

    const deleteNode = (data: number) => {
        const index = tree.findIndex(data);
        tree.delete(data);
        svgRef.current?.removeChild(svgRef.current.getElementById(`${index}`));
        renderTree();
        forceRender();
    };

    const searchNode = (data: number) => {
        const found = tree.search(data);
        if (found) {
            toast.success(`Node with data: ${data} found.`);
        } else {
            toast.error(`Node with data: ${data} not found.`);
        }
    }

    const preOrderTraversal = () => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }   
        
        setTraversalInProcess(true);
        let delay = 0;

        tree.preOrderTraversal((index) => {
            setTimeout(() => {
                setCurrentIndex(index);
            }, delay += 1000);
        });

        setTimeout(() => {
            setCurrentIndex(-1);
            setTraversalInProcess(false);
        }, delay + 1000);
    }

    const inOrderTraversal = () => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }   
        
        setTraversalInProcess(true);
        let delay = 0;

        tree.inOrderTraversal((index) => {
            setTimeout(() => {
                setCurrentIndex(index);
            }, delay += 1000);
        });

        setTimeout(() => {
            setCurrentIndex(-1);
            setTraversalInProcess(false);
        }, delay + 1000);
    }

    const postOrderTraversal = () => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }   
        
        setTraversalInProcess(true);
        let delay = 0;

        tree.postOrderTraversal((index) => {
            setTimeout(() => {
                setCurrentIndex(index);
            }, delay += 1000);
        });

        setTimeout(() => {
            setCurrentIndex(-1);
            setTraversalInProcess(false);
        }, delay + 1000);
    }

    const renderTree = () => {
        if (!tree.root) return <div className="text-2xl">No nodes in the AVL Tree!</div>;

        return (
            <div className="flex justify-center h-full w-full">
                <TreeNode index={0} node={tree.root} type="root" svgRef={svgRef} renderTrigger={renderTrigger} currentIndex={currentIndex} scrollY={scrollY}/>
            </div>
        )
    }

    return (
        <div className="page-shell flex flex-col items-center gap-6">
            <div className="glass w-full max-w-4xl space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <input
                            value={insertVal}
                            onChange={(event)=>setInsertVal(Number(event.target.value))}
                            placeholder="Value"
                        />
                        <button
                            className="btn btn-primary w-full py-2"
                            onClick={(e) => {e.stopPropagation(); insertNode(insertVal)}}
                        >
                            Insert Node
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                            value={deleteVal}
                            onChange={(event)=>setDeleteVal(Number(event.target.value))}
                            placeholder="Value"
                        />
                        <button
                            className="btn w-full py-2 bg-[#F38BA8]/20 text-[#F38BA8]"
                            onClick={(e) => {e.stopPropagation(); deleteNode(deleteVal)}}
                        >
                            Delete Node
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                            value={searchVal}
                            onChange={(event)=>setSearchVal(Number(event.target.value))}
                            placeholder="Value"
                        />
                        <button
                            className="btn w-full py-2 bg-[#A6E3A1]/20 text-[#A6E3A1]"
                            onClick={(e) => {e.stopPropagation(); searchNode(searchVal)}}
                        >
                            Search Node
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        className="btn w-full sm:w-auto bg-[#252538] text-[#CDD6F4]"
                        onClick={() => preOrderTraversal()}
                        disabled={traversalInProcess}
                    >
                        Pre-order Traversal
                    </button>
                    <button
                        className="btn w-full sm:w-auto bg-[#252538] text-[#CDD6F4]"
                        onClick={() => inOrderTraversal()}
                        disabled={traversalInProcess}
                    >
                        In-order Traversal
                    </button>
                    <button
                        className="btn w-full sm:w-auto bg-[#252538] text-[#CDD6F4]"
                        onClick={() => postOrderTraversal()}
                        disabled={traversalInProcess}
                    >
                        Post-order Traversal
                    </button>
                </div>
            </div>
            <div className="panel w-full h-[70vh] relative overflow-auto" id="scrollable-tree">
                {renderTree()}
                <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none", zIndex: -1, top: 0, left: 0 }}></svg>
            </div>
        </div>
    );
}