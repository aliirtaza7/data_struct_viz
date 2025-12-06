// Directed Graph:
// Methods present in it:-
/*


 */
class SortingAlgos{

    bubbleSort(arr: number[]): number[] {
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }
    
    selectionSort(arr: number[]): number[] {
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            // Swap
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
        return arr;
    }
    
    insertionSort(arr: number[]): number[] {
        let n = arr.length;
        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
        return arr;
    }
    
    mergeSort(arr: number[]): number[] {
        if (arr.length <= 1) {
            return arr;
        }
    
        const mid = Math.floor(arr.length / 2);
        const left = this.mergeSort(arr.slice(0, mid));
        const right = this.mergeSort(arr.slice(mid));
    
        return this.merge(left, right);
    }
    
    merge(left: number[], right: number[]): number[] {
        let result: number[] = [];
        let i = 0, j = 0;
    
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }
    
        return result.concat(left.slice(i), right.slice(j));
    }
    
    }
    
    
    
    export default SortingAlgos;
    
    // const sorter = new SortingAlgos();
    
    // // Unordered array
    // const arr = [5, 2, 9, 1, 5, 6];
    // // Using bubble sort
    // console.log("Bubble Sort:", sorter.bubbleSort(arr));
    // const arr1 = [5, 2, 9, 1, 5, 6];
    // // Using selection sort
    // console.log("Selection Sort:", sorter.selectionSort(arr1));
    
    // const arr2 = [5, 2, 9, 1, 5, 6];
    // // Using insertion sort
    // console.log("Insertion Sort:", sorter.insertionSort(arr2));
    
    // const arr3 = [5, 2, 9, 1, 5, 6];
    // // Using merge sort
    // console.log("Merge Sort:", sorter.mergeSort(arr3));