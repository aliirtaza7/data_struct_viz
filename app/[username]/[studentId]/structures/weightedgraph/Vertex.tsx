import { useEffect, useState } from "react";

type VertexProps = {
    index: number;
    name: string;
    adjMatrix: number[];
    svgRef: React.RefObject<SVGSVGElement>;
    renderTrigger: number;
}

export default function Vertex({index, name, adjMatrix, svgRef, renderTrigger}: VertexProps) {
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const isColliding = () => {
        const currentVertex = document.getElementById(`${index}`);
        if (!currentVertex) return false;

        const currentRect = currentVertex.getBoundingClientRect();

        const colliding = adjMatrix.map((edge, i) => {
            if (i!==index) {
                const node = document.getElementById(`${i}`);
                if (!node) return;
                const rect = node.getBoundingClientRect();
                if (
                    currentRect.left < rect.right &&
                    currentRect.right > rect.left &&
                    currentRect.top < rect.bottom &&
                    currentRect.bottom > rect.top
                ) {
                    return true;
                }
            }
        });

        return colliding.includes(true);
    };
    
    useEffect(() => {
        let randomTop: number;
        let randomLeft: number;

        do {
            randomTop = Math.floor(Math.random() * (window.innerHeight - 120)); // Subtract to prevent overflow
            randomLeft = Math.floor(Math.random() * (window.innerWidth - 120));
        } while (isColliding());

        const newPosition = { top: randomTop, left: randomLeft };
        setPosition(newPosition);
    }, []);

    useEffect(() => {
        const children: number[] = [];

        const currentNode = document.getElementById(`${index}`)
        if (!currentNode || !svgRef.current) return;

        const currentRect = currentNode.getBoundingClientRect();

        adjMatrix.forEach((edge, i) => {
            if (i!==index && edge === 1) {
                children.push(i);
            }
        });

        children.forEach((childIndex) => {
            const childNode = document.getElementById(`${childIndex}`);
            if (!childNode) return;

            const childRect = childNode.getBoundingClientRect();

            const path = createPath(
                currentRect.left + currentRect.width / 2, // X center of current node
                currentRect.bottom, // Y bottom of current node
                childRect.left + childRect.width / 2, // X center of child node
                childRect.top // Y top of child node
            );

            if (svgRef.current && path) {
                const oldPathElement = svgRef.current.getElementById(`${index}-${childIndex}`); // Get the old path element);
                if (oldPathElement) {
                    svgRef.current.removeChild(oldPathElement); // Removes the path from the SVG
                }
                const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
                pathElement.setAttribute("d", path);
                pathElement.setAttribute("stroke", "black");
                pathElement.setAttribute("fill", "transparent");
                pathElement.setAttribute("strokeWidth", "4");
                pathElement.setAttribute("id", `${index}-${childIndex}`);

                svgRef.current.appendChild(pathElement);
            }
        });

        return () => {
            children.forEach((childIndex) => {
                const pathElement = svgRef.current?.getElementById(`${index}-${childIndex}`);
                if (pathElement) {
                    svgRef.current?.removeChild(pathElement);
                }
            });
        };

    }, [adjMatrix, svgRef, index, renderTrigger]);

    const createPath = (x1: number, y1: number, x2: number, y2: number) => {
        return `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
    };

    return (
        <div 
          id={index.toString()}
          key={index}
          style={{
            position: "absolute",
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          className="h-20 w-20 bg-red-600 text-black text-center items-center justify-center">
            {name}
        </div>
    );
}