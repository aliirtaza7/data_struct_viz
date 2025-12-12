// Directed Graph:
// Method present in it:-
/*

addVertex
addEdge
deleteVertex
deleteEdge
numOfNode
numOfEdge
clear
shortestPath
displayGraph
bfs
dfs
kruskal

 */

import Queue from "./QueueArray";
import StackArr from "./StackArray";

class WeightedUndirectedGraph {
    public matrix: number[][];  // adjacency matrix to store the graph
    public vertexNames: string[];  // list of vertex names for easy refrence
    public vertexCount: number;  // track of the number of vertices currently in the graph
    public maxVertices: number;  // Max number of vertices allowed

    constructor(maxVertices: number = 4) {
        this.vertexCount = 0;
        this.maxVertices = maxVertices;
        this.matrix = [];
        this.vertexNames = [];
    }

    // Add a vertex to the graph
    addVertex(vertexName: string): void {
        if (this.vertexCount >= this.maxVertices) {
            console.log(`Cannot add more vertices. Maximum limit of ${this.maxVertices} reached.`);
            return;
        }

        // Add the vertex name
        this.vertexNames.push(vertexName);

        // Increase the size of the matrix by adding new row and column
        // this loop just add column 
        for (let i = 0; i < this.matrix.length; i++) {
            this.matrix[i].push(Infinity);  // Set default weight to Infinity
        }
        // this loop adds column
        const newRow: number[] = [];
        for (let i = 0; i < this.vertexCount + 1; i++) {
            newRow.push(Infinity);  // New row with all Infinity (no edges)
        }
        this.matrix.push(newRow);

        this.vertexCount++;
        console.log(`Vertex ${vertexName} added successfully.`);
    }

    // Add a weighted edge between two vertices (undirected)
    addEdge(startVertex: string, endVertex: string, weight: number): void {
        const startIndex = this.vertexNames.indexOf(startVertex);
        const endIndex = this.vertexNames.indexOf(endVertex);

        if (startIndex === -1 || endIndex === -1) {
            console.log("One or both vertices not found.");
            return;
        }

        // Set the weight for the undirected edge
        this.matrix[startIndex][endIndex] = weight;
        this.matrix[endIndex][startIndex] = weight;
        console.log(`Edge added between ${startVertex} and ${endVertex} with weight ${weight}.`);
    }

    // Display the graph as an adjacency matrix
    displayGraph(): void {
        console.log("Adjacency Matrix:");
        console.log("   " + this.vertexNames.join(" "));

        for (let i = 0; i < this.vertexCount; i++) {
            let row = `${this.vertexNames[i]}: `;
            for (let j = 0; j < this.vertexCount; j++) {
                row += `${this.matrix[i][j] === Infinity ? '∞' : this.matrix[i][j]} `;
            }
            console.log(row);
        }
    }

    // Get the number of vertices in the graph
    numOfNodes(): number {
        return this.vertexCount;
    }

    // Get the number of edges in the graph (undirected, count each edge once)
    numOfEdges(): number {
        let edgeCount = 0;
        for (let i = 0; i < this.vertexCount; i++) {
            for (let j = i + 1; j < this.vertexCount; j++) {
                if (this.matrix[i][j] !== Infinity) {
                    edgeCount++;
                }
            }
        }
        return edgeCount;
    }

    // Clear the graph (remove all vertices and edges)
    clear(): void {
        this.matrix = [];
        this.vertexNames = [];
        this.vertexCount = 0;
        console.log('Graph cleared.');
    }

    // Delete an edge from the graph (undirected)
    deleteEdge(startVertex: string, endVertex: string): void {
        const startIndex = this.vertexNames.indexOf(startVertex);
        const endIndex = this.vertexNames.indexOf(endVertex);

        if (startIndex === -1 || endIndex === -1) {
            console.log("One or both vertices not found.");
            return;
        }

        // Remove the undirected edge by setting both matrix entries to Infinity
        this.matrix[startIndex][endIndex] = Infinity;
        this.matrix[endIndex][startIndex] = Infinity;
        console.log(`Edge removed between ${startVertex} and ${endVertex}. If it was present.`);
    }

    // Delete a vertex from the graph along with its associated edges
    deleteVertex(vertex: string): void {
        const index = this.vertexNames.indexOf(vertex);
        if (index === -1) {
            console.log("Vertex not found.");
            return;
        }

        // Remove the vertex's row and column from the matrix, splice method deletes the row and shifts the rest of the rows up
        this.matrix.splice(index, 1);  // Remove the row
        for (let i = 0; i < this.matrix.length; i++) {
            this.matrix[i].splice(index, 1);  // Remove the column
        }

        // Remove the vertex from the list of vertex names
        this.vertexNames.splice(index, 1);
        this.vertexCount--;
        console.log(`Vertex ${vertex} removed successfully.`);
    }

    // Dijkstra's algorithm to find the shortest path
    shortestPath(source: string, destination: string): string[] | null {
        const startIndex = this.vertexNames.indexOf(source);
        const endIndex = this.vertexNames.indexOf(destination);

        if (startIndex === -1 || endIndex === -1) {
            console.log("One or both vertices not found.");
            return null;
        }

        const dist: number[] = [];
        const prev: number[] = [];
        const visited: boolean[] = [];
        const queue: number[] = []; // Priority queue to find the minimum distance vertex

        // Initialize arrays
        for (let i = 0; i < this.vertexCount; i++) {
            dist[i] = Infinity;  // Distance of all vertices from source
            prev[i] = -1;        // Previous vertex for each vertex
            visited[i] = false;  // Track visited vertices
        }

        dist[startIndex] = 0;  // Distance from source to source is 0
        queue.push(startIndex); // Enqueue source vertex

        while (queue.length > 0) {
            // Find the vertex with the minimum distance
            let minDist = Infinity;
            let u = -1;
            for (let i = 0; i < queue.length; i++) {
                const vertex = queue[i];
                if (dist[vertex] < minDist) {
                    minDist = dist[vertex];
                    u = vertex;
                }
            }

            // Remove u from the queue
            queue.splice(queue.indexOf(u), 1);

            // Explore all neighbors of u
            for (let v = 0; v < this.vertexCount; v++) {
                if (this.matrix[u][v] !== Infinity && !visited[v]) {
                    const alt = dist[u] + this.matrix[u][v];
                    if (alt < dist[v]) {
                        dist[v] = alt;
                        prev[v] = u;
                        queue.push(v);
                    }
                }
            }

            visited[u] = true;
        }

        // Reconstruct the shortest path
        let path: string[] = [];
        let current = endIndex;
        while (current !== -1) {
            path.unshift(this.vertexNames[current]);
            current = prev[current];
        }

        if (dist[endIndex] === Infinity) {
            console.log("No path found.");
            return null;
        }

        return path;
    }

     
    // Breadth-First Search (BFS) Traversal
    bfs(startVertex: string): string[] {
        const startIndex = this.vertexNames.indexOf(startVertex);
    
        if (startIndex === -1) {
            console.log("Vertex not found.");
            return [];
        }
    
        // Initialize the visited array manually
        const visited: boolean[] = [];
        for (let i = 0; i < this.vertexCount; i++) {
            visited[i] = false;
        }
    
        const queue = new Queue<number>(this.maxVertices);// Queue for BFS
        const result: string[] = []; // Stores the traversal order
    
        // Start BFS from the given vertex
        queue.enqueue(startIndex);
        visited[startIndex] = true;
    
        while (queue.size > 0) {
            // shift() removes the first element from the array and returns it
            const currentIndex = queue.dequeue()!;
            result.push(this.vertexNames[currentIndex]);

            // Visit all neighbors of the current vertex
            for (let i = 0; i < this.vertexCount; i++) {
                if (this.matrix[currentIndex][i] !== Infinity && !visited[i]) {
                    queue.enqueue(i);
                    visited[i] = true;
                }
            }
        }
    
        return result;
    }

       // Depth-First Search (DFS) Traversal
// Depth-First Search (DFS) Traversal using an Explicit Stack
dfs(startVertex: string): string[] {
    const startIndex = this.vertexNames.indexOf(startVertex);

    if (startIndex === -1) {
        console.log("Vertex not found.");
        return [];
    }

    const visited: boolean[] = [];
    for (let i = 0; i < this.vertexCount; i++) {
        visited[i] = false;
    }

    const result: string[] = []; // Stores the traversal order
    const stack = new StackArr<number>(this.maxVertices);

    // Start DFS from the given vertex
    stack.push(startIndex);

    while (stack.size() > 0) {
        const currentIndex = stack.pop()!;

        if (!visited[currentIndex]) {
            visited[currentIndex] = true;
            result.push(this.vertexNames[currentIndex]);

            // Push all unvisited neighbors onto the stack
            for (let i = this.vertexCount - 1; i >= 0; i--) {
                if (this.matrix[currentIndex][i] !== Infinity && !visited[i]) {
                    stack.push(i);
                }
            }
        }
    }

    return result;
}

// Kruskal's Algorithm to find Minimum Spanning Tree (MST)
kruskal() {
    // Step 1: Save all upper triangular vertices and their weights into a data structure
    let edges: { start: number; end: number; weight: number }[] = [];

    for (let i = 0; i < this.vertexCount; i++) {
        for (let j = i + 1; j < this.vertexCount; j++) {
            if (this.matrix[i][j] !== Infinity) {
                edges.push({ start: i, end: j, weight: this.matrix[i][j] });
            }
        }
    }

    // Step 2: Sort edges by weight using insertion sort
    for (let i = 1; i < edges.length; i++) {
        let key = edges[i];
        let j = i - 1;

        // Compare weights and place the current edge in its sorted position
        while (j >= 0 && edges[j].weight > key.weight) {
            edges[j + 1] = edges[j];
            j--;
        }
        edges[j + 1] = key;
    }

    // Step 3: Initialize output matrix (without using fill)
    let outputMatrix: number[][] = [];
    for (let i = 0; i < this.vertexCount; i++) {
        outputMatrix[i] = [];
        for (let j = 0; j < this.vertexCount; j++) {
            outputMatrix[i][j] = Infinity;
        }
    }

    let edgeCount = 0;
    let addedVertices = new Set<number>(); //to ensure no cycles

    // Step 4: Add edges to the output matrix while ensuring no cycles
    for (const edge of edges) {
        const { start, end, weight } = edge;

        // Ensure no cycle by checking that both vertices are not already in the output
        if (!(addedVertices.has(start) && addedVertices.has(end))) {
            // Add edge to the output matrix
            outputMatrix[start][end] = weight;
            outputMatrix[end][start] = weight; // For undirected graphs

            // Add the vertices to the set of included vertices
            addedVertices.add(start);
            addedVertices.add(end);
            edgeCount++;

            // Stop if we have n-1 edges
            if (edgeCount === this.vertexCount - 1) {
                break;
            }
        }
    }

    return outputMatrix;
}
    
}

export default WeightedUndirectedGraph;

// ---------------------- Rough work: Not for you-------------------------------------


// // Create a graph with a maximum of 5 vertices
// const graph = new WeightedUndirectedGraph(5);
// // console.log(graph.dfs("B"));
// // Add vertices to the graph
// graph.addVertex("A");
// graph.addVertex("B");
// graph.addVertex("C");
// graph.addVertex("D");
// graph.addVertex("E");
// console.log(graph.dfs("B"));

// // Add weighted edges between vertices
// graph.addEdge("A", "B", 4);  // Edge from A to B with weight 4
// graph.addEdge("A", "C", 3);  // Edge from A to C with weight 3
// graph.addEdge("B", "C", 1);  // Edge from B to C with weight 1
// graph.addEdge("B", "D", 2);  // Edge from B to D with weight 2
// graph.addEdge("C", "D", 4);  // Edge from C to D with weight 4
// graph.addEdge("C", "E", 5);  // Edge from C to E with weight 5
// graph.addEdge("D", "E", 3);  // Edge from D to E with weight 3

// graph.kruskal();


// // console.log(graph.dfs("B"));
// // Display the graph's adjacency matrix
// graph.displayGraph();

// // Find the shortest path from vertex "A" to "E" using Dijkstra's algorithm
// // const shortestPath = graph.shortestPath("A", "E");
// // console.log("Shortest path from A to E:", shortestPath);
// // graph.deleteEdge("D", "E");
// // graph.displayGraph();
// // graph.deleteVertex("E");
// // graph.displayGraph();

// // Find the shortest path from vertex "B" to "D"
// const shortestPath2 = graph.shortestPath("B", "D");
// console.log("Shortest path from B to D:", shortestPath2);
