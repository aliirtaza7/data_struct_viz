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

export class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class StackLL<T> {
    top: ListNode<T> | null;
    
    constructor() {
        this.top = null;
    }

    // Push method to add an element to the stack
    push(value: T): void {
        const newNode = new ListNode(value);
        newNode.next = this.top;
        this.top = newNode;
    }

    // Pop method to remove and return the top element from the stack
    pop(): T | undefined {
        if (this.isEmpty()) {
            console.log("Stack is empty");
            return;
        }
        const poppedNode = this.top!;
        if(this.top){
        this.top = this.top.next;
        }
        return poppedNode.value;
    }

    // Peek method to view the top element of the stack
    peek(): T | undefined {
        if (this.isEmpty()) {
            console.log("Stack is empty");
            return;
        }
        return this.top!.value;
    }

    // Method to check if the stack is empty
    isEmpty(): boolean {
        return this.top === null;
    }

    // Method to return the size of the stack
    size(): number {
        let currentNode = this.top;
        let size = 0;
        while (currentNode !== null) {
            size++;
            currentNode = currentNode.next;
        }
        return size;
    }

    clear(): void {
        this.top = null;
        console.log("Stack is cleared");
    }


    // Method to print the stack
    print(): void {
        if (this.isEmpty()) {
            console.log("Stack is empty");
            return;
        }
        let currentNode = this.top;
        let stackContents = '';
        while (currentNode !== null) {
            stackContents += `${currentNode.value} -> `;
            currentNode = currentNode.next;
        }
        console.log("Stack: " + stackContents.slice(0, -4)); // Remove the last ' -> '
    }
}

// Exporting
export default StackLL;



// ---------------------- Rough work: Not for you-------------------------------------

// Example usage of the Stack class

// const stack = new StackLL<number>();
// stack.pop();
// stack.push(10);
// stack.push(20);
// stack.push(30);

// console.log("Top element:", stack.peek()); // Output: 30
// console.log("Stack size:", stack.size());  // Output: 3

// console.log("Popped element:", stack.pop()); // Output: 30
// console.log("Stack size after pop:", stack.size());  // Output: 2
// stack.print();
