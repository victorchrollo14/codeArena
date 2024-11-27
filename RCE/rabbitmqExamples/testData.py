question1 = {
    "submissionId": "runcode_climbing_stairs",
    "language": "python",
    "code": "def climbStairs(n):\n    if n == 1:\n        return 1\n    if n == 2:\n        return 2\n    a, b = 1, 2\n    for i in range(3, n + 1):\n        a, b = b, a + b\n    return b",
    "testcases": ["2", "3", "5"],
    "expectedAnswer": ["2", "3", "8"],
    "compileTimeout": 2000,
    "runTimeout": 4000,
    "memoryLimit": 536870912,
    "codeSnippet": "def climbStairs(n: int) -> int:\n    pass",
}

question2 = {
    "submissionId": "runcode_two_sum",
    "language": "python",
    "code": "def twoSum(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[j] == target - nums[i]:\n                return [i, j]\n    return []",
    "testcases": ["[2, 7, 11, 15]\n9", "[3, 2, 4]\n6", "[3, 3]\n6"],
    "expectedAnswer": ["[0, 1]", "[1, 2]", "[0, 1]"],
    "compileTimeout": 2000,
    "runTimeout": 4000,
    "memoryLimit": 536870912,
    "codeSnippet": "def twoSum(nums: List[int], target: int) -> List[int]:\n    pass",
}

question3 = {
    "submissionId": "runcode_merge_two_sorted_lists",
    "language": "python",
    "code": "def mergeTwoLists(l1, l2):\n    dummy = ListNode()\n    current = dummy\n    while l1 and l2:\n        if l1.val < l2.val:\n            current.next = l1\n            l1 = l1.next\n        else:\n            current.next = l2\n            l2 = l2.next\n        current = current.next\n    current.next = l1 if l1 else l2\n    return dummy.next",
    "testcases": ["[1, 2, 4]\n[1, 3, 4]", "[]\n[]", "[]\n[0]"],
    "expectedAnswer": ["[1, 1, 2, 3, 4, 4]", "[]", "[0]"],
    "compileTimeout": 2000,
    "runTimeout": 4000,
    "memoryLimit": 536870912,
    "codeSnippet": "def mergeTwoLists( l1: ListNode, l2: ListNode) -> ListNode:\n    pass",
}

question4 = {
    "submissionId": "runcode_pascals_triangle",
    "language": "python",
    "code": "def generate(numRows):\n    triangle = []\n    for i in range(numRows):\n        row = [1] * (i + 1)\n        for j in range(1, i):\n            row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]\n        triangle.append(row)\n    return triangle",
    "testcases": ["5", "1", "3"],
    "expectedAnswer": [
        "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]",
        "[[1]]",
        "[[1], [1, 1], [1, 2, 1]]",
    ],
    "compileTimeout": 2000,
    "runTimeout": 4000,
    "memoryLimit": 536870912,
    "codeSnippet": "def generate(numRows: int) -> List[List[int]]:\n    pass",
}

question5 = {
    "submissionId": "runcode_check_straight_line",
    "language": "python",
    "code": "def checkStraightLine(coordinates):\n    (x0, y0), (x1, y1) = coordinates[:2]\n    dx, dy = x1 - x0, y1 - y0\n    for x, y in coordinates[2:]:\n        if (y - y0) * dx != (x - x0) * dy:\n            return False\n    return True",
    "testcases": [
        "[[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]",
        "[[1, 1], [2, 2], [3, 4], [4, 5], [5, 6], [7, 7]]",
    ],
    "expectedAnswer": ["True", "False"],
    "compileTimeout": 2000,
    "runTimeout": 4000,
    "memoryLimit": 536870912,
    "codeSnippet": "def checkStraightLine(coordinates: List[List[int]]) -> bool:\n    pass",
}

question6 = {
    "submissionId": "runcode_longest_substring_without_repeating_characters",
    "language": "python",
    "code": "def lengthOfLongestSubstring(s):\n    char_set = set()\n    left = 0\n    result = 0\n    for right in range(len(s)):\n        while s[right] in char_set:\n            char_set.remove(s[left])\n            left += 1\n        char_set.add(s[right])\n        result = max(result, right - left + 1)\n    return result",
    "testcases": ["abcabcbb", "bbbbb", "pwwkew"],
    "expectedAnswer": ["3", "1", "3"],
    "compileTimeout": 2000,
    "runTimeout": 4000,
    "memoryLimit": 536870912,
    "codeSnippet": "def lengthOfLongestSubstring(s: str) -> int:\n    pass",
}

question7 = {
    "submissionId": "runcode_zigzag_conversion",
    "language": "python",
    "code": "def convert(s, numRows):\n    if numRows == 1 or numRows >= len(s):\n        return s\n    rows = [''] * numRows\n    current_row, step = 0, -1\n    for char in s:\n        rows[current_row] += char\n        if current_row == 0 or current_row == numRows - 1:\n            step *= -1\n        current_row += step\n    return ''.join(rows)",
    "testcases": ["PAYPALISHIRING\n3", "PAYPALISHIRING\n4", "A\n1"],
    "expectedAnswer": ["PAHNAPLSIIGYIR", "PINALSIGYAHRPI", "A"],
    "compileTimeout": 2000,
    "runTimeout": 4000,
    "memoryLimit": 536870912,
    "codeSnippet": "def convert(s: str, numRows: int) -> str:\n    pass",
}

question8 = {
    "submissionId": "runcode_container_with_most_water",
    "language": "python",
    "code": "def maxArea(height):\n    left, right = 0, len(height) - 1\n    max_area = 0\n    while left < right:\n        max_area = max(max_area, min(height[left], height[right]) * (right - left))\n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n    return max_area",
    "testcases": ["[1,8,6,2,5,4,8,3,7]", "[1,1]", "[4,3,2,1,4]"],
    "expectedAnswer": ["49", "1", "16"],
    "compileTimeout": 2000,
    "runTimeout": 4000,
    "memoryLimit": 536870912,
    "codeSnippet": "def maxArea(height: List[int]) -> int:\n    pass",
}

question9 = {
    "submissionId": "runcode_swap_nodes_in_pairs",
    "language": "python",
    "code": "def swapPairs(head):\n    dummy = ListNode(0)\n    dummy.next = head\n    current = dummy\n    while current.next and current.next.next:\n        first = current.next\n        second = current.next.next\n        first.next = second.next\n        current.next = second\n        current.next.next = first\n        current = current.next.next\n    return dummy.next",
    "testcases": ["[1, 2, 3, 4]", "[]", "[1]"],
    "expectedAnswer": ["[2, 1, 4, 3]", "[]", "[1]"],
    "compileTimeout": 2000,
    "runTimeout": 4000,
    "memoryLimit": 536870912,
    "codeSnippet": "def swapPairs(head: ListNode) -> ListNode:\n    pass",
}

question10 = {
    "submissionId": "runcode_valid_sudoku",
    "language": "python",
    "code": "def isValidSudoku(board):\n    def is_valid(cells):\n        cells = [c for c in cells if c != '.']\n        return len(cells) == len(set(cells))\n    for row in board:\n        if not is_valid(row):\n            return False\n    for col in zip(*board):\n        if not is_valid(col):\n            return False\n    for i in range(0, 9, 3):\n        for j in range(0, 9, 3):\n            block = [board[x][y] for x in range(i, i + 3) for y in range(j, j + 3)]\n            if not is_valid(block):\n                return False\n    return True",
    "testcases": [
        '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        '[["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        '[[".",".",".",".","5",".",".","1","."],[".","4",".","3",".",".",".",".","."],[".",".",".",".",".","3",".",".","1"],["8",".",".",".",".",".",".","2","."],[".",".","2",".","7",".",".",".","."],[".","1","5",".",".",".",".",".","."],[".",".",".",".",".","2",".",".","."]]',
        '[[".",".","5",".",".",".",".",".","."],[".",".",".","8",".",".",".","3","."],[".","5",".",".","9",".","6",".","."]]',
        '[["7",".",".",".","4",".",".","9","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".","9",".","2",".","."]]',
        '[[".",".",".","3",".",".",".",".","."],[".",".","2",".",".",".","3",".","."],[".",".",".",".",".",".",".","6","."]]',
        '[[".",".",".",".",".",".",".",".","."]]',
        '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
    ],
    "expectedAnswer": [
        "True",
        "False",
        "True",
        "True",
        "True",
        "True",
        "True",
        "True",
        "True",
        "True",
    ],
    "compileTimeout": 2000,
    "runTimeout": 4000,
    "memoryLimit": 536870912,
    "codeSnippet": "def isValidSudoku(board: List[List[str]]) -> bool:\n    pass",
}

question11 = {
    "submissionId": "runcode_median_two_sorted_arrays",
    "language": "python",
    "code": "def findMedianSortedArrays(nums1, nums2):\n    nums = sorted(nums1 + nums2)\n    length = len(nums)\n    if length % 2 == 0:\n        return (nums[length // 2 - 1] + nums[length // 2]) / 2\n    else:\n        return nums[length // 2]",
    "testcases": [
        "[1, 3]\n[2]",
        "[1, 2]\n[3, 4]",
        "[0, 0]\n[0, 0]",
        "[]\n[1]",
        "[2]\n[]",
    ],
    "expectedAnswer": ["2", "2.5", "0.0", "1", "2"],
    "compileTimeout": 2000,
    "runTimeout": 4000,
    "memoryLimit": 536870912,
    "codeSnippet": "def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:\n    pass",
}

question12 = {
    "submissionId": "runcode_regex_matching",
    "language": "python",
    "code": "def isMatch(s, p):\n    dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]\n    dp[0][0] = True\n    for i in range(1, len(p) + 1):\n        if p[i - 1] == '*':\n            dp[0][i] = dp[0][i - 2]\n    for i in range(1, len(s) + 1):\n        for j in range(1, len(p) + 1):\n            if p[j - 1] == '.' or p[j - 1] == s[i - 1]:\n                dp[i][j] = dp[i - 1][j - 1]\n            elif p[j - 1] == '*':\n                dp[i][j] = dp[i][j - 2] or (dp[i - 1][j] if p[j - 2] == s[i - 1] or p[j - 2] == '.' else False)\n    return dp[-1][-1]",
    "testcases": [
        "aa\na",
        "aa\na*",
        "ab\n.*",
        "aab\nc*a*b",
        "mississippi\nmis*is*p*.",
    ],
    "expectedAnswer": ["False", "True", "True", "True", "False"],
    "compileTimeout": 2000,
    "runTimeout": 4000,
    "memoryLimit": 536870912,
    "codeSnippet": "def isMatch(s: str, p: str) -> bool:\n    pass",
}

question13 = {
    "submissionId": "runcode_wildcard_matching",
    "language": "python",
    "code": "def isMatch(s, p):\n    s_len, p_len = len(s), len(p)\n    dp = [[False] * (p_len + 1) for _ in range(s_len + 1)]\n    dp[0][0] = True\n    for j in range(1, p_len + 1):\n        if p[j - 1] == '*':\n            dp[0][j] = dp[0][j - 1]\n    for i in range(1, s_len + 1):\n        for j in range(1, p_len + 1):\n            if p[j - 1] == '*':\n                dp[i][j] = dp[i - 1][j] or dp[i][j - 1]\n            elif p[j - 1] == s[i - 1] or p[j - 1] == '?':\n                dp[i][j] = dp[i - 1][j - 1]\n    return dp[-1][-1]",
    "testcases": ["aa\na", "aa\n*", "cb\n?a", "adceb\n*a*b", "acdcb\na*c?b"],
    "expectedAnswer": ["False", "True", "False", "True", "False"],
    "compileTimeout": 2000,
    "runTimeout": 4000,
    "memoryLimit": 536870912,
    "codeSnippet": "def isMatch(s: str, p: str) -> bool:\n    pass",
}

question14 = {
    "submissionId": "runcode_permutation_sequence",
    "language": "python",
    "code": "def getPermutation(n, k):\n    import math\n    nums = list(range(1, n + 1))\n    k -= 1\n    result = []\n    for i in range(n, 0, -1):\n        j = k // math.factorial(i - 1)\n        k %= math.factorial(i - 1)\n        result.append(nums.pop(j))\n    return ''.join(map(str, result))",
    "testcases": ["3\n3", "4\n9", "3\n1"],
    "expectedAnswer": ["213", "2314", "123"],
    "compileTimeout": 2000,
    "runTimeout": 4000,
    "memoryLimit": 536870912,
    "codeSnippet": "def getPermutation(n: int, k: int) -> str:\n    pass",
}

question15 = {
    "submissionId": "runcode_count_digit_one",
    "language": "python",
    "code": "def countDigitOne(n):\n    count = 0\n    factor = 1\n    while factor <= n:\n        lower_numbers = n - (n // factor) * factor\n        current_digit = (n // factor) % 10\n        higher_numbers = n // (factor * 10)\n        if current_digit == 0:\n            count += higher_numbers * factor\n        elif current_digit == 1:\n            count += higher_numbers * factor + lower_numbers + 1\n        else:\n            count += (higher_numbers + 1) * factor\n        factor *= 10\n    return count",
    "testcases": ["13", "0", "123"],
    "expectedAnswer": ["6", "0", "57"],
    "compileTimeout": 2000,
    "runTimeout": 4000,
    "memoryLimit": 536870912,
    "codeSnippet": "def countDigitOne(n: int) -> int:\n     pass",
}

questions = {
    "1": question1,
    "2": question2,
    "3": question3,
    "4": question4,
    "5": question5,
    "6": question6,
    "7": question7,
    "8": question8,
    "9": question9,
    "10": question10,
    "11": question11,
    "12": question12,
    "13": question13,
    "14": question14,
    "15": question15,
}
