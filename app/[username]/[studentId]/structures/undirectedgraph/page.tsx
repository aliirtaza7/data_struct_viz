"use client";

import { useEffect, useRef, useState } from "react";
import UndirectedGraph from "@/app/_datastructures/UndirectedGraph";
import Vertex from "./Vertex";
import { useGlobalStatesContext } from "../../layout";

export default function Page() {
    const [graph] = useState(new UndirectedGraph(5));
    const [renderTrigger, setRenderTrigger] = useState(0);
    const [insertVal, setInsertVal] = useState("");
    const [insertEdgeVal, setInsertEdgeVal] = useState({start: "", end: ""});

    const svgRef = useRef<SVGSVGElement>(null);

    const forceRender = () => setRenderTrigger(prev=>prev+1);

    const { setHeading } = useGlobalStatesContext();

    useEffect(()=>{
        setHeading("Undirected Graph");
    }, []);

    const insertVertex = (name: string) => {
        graph.addVertex(name);
        forceRender();
    }

    const removeVertex = (name: string) => {
        graph.deleteVertex(name);
        forceRender();
    }

    const insertEdge = (startVertex: string, endVertex: string) => {
        graph.addEdge(startVertex, endVertex);
        forceRender();
    }

    const removeEdge = (startVertex: string, endVertex: string) => {
        graph.deleteEdge(startVertex, endVertex);
        forceRender();
    }

    const renderGraph = () => {
        if (!graph.matrix) {
            return <div>No vertices in the directed graph!</div>
        }

        return graph.matrix.map((row, i) => {
            const adjMatrix = row;
            const name = graph.vertexNames[i];
            return (
                <Vertex index={i} name={name} adjMatrix={adjMatrix} svgRef={svgRef} renderTrigger={renderTrigger}/>
            );
        });
    }

    return (
        <div className="page-shell flex flex-col items-center justify-center w-full">
            <div id="header" className="w-full">
            <div className="flex items-center z-10 justify-center space-x-4">
                <div
                    className="px-4 py-2 bg-green-500 h-20 w-32 text-white rounded-md shadow-md flex flex-col"
                >
                    <input className="text-black" value={insertVal} onChange={(event)=>{event.stopPropagation();setInsertVal(event.target.value)}} />
                    <button onClick={() => insertVertex(insertVal)}>Insert Vertex</button>
                </div>
                <div
                    className="px-4 py-2 bg-green-500 w-32 text-white rounded-md shadow-md flex flex-col"
                >
                    Start: 
                    <select key="start" className="text-black" onChange={(event)=>{event.stopPropagation();setInsertEdgeVal({...insertEdgeVal, start: event.target.value})}}>
                        {graph.vertexNames.map((name) => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                    End: 
                    <select key="end" className="text-black" onChange={(event)=>{event.stopPropagation();setInsertEdgeVal({...insertEdgeVal, end: event.target.value})}}>
                        {graph.vertexNames.map((name) => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                    <button onClick={() => insertEdge(insertEdgeVal.start, insertEdgeVal.end)}>Insert Edge</button>
                </div>
            </div>
            </div>
            <div className="flex items-center justify-center w-screen h-screen overflow-scroll">
                {renderGraph()}
                <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none", zIndex: -1, top: 0, left: 0 }}></svg>
            </div>
        </div>
    );
}