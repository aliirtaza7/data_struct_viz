// Max Heap
// Methods present in it:-
/*
parent(to get parent index)
leftChild
rightChild
heapifyDown
heapifyUp
insert(to insert value)
extractMax(to delete root and return it)
peek(to return max)
size
deleteValu
print
findIndex: return -1 if not found else return index
*/ 
class MaxHeap {
    public heap: number[];
  
    constructor() {
        this.heap = [];
    }
  
    // Helper method to get the index of the parent
    public parent(index: number): number {
        return Math.floor((index - 1) / 2);
    }
  
    // Helper method to get the index of the left child
    public leftChild(index: number): number {
        return 2 * index + 1;
    }
  
    // Helper method to get the index of the right child
    public rightChild(index: number): number {
        return 2 * index + 2;
    }
  
    // Method to heapify down the heap
    private heapifyDown(index: number): void {
        let largest = index;
        const left = this.leftChild(index);
        const right = this.rightChild(index);
  
        if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
            largest = left;
        }
  
        if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
            largest = right;
        }
  
        if (largest !== index) {
            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            this.heapifyDown(largest);
        }
    }
  
    // Method to heapify up the heap
    private heapifyUp(index: number): void {
        let currentIndex = index;
        while (currentIndex > 0 && this.heap[currentIndex] > this.heap[this.parent(currentIndex)]) {
            const parentIndex = this.parent(currentIndex);
            [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
            currentIndex = parentIndex;
        }
    }
  
    // Method to insert a new element into the heap
    insert(value: number): void {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }
  
    // Method to extract the maximum (root element)
    // actually it deletes largest value
    extractMax(): number | null {
        if (this.heap.length === 0) {
            return null;
        }
  
        const max = this.heap[0];
        const lastElement = this.heap.pop();
        
        if (this.heap.length > 0 && lastElement !== undefined) {
            this.heap[0] = lastElement;
            this.heapifyDown(0);
        }
  
        return max;
    }
  
    // Method to get the maximum value without removing it
    peek(): number | null {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    }
  
    // Method to get the size of the heap
    size(): number {
        return this.heap.length;
    }
  
    // Method to delete a node with a specific value
    deleteValue(value: number): void {
        const index = this.heap.indexOf(value);
  
        if (index === -1) {
            console.log("Value not found in heap");
            return;
        }
  
        // Replace the value with the last element in the heap
        this.heap[index] = this.heap[this.heap.length - 1];
        this.heap.pop();
  
        // Re-heapify the heap (either heapify up or down based on the position)
        if (this.heap[index] > this.heap[this.parent(index)]) {
            this.heapifyUp(index); // Restore heap property by moving the element up
        } else {
            this.heapifyDown(index); // Restore heap property by moving the element down
        }
    }
  
    // Method to print the heap
    print(): void {
        console.log(this.heap);
    }

    // Method to find the index of a value in the heap using a loop
    findIndex(value: number): number {
        for (let i = 0; i < this.heap.length; i++) {
            if (this.heap[i] === value) {
                return i; // Return the index if the value is found
        }
    }
        return -1; // Return -1 if the value is not found
    }
  
  }
// Exporting
export default MaxHeap;



// ---------------------- Rough work: Not for you-------------------------------------
  
  // Example usage
//   const heap = new MaxHeap();
//   heap.insert(10);
//   heap.insert(20);
//   heap.insert(5);
//   heap.insert(6);
//   heap.insert(30);
  
//   heap.print(); // [30, 20, 10, 6, 5]
  
//   heap.deleteValue(10); // Deletes node with value 10
//   heap.print(); // [30, 20, 5, 6]
  
//   heap.deleteValue(30); // Deletes node with value 30 (root node)
//   heap.print(); // [20, 6, 5]
  