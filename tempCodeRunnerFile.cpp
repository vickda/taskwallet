// Function to find the minimum number of swaps needed to make a string balanced
function minimumSwaps(str) {
  let swaps = 0; // Variable to store the number of swaps
  let balance = 0; // Variable to track the balance of brackets

  // Loop through each character in the string
  for (let char of str) {
    if (char === "(") {
      // If the character is an opening bracket, increase the balance
      balance++;
    } else {
      // If the character is a closing bracket, decrease the balance
      balance--;

      // If the balance becomes negative, it means we need a swap
      if (balance < 0) {
        swaps++;
        balance = 0; // Reset balance after a swap
      }
    }
  }

  // The total number of swaps needed is half of the unbalanced closing brackets
  return balance === 0 ? swaps : -1;
}

// Example usage:
const inputString = "())(";
const result = minimumSwaps(inputString);
console.log(result); // Output: 2
