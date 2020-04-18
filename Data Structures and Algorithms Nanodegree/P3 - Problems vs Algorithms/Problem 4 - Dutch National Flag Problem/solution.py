def sort_012(input_list):
    """
    Given an input array consisting on only 0, 1, and 2, sort the array in a
    single traversal.
    Args:
       input_list(list): List to be sorted
    """
    next_0_index = 0
    next_2_index = len(input_list) - 1
    current_index = 0

    while(current_index) < next_2_index + 1:
        current_element = input_list[current_index]

        if current_element == 0:
            input_list[current_index] = input_list[next_0_index]
            input_list[next_0_index] = current_element
            next_0_index += 1
            current_index += 1
        elif current_element == 1:
            current_index += 1
        elif current_element == 2:
            input_list[current_index] = input_list[next_2_index]
            input_list[next_2_index] = current_element
            next_2_index -= 1
    return input_list


def test_function(test_case):
    sorted_array = sort_012(test_case)
    if sorted_array == sorted(test_case):
        print("Pass")
    else:
        print("Fail")

# ----------------------------------------------------------------------------------------------------------------------
# Tests
# ----------------------------------------------------------------------------------------------------------------------

# Default
test_function([0, 0, 2, 2, 2, 1, 1, 1, 2, 0, 2])
test_function([2, 1, 2, 0, 0, 2, 1, 0, 1, 0, 0, 2, 2, 2, 1, 2, 0, 0, 0, 2, 1, 0, 2, 0, 0, 1])
test_function([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2])