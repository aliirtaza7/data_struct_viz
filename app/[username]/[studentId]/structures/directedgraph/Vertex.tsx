import { useEffect, useState } from "react";

type VertexProps = {
    index: number;
    name: string;
    adjMatrix: number[];
    svgRef: React.RefObject<SVGSVGElement>;
    renderTrigger: number;
    currentIndex: number;
};

export default function Vertex({ index, name, adjMatrix, svgRef, renderTrigger, currentIndex }: VertexProps) {
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const isColliding = () => {
        const currentVertex = document.getElementById(`${index}`);
        if (!currentVertex) return false;

        const currentRect = currentVertex.getBoundingClientRect();

        const colliding = adjMatrix.map((edge, i) => {
            if (i !== index) {
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
            randomTop = Math.floor(Math.random() * (window.innerHeight - 400)); // Subtract to prevent overflow
            randomLeft = Math.floor(Math.random() * (window.innerWidth - 120));
        } while (isColliding());

        const newPosition = { top: randomTop, left: randomLeft };
        setPosition(newPosition);
    }, []);

    useEffect(() => {
        const children: number[] = [];

        const currentNode = document.getElementById(`${index}`);
        if (!currentNode || !svgRef.current) return;

        const currentRect = currentNode.getBoundingClientRect();

        adjMatrix.forEach((edge, i) => {
            if (i !== index && edge === 1) {
                children.push(i);
            }
        });

        children.forEach((childIndex) => {
            const childNode = document.getElementById(`${childIndex}`);
            if (!childNode) return;

            const childRect = childNode.getBoundingClientRect();

            let x1 = currentRect.left + currentRect.width / 2;
            let y1 = currentRect.bottom;
            let x2 = childRect.left + childRect.width / 2;
            let y2 = childRect.top;

            if (childRect.top > currentRect.top) {
                y1 = currentRect.top;
                y2 = childRect.bottom;
            }

            const path = createPath(
                x1 + window.scrollX,
                y1 + window.scrollY,
                x2 + window.scrollX,
                y2 + window.scrollY
            );

            if (svgRef.current && path) {
                const oldPathElement = svgRef.current.getElementById(`${index}-${childIndex}`);
                if (oldPathElement) {
                    svgRef.current.removeChild(oldPathElement);
                }
                const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
                pathElement.setAttribute("d", path);
                pathElement.setAttribute("stroke", "#3B82F6"); // Blue stroke for better visibility
                pathElement.setAttribute("fill", "transparent");
                pathElement.setAttribute("stroke-width", "3");
                pathElement.setAttribute("id", `${index}-${childIndex}`);
                pathElement.setAttribute("marker-end", "url(#arrowhead)");

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
            className={`h-20 w-20 text-black text-center flex items-center justify-center shadow-lg transition-transform transform hover:scale-110 cursor-pointer ${currentIndex===index ? "bg-yellow-500" : "bg-blue-400"}`}
        >
            <span className="font-bold text-lg">{name}</span>
        </div>
    );
}
