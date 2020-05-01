# Problem 3: Huffman Coding

I implemented my solution to the challenge by defining a binary tree class `BinaryTreeNode` which represents node in huffman tree. Of interest, are the `value` and `weight` variables; they store the character of the alphabet and the sum of left and right child nodes (or number of times a character appears in input sentence for leaf nodes) respectively. For the `HuffmanCodingTree` I leveraged python's priority queue to help construct the tree representation of the input sentence. Further, I am defining a map (dictionary) called `codes` to help in decoding characters. `create_tree()` helper method uses python's `collections.Counter` and `operator.itemgetter` to create nodes for the huffman tree, which are then arranged according to their weight in `merge_nodes()`. The `encoder()` helper method recursively traverses the huffman tree adding 0 to encoded data for left nodes and 1 for right nodes.

### Efficiency

##### Time complexity

- It takes logarithmic time to encode data; O(log n)
- It takes linear time to decode data; O(n)
- Therefore, the total time complexity if O(n lon n)

##### Space Complexity

- The space taken by my solution's data-structures would increase proportionally to the size of the sentence; O(n)