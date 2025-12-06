// circular queue using Double linked List:
// Methods present in it:-
// Enque
// deque
// isFull
// isEmpty
// peek
// display

export class ListNode<T> {
    value: T;
    next: ListNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

class CircularQueue<T> {
    public front: ListNode<T> | null = null;
    public rear: ListNode<T> | null = null;
    private size: number = 0;
    private readonly MAX_QUEUE: number;

    constructor(maxSize: number) {
        this.MAX_QUEUE = maxSize;
    }

    isFull(): boolean {
        return this.size === this.MAX_QUEUE;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    enqueue(value: T): void {
        if (this.isFull()) {
            console.log("Queue is full");
            // return false;
        }

        const newNode = new ListNode(value);

        if (this.isEmpty()) {
            this.front = this.rear = newNode;
            newNode.next = newNode; // Point to itself since it's circular
        } else {
            newNode.next = this.rear!.next;
            this.rear!.next = newNode;
            this.rear = newNode;
        }

        this.size++;
        // return true;
    }

    dequeue(): T | null {
        if (this.isEmpty()) {
            console.log("Queue is empty");
            return null;
        }

        const frontValue = this.front!.value;

        if (this.front === this.rear) {
            this.front = this.rear = null;
        } else {
            this.front = this.front!.next;
            this.rear!.next = this.front;
        }

        this.size--;
        return frontValue;
    }

    peek(): T | null {
        return this.isEmpty() ? null : this.front!.value;
    }
    display(): void {
        if (this.isEmpty()) {
            console.log("Queue is empty.");
            return;
        }
    
        let result = "Queue: ";
        let current = this.front;
        do {
            result += current!.value + " ";
            current = current!.next;
        } while (current !== this.front);
    
        console.log(result.trim());
    }
    
}

// Exporting
export default CircularQueue;



// ---------------------- Rough work: Not for you-------------------------------------

// Example usage:
// const queue = new CircularQueue<number>(3);

// console.log(queue.enqueue(1)); // true
// console.log(queue.enqueue(2)); // true
// console.log(queue.enqueue(3)); // false, queue is full
// console.log(queue.dequeue());  // 1
// console.log(queue.enqueue(3)); // true
// console.log(queue.peek());     // 2
// console.log(queue.dequeue());  // 2
// console.log(queue.dequeue());  // 3
// console.log(queue.isEmpty());  // true