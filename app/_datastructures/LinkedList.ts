// linkedList
// Methods present in it:-
// append:(to add at end)
// prepend(to add at start)
// addAt(to add at any location less then current size of the list)
// deleteAt(to delete from any location)
// delete(to delete any value)
// print(to print the list)
// getSize(to know the size of the list)
// search(searches for index o f element)

export class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList<T> {
    public head: ListNode<T> | null;
    private size: number;

    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Add a node to the end of the list
    append(value: T): void {
        const newNode = new ListNode(value);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            // Check if current is not null before accessing .next
            while (current !== null && current.next !== null) {
                current = current.next;
            }
            if (current !== null) {
                current.next = newNode;
            }
        }
        this.size++;
    }

    // Add a node to the beginning of the list
    prepend(value: T): void {
        const newNode = new ListNode(value);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    // Add a node at a specific index
    addAt(index: number, value: T): void {
        if (index < 0 || index > this.size) {
            console.log("Index out of bounds");
            return;
        }

        const newNode = new ListNode(value);
        if (index === 0) {
            this.prepend(value);
        } else {
            let current = this.head;
            let prev: ListNode<T> | null = null;
            let count = 0;

            // Traverse to the correct position
            while (count < index && current !== null) {
                prev = current;
                current = current.next;
                count++;
            }

            // Insert the new node
            if (prev !== null) {
                newNode.next = current;
                prev.next = newNode;
                this.size++;
            }
        }
    }

    // Delete a node by index
    deleteAt(index: number): void {
        if (index < 0 || index >= this.size) {
            console.log("Index out of bounds");
            return;
        }

        if (index === 0) {
            this.head = this.head?.next || null;
        } else {
            let current = this.head;
            let prev: ListNode<T> | null = null;
            let count = 0;

            // Traverse to the node to be deleted
            while (count < index && current !== null) {
                prev = current;
                current = current.next;
                count++;
            }

            // Adjust links to remove the node
            if (prev !== null && current !== null) {
                prev.next = current.next;
            }
        }

        this.size--;
    }

    // Delete a node by value
    delete(value: T): void {
        if (this.head === null) return;

        if (this.head.value === value) {
            this.head = this.head.next;
            this.size--;
            return;
        }

        let current = this.head;
        while (current.next !== null && current.next.value !== value) {
            current = current.next;
        }

        if (current.next !== null) {
            current.next = current.next.next;
            this.size--;
        }
    }

    // Search for a node by value
    search(value: T): number {
        let current = this.head;
        let index = 0;

        while (current !== null) {
            if (current.value === value) {
                return index;
            }
            current = current.next;
            index++;
        }

        return -1; // Value not found
    }

    // Print the linked list
    print(): void {
        let current = this.head;
        const result: T[] = [];
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        console.log(result.join(" -> "));
    }

    // Get the size of the linked list
    getSize(): number {
        return this.size;
    }
}

// Exporting the LinkedList class for further use
export default LinkedList;


// ---------------------- Rough work: Not for you-------------------------------------

// Example usage:
// const list = new LinkedList<number>();
// list.append(10);
// list.append(20);
// list.append(30);
// list.print(); // Output: 10 -> 20 -> 30
// list.prepend(5);
// list.print(); // Output: 5 -> 10 -> 20 -> 30
// list.addAt(2, 125);
// list.print(); // Output: 5 -> 10 -> 125 -> 20 -> 30
// list.deleteAt(3);
// list.print(); // Output: 5 -> 10 -> 125 -> 30
// list.delete(125);
// list.print(); // Output: 5 -> 10 -> 30
// console.log("Size of list:", list.getSize()); // Output: Size of list: 3
// console.log("Search 10:", list.search(10)); // Output: 1
// console.log("Search 40:", list.search(40)); // Output: -1
