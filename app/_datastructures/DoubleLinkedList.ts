// Double linked List:
// Methods present in it:-
// addLast
// addFirst
// remove
// print forward 
// print backward
// search(returns location of value)


export class ListNode<T> {
    data: T;
    next: ListNode<T> | null;
    prev: ListNode<T> | null;
    index: number;

    constructor(data: T) {
        this.data = data;
        this.next = null;
        this.prev = null;
        this.index = -1;
    }
}

class DoublyLinkedList<T> {
    public head: ListNode<T> | null;
    public tail: ListNode<T> | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Add a node to the end of the list
    addLast(data: T): void {
        const newNode = new ListNode(data);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }

    // Add a node to the start of the list
    addFirst(data: T): void {
        const newNode = new ListNode(data);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
    }

    // Remove a node by value
    remove(data: T): void {
        if (!this.head) {
            console.log("List is empty. Nothing to remove.");
            return;
        }
    
        let current: ListNode<T> | null = this.head; // Allow `current` to be `null`.
    
        while (current) {
            if (current.data === data) {
                if (current.prev) {
                    current.prev.next = current.next;
                } else {
                    this.head = current.next; // Update head if it's the first node
                }
    
                if (current.next) {
                    current.next.prev = current.prev;
                } else {
                    this.tail = current.prev; // Update tail if it's the last node
                }
    
                console.log(`Node with value ${data} removed.`);
                return;
            }
            current = current.next; // Ensure `current` can safely be `null`.
        }
    
        console.log(`Node with value ${data} not found.`);
    }    

    // Print the list forward
    printForward(): void {
    if (!this.head) {
        console.log("List is empty.");
        return;
    }

    let current: ListNode<T> | null = this.head; // Allow current to be null
    const result: T[] = [];
    while (current) {
        result.push(current.data);
        current = current.next; // Ensure current can be null
    }

    console.log("Doubly Linked List (Forward):", result.join(" -> "));
}


    // Print the list backward
    printBackward(): void {
        if (!this.tail) {
            console.log("List is empty.");
            return;
        }

        let current:  ListNode<T> | null = this.tail;
        const result: T[] = [];
        while (current) {
            result.push(current.data);
            current = current.prev;
        }

        console.log("Doubly Linked List (Backward):", result.join(" -> "));
    }

    // Search for a node by value
    search(data: T): number {
        let current = this.head;
        let index = 0; // Initialize the index counter
    
        while (current) {
            if (current.data === data) return index; // Return the current index if data matches
            current = current.next;
            index++;
        }
    
        return -1; // Return -1 if the element is not found
    }
    
}


// Exporting
export default DoublyLinkedList;



// ---------------------- Rough work: Not for you-------------------------------------
// Example Usage
// const dll = new DoublyLinkedList<number>();

// dll.addLast(10);
// dll.addLast(20);
// dll.addFirst(5);

// dll.printForward(); // Doubly Linked List (Forward): 5 -> 10 -> 20
// dll.printBackward(); // Doubly Linked List (Backward): 20 -> 10 -> 5

// console.log("Search 10:", dll.search(10)); // 1
// dll.remove(10);
// dll.printForward(); // Doubly Linked List (Forward): 5 -> 20
// dll.printBackward(); // Doubly Linked List (Backward): 20 -> 5
// console.log("Search 10:", dll.search(10)); // -1