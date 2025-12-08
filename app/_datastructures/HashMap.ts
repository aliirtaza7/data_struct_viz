// HashMap
// Methods present in it:-
/*
hash: Hash function key
set: Set key-value pair
get: Get value by key
delete: Remove key-value pair
has: Check key existence
keys: Return all keys
values: Return all values
size: Return number of entries
clear: Clear all entries
printAll: Print all keys-values */


class HashMap<K, V> {
    public map: Array<[K, V] | null>;
  
    constructor(size: number = 16) {
        this.map = new Array(size);
        for (let i = 0; i < size; i++) {
            this.map[i] = null;
        }
    }
  
    // Hash function to convert keys to an index
    private hash(key: K): number {
        let hashValue = 0;
        const keyString = String(key);
        for (let i = 0; i < keyString.length; i++) {
            hashValue = (hashValue << 5) - hashValue + keyString.charCodeAt(i);
        }
        return Math.abs(hashValue) % this.map.length;
    }
  
    // Set a key-value pair (or update the value if the key exists)
    set(key: K, value: V): void {
        const index = this.hash(key);
  
        // Linear probing to find the appropriate slot for the key
        let i = index;
        while (this.map[i % this.map.length]) {
            // If the key already exists, update its value
            if (this.map[i % this.map.length]![0] === key) {
                this.map[i % this.map.length]![1] = value;
                return;
            }
            i++;
        }
  
        // If the slot is empty, insert the key-value pair
        this.map[i % this.map.length] = [key, value];
    }
  
    // Get the value associated with a key
    get(key: K): V | undefined {
        const index = this.hash(key);
  
        let i = index;
        while (this.map[i % this.map.length]) {
            if (this.map[i % this.map.length]![0] === key) {
                return this.map[i % this.map.length]![1];
            }
            i++;
        }
        return undefined;
    }
  
    // Remove a key-value pair
    delete(key: K): boolean {
        const index = this.hash(key);
  
        let i = index;
        while (this.map[i % this.map.length]) {
            if (this.map[i % this.map.length]![0] === key) {
                this.map[i % this.map.length] = null;
                return true;
            }
            i++;
        }
        return false;
    }
  
    // Check if a key exists
    has(key: K): boolean {
        const index = this.hash(key);
  
        let i = index;
        while (this.map[i % this.map.length]) {
            if (this.map[i % this.map.length]![0] === key) {
                return true;
            }
            i++;
        }
        return false;
    }
  
    // Return all keys
    keys(): K[] {
        const keys: K[] = [];
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i] !== null) {
                keys.push(this.map[i]![0]);
            }
        }
        return keys;
    }
  
    // Return all values
    values(): V[] {
        const values: V[] = [];
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i] !== null) {
                values.push(this.map[i]![1]);
            }
        }
        return values;
    }
  
    // Return the number of stored entries
    size(): number {
        let count = 0;
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i] !== null) {
                count++;
            }
        }
        return count;
    }
  
    // Clear all entries
    clear(): void {
        for (let i = 0; i < this.map.length; i++) {
            this.map[i] = null;
        }
    }
  
  // Function to print all keys with their corresponding values in random order (without using push)
  printAll(): void {
    // Create an array to store the entries manually (without using push)
    const entries: [K, V][] = [];
    
    let index = 0;
    for (let i = 0; i < this.map.length; i++) {
        if (this.map[i] !== null) {
            entries[index] = this.map[i]!; 
            index++;
        }
    }
  
    // Shuffle the entries array randomly
    for (let i = entries.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [entries[i], entries[j]] = [entries[j], entries[i]];
    }
  
    // Print the shuffled key-value pairs
      for (let i = 0; i < entries.length; i++) {
          console.log(`Key: ${entries[i][0]}, Value: ${entries[i][1]}`);
      }
    }
  
  
  }
  
  
  // Exporting
  export default HashMap;
  
  
  
  // ---------------------- Rough work: Not for you-------------------------------------
  
  // // Example usage:
  // const map = new HashMap<string, number>();
  // map.set("a", 1);
  // map.set("b", 2);
  // map.set("c", 3);
  // map.set("9", 389);
  // map.set("d", 56);
  
  // console.log(map.get("a")); // 1
  // map.set("a", 10); // Update value for key "a"
  // console.log(map.get("a")); // 10
  // console.log(map.get("b")); // 2
  // console.log(map.size());   // 3
  
  // map.delete("b");
  // console.log(map.has("b")); // false
  // console.log(map.printAll());
  