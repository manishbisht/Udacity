# Problem 5: Blockchain

I implemented my solution to the challenge by defining a singly-linked list called `Chain` to store instances of the `Block` class. I'm keeping track of the `last_node` to allow for easier appending. Further, I've defined dunder methods to help visualize the chain.

### Efficiency

##### Time complexity

- It takes constant time to add a node; O(1)
- It taked linear time to access a node (as evidenced in **iter** method); O(n)

##### Space Complexity

- The space taken by the change grows as more nodes are added; O(n)
