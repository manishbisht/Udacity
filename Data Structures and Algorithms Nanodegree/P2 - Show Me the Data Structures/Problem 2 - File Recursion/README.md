# Problem 2: File Recursion

I implemented my solution to the challenge by using a array to store all paths to files matching the extension being searched for. I am excluding dotfiles and hidden directories in the search by leaving out anything whose name starts with a ".". Then I recursively search for the extension in sub-directories.

### Efficiency

##### Time complexity

- The time taken to search for the suffix would increase as there are directories to search through from the path provided; O(n)

##### Space Complexity

- The space taken by my solution's data-structures would increase as the number of matching files increases; O(n)