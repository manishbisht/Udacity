def sqrt(number):
    """
    Calculate the floored square root of a number
    Args:
       number(int): Number to find the floored squared root
    Returns:
       int: Floored Square Root
    """
    if not isinstance(number, int):
        return

    if number == 0 or number == 1:
        return number

    start = 1
    end = number

    while start <= end:
        mid = (start + end) // 2
        mid_squared = mid * mid

        if mid_squared == number:
            return mid

        elif mid_squared < number:
            start = mid + 1
            ans = mid
        else:
            end = mid - 1
    return ans


# ----------------------------------------------------------------------------------------------------------------------
# Tests
# ----------------------------------------------------------------------------------------------------------------------

print ("Pass" if  (3 == sqrt(9)) else "Fail")
print ("Pass" if  (0 == sqrt(0)) else "Fail")
print ("Pass" if  (4 == sqrt(16)) else "Fail")
print ("Pass" if  (1 == sqrt(1)) else "Fail")
print ("Pass" if  (5 == sqrt(27)) else "Fail")

# Invalid Type Test
print("Pass" if (sqrt(None) is None) else "Fail")

# Edge Case Test
print("Pass" if (0 == sqrt(0)) else "Fail")
print("Pass" if (1 == sqrt(1)) else "Fail")

# Large Number Test
print("Pass" if (9999 == sqrt(99999999)) else "Fail")