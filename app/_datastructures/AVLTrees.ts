// AVLTree using DLL
// Methods present in it:-
/*
getHeight: to get height of a node
getBalance: to get balance factor that node
insert
inorder trversal
preOrder
postOrder
search: to search with value returns boolean value
delete(delete smallest from right side)
findIndex: return -1 if not found else return index

*/

export class AvlNode<T> {
    value: T;
    height: number;
    left: AvlNode<T> | null;
    right: AvlNode<T> | null;
    index: number;
    count: number;
  
    constructor(value: T) {
        this.value = value;
        this.height = 1; // Initial height
        this.left = null;
        this.right = null;
        this.index = -1;
        this.count = 1;
    }
  }
  
class AVLTree<T> {
    root: AvlNode<T> | null;
  
    constructor() {
        this.root = null;
    }
  
    // Utility to get the height of a node
    private getHeight(node: AvlNode<T> | null): number {
        return node ? node.height : 0;
    }
  
    // Utility to get the balance factor of a node
    private getBalance(node: AvlNode<T> | null): number {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }
  
    // Right rotation
    private rotateRight(y: AvlNode<T>): AvlNode<T> {
        const x = y.left as AvlNode<T>;
        const T2 = x.right;
  
        // Perform rotation
        x.right = y;
        y.left = T2;
  
        // Update heights
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
  
        return x;
    }
  
    // Left rotation
    private rotateLeft(x: AvlNode<T>): AvlNode<T> {
        const y = x.right as AvlNode<T>;
        const T2 = y.left;
  
        // Perform rotation
        y.left = x;
        x.right = T2;
  
        // Update heights
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
  
        return y;
    }
  
    // Insert a value into the AVL tree
    insert(value: T): void {
        this.root = this.insertNode(this.root, value);
    }
  
    private insertNode(node: AvlNode<T> | null, value: T): AvlNode<T> {
        // Perform the normal BST insertion
        if (node === null) {
            return new AvlNode(value);
        }
  
        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        } else {
            // Duplicate values not allowed
            return node;
        }
  
        // Update height of this ancestor node
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  
        // Get the balance factor to check whether this node became unbalanced
        const balance = this.getBalance(node);
  
        // If the node becomes unbalanced, perform rotations
        // Left Left Case
        if (balance > 1 && value < (node.left as AvlNode<T>).value) {
            return this.rotateRight(node);
        }
  
        // Right Right Case
        if (balance < -1 && value > (node.right as AvlNode<T>).value) {
            return this.rotateLeft(node);
        }
  
        // Left Right Case
        if (balance > 1 && value > (node.left as AvlNode<T>).value) {
            node.left = this.rotateLeft(node.left as AvlNode<T>);
            return this.rotateRight(node);
        }
  
        // Right Left Case
        if (balance < -1 && value < (node.right as AvlNode<T>).value) {
            node.right = this.rotateRight(node.right as AvlNode<T>);
            return this.rotateLeft(node);
        }
  
        return node;
    }
  
    // In-order traversal for printing the tree
    inOrderTraversal(callback: (index: number) => void): void {
        this.inOrder(this.root, callback);
    }
  
    private inOrder(node: AvlNode<T> | null, callback: (index: number) => void): void {
        if (node !== null) {
            this.inOrder(node.left, callback);
            callback(node.index);
            this.inOrder(node.right, callback);
        }
    }
  
    postOrderTraversal(callback: (index: number) => void): void {
      this.postOrder(this.root, callback);
    }
  
  private postOrder(node: AvlNode<T> | null, callback: (index: number) => void): void {
      if (node !== null) {
          this.postOrder(node.left, callback); // Traverse left subtree
          this.postOrder(node.right, callback); // Traverse right subtree
          callback(node.index) // Visit node
       }
   } 
  
  preOrderTraversal(callback: (index: number) => void): void {
    this.preOrder(this.root, callback);
  }
  
  private preOrder(node: AvlNode<T> | null, callback: (index: number) => void): void {
    if (node !== null) {
        callback(node.index); // Visit node
        this.preOrder(node.left, callback); // Traverse left subtree
        this.preOrder(node.right, callback); // Traverse right subtree
    }
  }
  
  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }
  
  private searchNode(node: AvlNode<T> | null, value: T): boolean {
    if (node === null) {
        return false;
    }
  
    if (value < node.value) {
        return this.searchNode(node.left, value);
    } else if (value > node.value) {
        return this.searchNode(node.right, value);
    } else {
        return true; // value found
    }
  }
  
  delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }
  
  private deleteNode(node: AvlNode<T> | null, value: T): AvlNode<T> | null {
    if (node === null) {
        return node;
    }
  
    if (value < node.value) {
        node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
        node.right = this.deleteNode(node.right, value);
    } else {
        // Node to be deleted
        if (node.left === null || node.right === null) {
            let temp = node.left ? node.left : node.right;
            if (temp === null) {
                node = null;
            } else {
                node = temp;
            }
        } else {
            // Node has two children: Get the inorder successor (smallest in the right subtree)
            let temp = this.minValueNode(node.right as AvlNode<T>);
            node.value = temp.value;
            node.right = this.deleteNode(node.right, temp.value);
        }
    }
  
    // If the tree had only one node, return
    if (node === null) {
        return node;
    }
  
    // Update height of the current node
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  
    // Get the balance factor of this node to check whether it became unbalanced
    const balance = this.getBalance(node);
  
    // Left Left Case
    if (balance > 1 && this.getBalance(node.left) >= 0) {
        return this.rotateRight(node);
    }
  
    // Right Right Case
    if (balance < -1 && this.getBalance(node.right) <= 0) {
        return this.rotateLeft(node);
    }
  
    // Left Right Case
    if (balance > 1 && this.getBalance(node.left) < 0) {
        node.left = this.rotateLeft(node.left as AvlNode<T>);
        return this.rotateRight(node);
    }
  
    // Right Left Case
    if (balance < -1 && this.getBalance(node.right) > 0) {
        node.right = this.rotateRight(node.right as AvlNode<T>);
        return this.rotateLeft(node);
    }
  
    return node;
  }
  
  private minValueNode(node: AvlNode<T>): AvlNode<T> {
    let current = node;
    while (current.left !== null) {
        current = current.left;
    }
    return current;
  }

  // Find index of a node with a given value
findIndex(value: T): number {
    return this.findIndexHelper(this.root, value);
  }
  
  // Helper method to recursively search for the node and return its index
  private findIndexHelper(node: AvlNode<T> | null, value: T): number {
    if (node === null) {
      return -1; // Node is not found
    }
  
    if (value < node.value) {
      return this.findIndexHelper(node.left, value); // Search in the left subtree
    } else if (value > node.value) {
      return this.findIndexHelper(node.right, value); // Search in the right subtree
    } else {
      // If value matches, but any additional condition is required
      if (node.value !== value) {
        return -1; // Node value doesn't match, return -1
      }
      return node.index; // Node found, return its index
    }
  }

  // method to get node by index
  getNodeByIndex(index: number): AvlNode<T> | null {
    return this.getNodeByIndexHelper(this.root, index);
  }

  private getNodeByIndexHelper(node: AvlNode<T> | null, index: number): AvlNode<T> | null {
    if (node === null) {
      return null;
    }
    if (node.index === index) {
      return node;
    }
    const left = this.getNodeByIndexHelper(node.left, index);
    if (left) return left;
    return this.getNodeByIndexHelper(node.right, index);
  }
  
}

// Exporting
export default AVLTree;



// ---------------------- Rough work: Not for you-------------------------------------

//   // Example usage
//   const avl = new AVLTree();
//   avl.insert(10);
//   avl.insert(20);
//   avl.insert(30);
//   avl.insert(40);
//   avl.insert(50);
//   avl.insert(25);
  
//   console.log("Pre-order traversal:");
//   avl.preOrderTraversal();
  
//   console.log("Post-order traversal:");
//   avl.postOrderTraversal();
  
//   console.log("In-order traversal:");
//   avl.inOrderTraversal();
  
//   console.log("Search 25:", avl.search(25)); // Should return true
//   console.log("Search 15:", avl.search(15)); // Should return false
  
//   avl.delete(25);
//   console.log("In-order traversal after deletion of 25:");
//   avl.inOrderTraversal(); // Should show tree after deletion