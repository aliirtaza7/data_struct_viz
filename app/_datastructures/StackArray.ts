// Stack using array:
// Methods in it:-
/*isFull
push(): adds an item to the top of the stack.
pop(): removes and returns the top item of the stack.
peek(): returns the top item without removing it.
isEmpty(): checks whether the stack is empty.
size(): returns the number of elements in the stack.
clear(): clears the stack.
print()
 */
class StackArr<T> {
    public items: T[] = [];
    public top: number = -1;
    public maxSize: number;
  
    constructor(maxSize: number) {
      if (maxSize <= 0) {
        throw new Error("Stack size must be greater than zero.");
      }
      this.maxSize = maxSize;
    }
  
    // Check if the stack is full
    isFull(): boolean {
      return this.items.length >= this.maxSize;
    }
  
    // Push element onto the stack if it's not full
    push(item: T): void {
      if (this.isFull()) {
        console.log("Stack is full. Cannot push more items.");
      } else {
        this.items.push(item);
        this.top++;
      }
    }
  
    // Pop element from the stack
    pop(): T | undefined {
      if (!this.isEmpty()) {
        this.top--;
        return this.items.pop();
      }
    }
  
    // Peek the top element of the stack
    peek(): T | undefined {
      return this.items[this.items.length - 1];
    }
  
    // Check if the stack is empty
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  
    // Get the size of the stack
    size(): number {
      return this.items.length;
    }
  
    // Clear the stack
    clear(): void {
      this.items = [];
    }
  
    // Display all elements in the stack
    print(): void {
      console.log(this.items);
    }
  }
  

// Exporting
export default StackArr;



// ---------------------- Rough work: Not for you-------------------------------------

// Example usage
//   const stack = new StackArr<number>(3); // Fixed size stack of 3
//   stack.push(10);
//   stack.push(20);
//   stack.push(30);
//   stack.push(40); // Will print "Stack is full. Cannot push more items."
//   stack.print(); // [10, 20, 30]
//   stack.pop();
//   stack.print();
