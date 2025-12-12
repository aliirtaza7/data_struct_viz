// Binary treee using Double linked List:
// Methods present in it:-
/*
deleteNodeLeft: This replaces delted node with largest value on left subtree
findMax
deleteNodeRight: This replaces delted node with smallest value on right subtree
findMin
insertNode
inOrderTraversal
preOrderTraversal
postOrderTraversal 
findIndex: if index not found return -1.
*/

export class TreeNode<T> {
    data: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null; 
    index: number;
    count: number;
  
    constructor(data: T) {
      this.data = data;
      this.left = null; 
      this.right = null; 
      this.index = -1;
      this.count = 1;
    }
  }
  

class BinaryTree<T> {
    public root: TreeNode<T> | null; 
  
    constructor() {
      this.root = null; 
    }
    // method to delete any node with a given value if you want to replace with left side of subtree

    deleteNodeLeft(data: T, callback: (node: TreeNode<T>) => void): void {
      this.root = this.deleteNodeHelperLeft(this.root, data, callback); 
    }

    // helper method to delete a node from the tree
    private deleteNodeHelperLeft(node: TreeNode<T> | null, data: T, callback: (node: TreeNode<T>) => void): TreeNode<T> | null {
      if (node === null) {
        return null; 
      }

      if (data < node.data) {
        node.left = this.deleteNodeHelperLeft(node.left, data, callback); // search left subtree
      } else if (data > node.data) {
        node.right = this.deleteNodeHelperLeft(node.right, data, callback); // search right subtree
      } else {
        if (node.count > 1) {
          node.count--;
          return node;
        }
        callback(node);
        // node with matching value found
        if (node.left === null && node.right === null) {
          return null;
        }

        if (node.left === null) {
          return node.right; // if the node has only right child, promote the right child
        }

        if (node.right === null) {
          return node.left; // if the node has only left child, promote the left child
        }

        // node has two children, find the in-order predecessor (largest node in left subtree)
        const predecessor = this.findMax(node.left);
        if (predecessor) {
          node.data = predecessor.data; // replace node's value with predecessor's value
          node.left = this.deleteNodeHelperLeft(node.left, predecessor.data, callback); // delete the predecessor node
        }
      }

      return node;
    }

    // helper method to find the largest node in a subtree
    public findMax(node: TreeNode<T>): TreeNode<T> | null {
      while (node.right !== null) {
        node = node.right; // keep going to the rightmost node
      }
      return node;
    }

  
    // method to delete any node with a given value if you want to replace with right side of subtree
    deleteNodeRight(data: T, callback: (node: TreeNode<T>) => void): void {
      this.root = this.deleteNodeHelperRight(this.root, data, callback); 
    }
  
    // helper method to delete a node from the tree
    private deleteNodeHelperRight(node: TreeNode<T> | null, data: T, callback: (node: TreeNode<T>) => void): TreeNode<T> | null {
      if (node === null) {
        return null; 
      }
  
      if (data < node.data) {
        node.left = this.deleteNodeHelperRight(node.left, data, callback); // search left subtree
      } else if (data > node.data) {
        node.right = this.deleteNodeHelperRight(node.right, data, callback); // search right subtree
      } else {
        if (node.count > 1) {
          node.count--;
          return node;
        }
        callback(node);
        // node with matching value found
        if (node.left === null && node.right === null) {
          return null;
        }
  
        if (node.left === null) {
          return node.right; // if the node has only right child, promote the right child
        }
  
        if (node.right === null) {
          return node.left; // if the node has only left child, promote the left child
        }
  
        // node has two children, find the in-order successor (smallest node in right subtree)
        const successor = this.findMin(node.right);
        if (successor) {
          node.data = successor.data; // replace node's value with successor's value
          node.right = this.deleteNodeHelperRight(node.right, successor.data, callback); // delete the successor node
        }
      }
  
      return node;
    }
  
    // helper method to find the smallest node in a subtree
    public findMin(node: TreeNode<T>): TreeNode<T> | null {
      while (node.left !== null) {
        node = node.left; // keep going to the leftmost node
      }
      return node;
    }
    // method to search for a node with a given value
findIndex(data: T): number {
  return this.searchHelper(this.root, data);
}

// helper method to search for a node recursively
private searchHelper(node: TreeNode<T> | null, data: T): number {
  if (node === null) {
    return -1; // if node is null, the data is not found
  }

  if (data < node.data) {
    return this.searchHelper(node.left, data); // search in the left subtree
  } else if (data > node.data) {
    return this.searchHelper(node.right, data); // search in the right subtree
  } else {
    if (node.data === data) {
      return node.index; // node with matching value found, return its index
    } else {
      return -1; // if the data doesn't match, return -1
    }
  }
}


  
    // method to insert a value into the tree
    insert(data: T): void {
      const newNode = new TreeNode(data); // create a new node
      if (this.root === null) {
        this.root = newNode; // set the new node as root if tree is empty
      } else {
        this.insertNode(this.root, newNode); // otherwise, insert recursively
      }
    }
  
    // helper method to insert a node into the tree
    private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
      if (newNode.data < node.data) {
        if (node.left === null) {
          node.left = newNode; // insert as left child if position is empty
        } else {
          this.insertNode(node.left, newNode); // otherwise, continue in left subtree
        }
      } else if (newNode.data > node.data) {
        if (node.right === null) {
          node.right = newNode; // insert as right child if position is empty
        } else {
          this.insertNode(node.right, newNode); // otherwise, continue in right subtree
        }
      } else {
        node.count++;
      }
    }
  
    // method to perform in-order traversal: left -> root -> right
    inOrderTraversal(node: TreeNode<T> | null = this.root, callback: (index: number) => void): void {
      if (node !== null) {
        this.inOrderTraversal(node.left, callback); // traverse left subtree
        callback(node.index); // visit the root
        this.inOrderTraversal(node.right, callback); // traverse right subtree
      }
    }
  
    // method to perform pre-order traversal: root -> left -> right
    preOrderTraversal(node: TreeNode<T> | null = this.root, callback: (index: number) => void): void {
      if (node !== null) {
        callback(node.index); // visit the root
        this.preOrderTraversal(node.left, callback); // traverse left subtree
        this.preOrderTraversal(node.right, callback); // traverse right subtree
      }
    }
  
    // method to perform post-order traversal: left -> right -> root
    postOrderTraversal(node: TreeNode<T> | null = this.root, callback: (index: number) => void): void {
      if (node !== null) {
        this.postOrderTraversal(node.left, callback); // traverse left subtree
        this.postOrderTraversal(node.right, callback); // traverse right subtree
        callback(node.index); // visit the root
      }
    }

    getHeight(node: TreeNode<T> | null = this.root): number {
      if (node === null) {
        return 0;
      }
  
      const leftHeight = this.getHeight(node.left);
      const rightHeight = this.getHeight(node.right);
  
      return Math.max(leftHeight, rightHeight) + 1;
    }

    // method to get node by index
    getNodeByIndex(index: number): TreeNode<T> | null {
      return this.getNodeByIndexHelper(this.root, index);
    }

    private getNodeByIndexHelper(node: TreeNode<T> | null, index: number): TreeNode<T> | null {
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

    // helper method to see if data would increase the height of the tree
    private wouldIncreaseHeightHelper(node: TreeNode<T>, newNode: TreeNode<T>): boolean {
      if (newNode.data < node.data) {
        if (node.left === null) {
          return true;
        } else {
          return this.wouldIncreaseHeightHelper(node.left, newNode);
        }
      } else if (newNode.data > node.data) {
        if (node.right === null) {
          return true;
        } else {
          return this.wouldIncreaseHeightHelper(node.right, newNode);
        }
      } else {
        return false;
      }
    }
  }
  
// Exporting
export default BinaryTree;



// ---------------------- Rough work: Not for you-------------------------------------
  
  // // example usage:
  // const binaryTree = new BinaryTree<number>();
  // binaryTree.deleteNodeRight(2);

  // binaryTree.insert(2);
  // binaryTree.insert(7);
  // binaryTree.insert(9);
  // binaryTree.insert(6);
  // binaryTree.insert(5);
  // binaryTree.insert(8);
  // binaryTree.insert(1);
  
  // console.log("in-order traversal:");
  // binaryTree.inOrderTraversal();
  
  // console.log("\npre-order traversal:");
  // binaryTree.preOrderTraversal();
  
  // console.log("\npost-order traversal:");
  // binaryTree.postOrderTraversal();

  // binaryTree.deleteNodeLeft(2);
  // console.log("\npre-order traversal:");
  // binaryTree.preOrderTraversal();

  // binaryTree.deleteNodeRight(2);
  // console.log("\npre-order traversal:");
  // binaryTree.preOrderTraversal();
  