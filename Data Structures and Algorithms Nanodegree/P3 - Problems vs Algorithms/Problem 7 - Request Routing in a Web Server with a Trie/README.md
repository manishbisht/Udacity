# Problem 7: Request Routing in a Web Server with a Trie

My implementation is exactly the same as problem 5 with some slight differences. I had to string clean the path by removing outside occurences of `/` with strip and then split it.

## Add Handler Method
Time Complexity: O(n)
Each part of the path needs to be iterated through


Space Complexity: O(n)
A new TrieNode is created for each part of the path

## Lookup Method
Time Complexity: O(n)

Space Complexity: O(1)

No additional memory is allocated