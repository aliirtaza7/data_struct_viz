// Queue implementation using Arrays in TypeScript
// Methods present in it:-
// enqueue
// dequeue
// isFull
// isEmpty
// peek
// display

class Queue<T> {
    public queue: (T | null)[]; // Array to hold the queue elements
    public front: number;      // Index of the front element
    public rear: number;       // Index of the rear element
    public capacity: number;   // Maximum size of the queue
    public size: number;       // Current size of the queue

    constructor(capacity: number) {
        this.capacity = capacity;
        this.queue = new Array(capacity);
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }

    // Check if the queue is empty
    isEmpty(): boolean {
        return this.size === 0;
    }

    // Check if the queue is full
    isFull(): boolean {
        return this.size === this.capacity;
    }

    // Add an element to the queue
    enqueue(item: T): void {
        if (this.isFull()) {
            console.log("Queue is full, cannot add more elements.");
            return;
        }
        this.rear = (this.rear + 1) % this.capacity; // Circular increment
        this.queue[this.rear] = item;
        this.size++;
    }

    // Remove an element from the queue
    dequeue(): T | null {
        if (this.isEmpty()) {
            console.log("Queue is empty, nothing to dequeue.");
            return null;
        }
        const item = this.queue[this.front];
        this.queue[this.front] = null; // Clear the dequeued slot
        this.front = (this.front + 1) % this.capacity; // Circular increment
        this.size--;
        return item;
    }

    // Display the queue elements
    display(): void {
        if (this.isEmpty()) {
            console.log("Queue is empty.");
            return;
        }
        let result = "Queue: ";
        for (let i = 0; i < this.size; i++) {
            result += this.queue[(this.front + i) % this.capacity] + " ";
        }
        console.log(result.trim());
    }
    peek(): T | null {
        if (this.isEmpty()) {
            console.log("Queue is empty, nothing to peek.");
            return null;
        }
        return this.queue[this.front];
    }
    
}
// Exporting
export default Queue;



// ---------------------- Rough work: Not for you-------------------------------------

// Example usage
// const queue = new Queue<number>(5);

// queue.dequeue();
// queue.enqueue(10);
// queue.enqueue(20);
// queue.enqueue(30);
// queue.enqueue(40);
// queue.enqueue(50);
// queue.display(); // Queue: 10 20 30 40 50

// queue.dequeue();
// queue.dequeue();
// queue.display(); // Queue: 30 40 50

// queue.enqueue(60);
// queue.enqueue(70);
// queue.display(); // Queue: 30 40 50 60 70

// queue.enqueue(80); // Queue is full
