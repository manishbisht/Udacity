# Problem 4: Active Directory

I implemented my solution to the challenge by recursively checking if the user is in the groups of the `Group` instance.

### Efficiency

##### Time complexity

- It takes linear time to check all groups; O(n)

##### Space Complexity

- The space taken by my solution would increase proportionally to `Group.groups`; O(n)