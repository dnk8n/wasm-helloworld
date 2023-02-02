// I plan to try contrast Rust WASM vs native javascript for a large array merge sorted

function initArray(length) {
  return Array.from({ length: length }, (_, i) => i);
}

function fisherYatesShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }
  return result;
}

function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}

function time(wrapped) {
  return function() {
    let start = performance.now();
    const result = wrapped.apply(this, arguments);
    let end = performance.now();
    if (result) return [result, end - start];
    return end - start;
  }
}

function main() {
  const [arr, timeInit] = time(initArray)(10_000_000);
  const timeShuffle = time(fisherYatesShuffle)(arr);
  const [arrSort, timeSort] = time(mergeSort)(arr);
  console.log("Time taken to init array: " + (timeInit) + " milliseconds");
  console.log("Time taken to shuffle: " + (timeShuffle) + " milliseconds");
  console.log("Time taken to sort: " + (timeSort) + " milliseconds");
  console.log("Array is correctly sorted: " + isSorted(arrSort));
}

main();
