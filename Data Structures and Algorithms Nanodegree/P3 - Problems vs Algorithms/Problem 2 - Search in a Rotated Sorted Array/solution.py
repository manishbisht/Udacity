def rotated_array_search(input_list, number):
    """
    Find the index by searching in a rotated sorted array
    Args:
       input_list(array), number(int): Input array to search and the target
    Returns:
       int: Index or -1
    """
    return rotated_array_search_recursive(input_list,
                                          number,
                                          0,
                                          len(input_list) - 1)


def rotated_array_search_recursive(input_list, number, start, end):

    if start > end:
        return -1

    mid_index = (start + end) // 2
    mid_element = input_list[mid_index]

    if mid_element == number:
        return mid_index

    if input_list[start] <= mid_element:

        if mid_element > number and input_list[start] <= number:
            return rotated_array_search_recursive(input_list,
                                                  number,
                                                  start,
                                                  mid_index - 1)
        return rotated_array_search_recursive(input_list,
                                              number,
                                              mid_index + 1,
                                              end)

    if mid_element < number and input_list[end] >= number:
        return rotated_array_search_recursive(input_list,
                                              number,
                                              mid_index + 1,
                                              end)
    return rotated_array_search_recursive(input_list,
                                          number,
                                          start,
                                          mid_index - 1)


def linear_search(input_list, number):
    for index, element in enumerate(input_list):
        if element == number:
            return index
    return -1

# ----------------------------------------------------------------------------------------------------------------------
# Tests
# ----------------------------------------------------------------------------------------------------------------------


def test_function(test_case):
    input_list = test_case[0]
    number = test_case[1]
    if linear_search(input_list, number) == rotated_array_search(input_list, number):
        print("Pass")
    else:
        print("Fail")

# ----------------------------------------------------------------------------------------------------------------------
# Tests
# ----------------------------------------------------------------------------------------------------------------------
test_function([[6, 7, 8, 9, 10, 1, 2, 3, 4], 6])
test_function([[6, 7, 8, 9, 10, 1, 2, 3, 4], 1])
test_function([[6, 7, 8, 1, 2, 3, 4], 8])
test_function([[6, 7, 8, 1, 2, 3, 4], 1])
test_function([[6, 7, 8, 1, 2, 3, 4], 10])

# Test empty array
test_function([[], 10])

# Test array of single value
test_function([[1], 1])
test_function([[1], 0])

# Test non rotated array
test_function([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 3])