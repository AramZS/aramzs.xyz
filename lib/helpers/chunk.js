// Array chunking function.
// Source: https://github.com/30-seconds/30-seconds-of-code
module.exports = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
  arr.slice(i * size, i * size + size)
);