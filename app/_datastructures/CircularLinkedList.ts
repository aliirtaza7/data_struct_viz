// circular linkedList
// Methods present in it:-
// add(to add at last)
// print
// remove(to remove a node with value x)
// search(returns index of number if present, if not then return -1)

export class ListNode<T> {
    data: T;
    next: ListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

class CircularLinkedList<T> {
    public head: ListNode<T> | null;
    public tail: ListNode<T> | null; // Keep track of the tail
    public size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Add a node to the end of the list
    add(data: T): void {
        const newNode = new ListNode(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = this.head; // Point to itself
        } else {
            this.tail!.next = newNode; // Update the tail's next pointer
            newNode.next = this.head; // Maintain circularity
            this.tail = newNode; // Update the tail reference
        }
        this.size++;
    }

    // Print the list
    // print(): void {
    //     if (!this.head) {
    //         console.log("List is empty.");
    //         return;
    //     }

    //     let temp = this.head;
    //     const result: T[] = [];
    //     do {
    //         result.push(temp.data);
    //         temp = temp.next!;
    //     } while (temp !== this.head);

    //     console.log("Circular Linked List:", result.join(" -> "));
    // }

    // Remove a node by value
    remove(data: T): void {
        if (!this.head) {
            return;
        }

        let current = this.head;
        let previous: ListNode<T> | null = null;

        // Case 1: If the node to be removed is the head node
        if (current.data === data) {
            if (this.head === this.tail) {
                // Only one node in the list
                this.head = null;
                this.tail = null;
            } else {
                this.tail!.next = this.head.next; // Update tail's next pointer
                this.head = this.head.next; // Update the head
            }
            this.size--;
            return;
        }

        // Case 2: If the node to be removed is not the head
        do {
            previous = current;
            current = current.next!;
            if (current.data === data) {
                previous.next = current.next; // Update the link
                if (current === this.tail) {
                    this.tail = previous; // Update tail if we removed the tail node
                }
                this.size--;
                return;
            }
        } while (current !== this.head);
    }

   
    // Search for a node by value and return its index
    search(data: T): number {
        if (!this.head) return -1; // Return -1 if the list is empty

        let temp = this.head;
        let index = 0;

        do {
            if (temp.data === data) return index; // Return the index if the value is found
            temp = temp.next!;
            index++;
        } while (temp !== this.head);

        return -1; // Return -1 if the value is not found
    }
}

export default CircularLinkedList;
// ---------------------- Rough work: Not for you-------------------------------------


// Example Usage
// const cll = new CircularLinkedList<number>();
// cll.add(10);
// cll.add(20);
// cll.add(30);
// cll.print(); // Circular Linked List: 10 -> 20 -> 30
// console.log("Search 20: it is at ", cll.search(20)); // true
// cll.remove(20);
// cll.print(); // Circular Linked List: 10 -> 30
// console.log("Search 20:", cll.search(20)); // false
