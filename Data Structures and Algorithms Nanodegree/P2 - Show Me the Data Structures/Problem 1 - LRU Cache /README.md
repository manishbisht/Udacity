# Problem 1: LRU Cache 

I implemented my solution to the challenge by using a doubly-linked list and a map (dictionary). All items added to the cache will be instances of `DoubleLinkedListNode`. In the `LRU_Cache` class, I am keeping track of the head and tail node. Further, I chose to set the head and tail node to be instances of `DoubleLinkedListNode` with a value of zero when the `LRU_Cache` is instanciated to make it easier to rearrange the cache since all cache nodes would have a previous and next node. The `head.next` node would hold the *least recently used* item in the cache and the `tail.previous` would be the *most recently used* item respectively. For the **get** and **set** operations on the LRU cache, I implemented helper methods `_add()` and `_remove()` to perform the addition to the "tail" and deletion of nodes. I also added dunder methods to help me visualize the cache (excluding the head and tail nodes used to pad cache items).

### Efficiency

##### Time complexity
- The *set* operation on the cache takes constant time; O(1)
- The *get* operation on the cache takes constant time; O(1)

##### Space Complexity
- The space taken by my solution's data-structures would increase as input increases, up to the capacity set for the LRU cache; O(n)