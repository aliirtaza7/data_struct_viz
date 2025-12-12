// Max Heap
// Methods present in it:-
/*
parent(to get parent index)
leftChild
rightChild
heapifyDown
heapifyUp
insert(to insert value
extractMin(to delete root and return it)
peek(to return max)
size
deleteValue
print
findIndex: return -1 if not found else return index
*/ 
class MinHeap {
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
      let smallest = index;
      const left = this.leftChild(index);
      const right = this.rightChild(index);
  
      // Check if left child is smaller than current smallest
      if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }
  
      // Check if right child is smaller than current smallest
      if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }
  
      // If smallest is not the current index, swap and continue heapifying down
      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
        this.heapifyDown(smallest);
      }
    }
  
    // Method to heapify up the heap
    private heapifyUp(index: number): void {
      let currentIndex = index;
      while (currentIndex > 0 && this.heap[currentIndex] < this.heap[this.parent(currentIndex)]) {
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
  
    // Method to extract the minimum (root element)
    // Actually it deletes the smallest value
    extractMin(): number | null {
      if (this.heap.length === 0) {
        return null;
      }
  
      const min = this.heap[0];
      const lastElement = this.heap.pop();
      
      if (this.heap.length > 0 && lastElement !== undefined) {
        this.heap[0] = lastElement;
        this.heapifyDown(0);
      }
  
      return min;
    }
  
    // Method to get the minimum value without removing it
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
      if (this.heap[index] < this.heap[this.parent(index)]) {
        this.heapifyUp(index); // Restore heap property by moving the element up
      } else {
        this.heapifyDown(index); // Restore heap property by moving the element down
      }
    }
  
    // Method to print the heap
    print(): void {
      console.log(this.heap);
    }
    // Method to find the index of a value in the heap
findIndex(value: number): number {
  const index = this.heap.indexOf(value);
  return index !== -1 ? index : -1; // Return -1 if value not found
}

  }
  

  // Exporting
export default MinHeap;


// ---------------------- Rough work: Not for you-------------------------------------
  // Example usage
  // const heap = new MinHeap();
  // heap.insert(10);
  // heap.insert(20);
  // heap.insert(5);
  // heap.insert(6);
  // heap.insert(30);
  
  // heap.print(); // [5, 6, 10, 20, 30]
  
  // heap.deleteValue(10); // Deletes node with value 10
  // heap.print(); // [5, 6, 30, 20]
  
  // heap.deleteValue(5); // Deletes node with value 5 (root node)
  // heap.print(); // [6, 20, 30]
  