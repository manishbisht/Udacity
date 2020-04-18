# Problem 3: Rearrange Array Digits

I quickly noticed a pattern that the output was always a sequential alternation of the max elements. After realizing this I decided to use a max heap to sort the numbers. Then I popped off each number and alternated which output I appended to.

Time Complexity: O(nlog n)

Heapifying the array takes O(nlog n), popping every element takes O(nlog n), and creating the output takes O(n) resulting in O(nlog n).

Space Complexity: O(n)

The max heap creates a new array of size n.