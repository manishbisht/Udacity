class MaxHeap:
    def __init__(self, initial_size=10):
        self.cbt = [None for _ in range(initial_size)]
        self.next_index = 0

    def insert(self, data):
        if self.next_index == len(self.cbt):
            newArray = [None for _ in range(len(self.cbt)*2)]
            newArray[:len(self.cbt)] = self.cbt
            self.cbt = newArray
        self.cbt[self.next_index] = data
        self._up_heapify()
        self.next_index += 1

    def remove(self):
        if self.size() == 0:
            return None
        self.next_index -= 1

        to_remove = self.cbt[0]
        last_element = self.cbt[self.next_index]

        self.cbt[0] = last_element

        self.cbt[self.next_index] = None
        self._down_heapify()

        return to_remove

    def _up_heapify(self):
        child_index = self.next_index

        while child_index >= 1:
            parent_index = (child_index - 1) // 2
            parent_element = self.cbt[parent_index]
            child_element = self.cbt[child_index]

            if parent_element < child_element:
                self.cbt[parent_index] = child_element
                self.cbt[child_index] = parent_element
                child_index = parent_index
            else:
                break

    def _down_heapify(self):
        parent_index = 0

        while parent_index < self.next_index:
            left_child_index = 2 * parent_index + 1
            right_child_index = 2 * parent_index + 2

            parent = self.cbt[parent_index]
            left_child = None
            right_child = None

            max_element = parent

            # check if left child exists
            if left_child_index < self.next_index:
                left_child = self.cbt[left_child_index]

            # check if right child exists
            if right_child_index < self.next_index:
                right_child = self.cbt[right_child_index]

            # compare with left child
            if left_child is not None:
                max_element = max(parent, left_child)

            # compare with right child
            if right_child is not None:
                max_element = max(right_child, max_element)

            # check if parent is rightly placed
            if max_element == parent:
                return

            if max_element == left_child:
                self.cbt[left_child_index] = parent
                self.cbt[parent_index] = max_element
                parent = left_child_index

            elif max_element == right_child:
                self.cbt[right_child_index] = parent
                self.cbt[parent_index] = max_element
                parent = right_child_index

    def size(self):
        return self.next_index


def rearrange_digits(input_list):
    """
    Rearrange Array Elements so as to form two number such that their sum is
    maximum.

    Args:
       input_list(list): Input List
    Returns:
       (int),(int): Two maximum sums
    """
    if len(input_list) == 0:
        return None
    max_heap = MaxHeap()
    for input in input_list:
        max_heap.insert(input)

    firstNumber = ""
    secondNumber = ""
    for i in range(max_heap.size()):
        if i % 2 == 1:
            firstNumber += str(max_heap.remove())
        else:
            secondNumber += str(max_heap.remove())
    return [int(firstNumber), int(secondNumber)]


def test_function(test_case):
    output = rearrange_digits(test_case[0])
    solution = test_case[1]
    if sum(output) == sum(solution):
        print("Pass")
    else:
        print("Fail")

# ----------------------------------------------------------------------------------------------------------------------
# Tests
# ----------------------------------------------------------------------------------------------------------------------

# Default
test_function([[1, 2, 3, 4, 5], [542, 31]])
test_function([[4, 6, 2, 5, 9, 8], [964, 852]])

# Repeating Numbers
test_function([[1, 1, 1, 1, 1], [111, 11]])
test_function([[1, 1, 2, 2, 3, 3, 4, 4], [4321, 4321]])

# Out of order with repeating
test_function([[9, 1, 8, 2, 7, 3, 9], [9831, 972]])