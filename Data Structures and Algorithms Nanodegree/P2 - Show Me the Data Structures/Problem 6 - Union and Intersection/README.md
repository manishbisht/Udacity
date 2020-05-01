# Problem 6: Union and Intersection

I implemented my solution to the challenge by using a set. To find the union for two linked lists, I iterated over both linked lists and added their items to a set. Then I create a new linked list from the items in the set. For the intersection, I iterate over one linked list and add its item to a set only if it exists in the second linked list. Then create a new linked list from the items in set.

### Efficiency

##### Time complexity

- The time taken to arrive at the union takes linear time; O(n)
- The time taken to arrive at the intersection takes linear time; O(n)
- The time taken to append an item in a `LinkedList` instance increases proportionally to the size of list; O(n)
- Overall time complexity; O(n²)

##### Space Complexity

- The space taken by my solution increases as the size of the linked lists passed in increases; O(n)
