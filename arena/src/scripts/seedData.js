const problems = [
  {
    title: "Climbing Stairs",
    description:
      "You are climbing a staircase with a total of n steps. You can climb either 1 or 2 steps at a time. Given the number of steps n, calculate the total number of distinct ways you can reach the top of the staircase.\n\nNote: The problem assumes you start at the bottom of the stairs and want to reach the top.\n\nExample 1:\nInput: n = 2\nOutput: 2\nExplanation: There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps\n\nExample 2:\nInput: n = 3\nOutput: 3\nExplanation: There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step\n\nConstraints:\n- 1 <= n <= 45",
    level: "Easy",
    tags: ["Dynamic Programming", "Recursion", "Fibonacci"],
    editorial:
      "Climbing Stairs\n\nEditorial\n\n### Solution\nThis is a classic dynamic programming problem that follows the Fibonacci sequence. To reach the i-th step, one can either:\n- Take 1 step from the (i-1)-th step\n- Take 2 steps from the (i-2)-th step\n\nThe number of ways to reach the i-th step is the sum of ways to reach the (i-1)-th step and (i-2)-th step.\n\n### Implementation\n```python\ndef climbStairs(n):\n    if n == 1:\n        return 1\n    if n == 2:\n        return 2\n    a, b = 1, 2\n    for i in range(3, n + 1):\n        a, b = b, a + b\n    return b\n```\n\n### Complexity\n- Time complexity: O(n) - we iterate through the steps once\n- Space complexity: O(1) - we only use two variables regardless of input size\n\n### Follow-up\n- Can you solve this problem using recursion with memoization?\n- How would you handle this if you could climb 1, 2, or 3 steps at a time?",
    testCases: ["2", "3", "5"],
    expectedAnswer: ["2", "3", "8"],
    memoryLimit: 536870912,
    runTimeOut: 4000,
    compileTimeOut: 2000,
    codeSnippets: [
      {
        lang: "python",
        code: "def climbStairs(n: int) -> int:\n    pass",
      },
      {
        lang: "typescript",
        code: "function climbStairs(n: number): number {\n    return 0;\n}",
      },
    ],
  },
  {
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\nExample 1:\n\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n\nExample 2:\n\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n\nExample 3:\n\nInput: nums = [3,3], target = 6\nOutput: [0,1]\n\nConstraints:\n2 <= nums.length <= 104\n-109 <= nums[i] <= 109\n-109 <= target <= 109\nOnly one valid answer exists.",
    level: "Easy",
    tags: ["Array", "Hash Table", "Searching"],
    editorial:
      "Two Sum\n\nEditorial\n\n### Solution\nWe can solve this problem using two primary approaches:\n\n1. Brute Force Approach:\n- Check every pair of numbers using nested loops\n- Time complexity: O(n²)\n- Space complexity: O(1)\n\n2. Hash Table Approach:\n- Use a hash table to store complements\n- Make a single pass through the array\n- Check if the complement of current number exists in the hash table\n- Time complexity: O(n)\n- Space complexity: O(n)\n\n### Implementation (Hash Table)\n```python\ndef twoSum(nums, target):\n    num_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i\n    return []\n```\n\n### Key Insights\n- The hash table approach trades space for speed\n- Only one valid solution is guaranteed to exist\n- The solution can return indices in any order\n\n### Follow-up\n- Can you solve this problem with O(1) space complexity?\n- How would you modify the solution if multiple solutions were possible?",
    testCases: ["[2, 7, 11, 15]\n9", "[3, 2, 4]\n6", "[3, 3]\n6"],
    expectedAnswer: ["[0, 1]", "[1, 2]", "[0, 1]"],
    memoryLimit: 536870912,
    runTimeOut: 4000,
    compileTimeOut: 2000,
    codeSnippets: [
      {
        lang: "python",
        code: "def twoSum(nums: List[int], target: int) -> List[int]:\n    pass",
      },
      {
        lang: "typescript",
        code: "function twoSum(nums: number[], target: number): number[] {\n    return [];\n}",
      },
    ],
  },
  {
    title: "Merge Two Sorted Lists",
    description:
      "Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.\n\nExample 1:\n\nInput: l1 = [1, 2, 4], l2 = [1, 3, 4]\nOutput: [1, 1, 2, 3, 4, 4]\nExplanation: The merged list is 1->1->2->3->4->4.\n\nExample 2:\n\nInput: l1 = [], l2 = []\nOutput: []\n\nExample 3:\n\nInput: l1 = [], l2 = [0]\nOutput: [0]\n\nConstraints:\n\nThe number of nodes in both lists is in the range [0, 50].\n-100 <= Node.val <= 100\nBoth l1 and l2 are sorted in non-decreasing order.",
    level: "Easy",
    tags: ["Linked List", "Merge", "Two Pointers"],
    editorial:
      "Merge Two Sorted Lists\n\nEditorial\n\n### Problem Analysis\n- The goal is to merge two already sorted linked lists\n- We need to maintain the sorted order in the final list\n- The solution should create a new list without creating a deep copy of nodes\n\n### Solution Approach\nWe can solve this problem using a two-pointer technique:\n1. Create a dummy node to serve as the head of the merged list\n2. Use two pointers to track the current nodes in l1 and l2\n3. Compare values and add the smaller node to the merged list\n4. Move the pointer of the list from which the node was added\n5. After one list is exhausted, append the remaining list\n\n### Key Points\n- Dummy node helps handle edge cases (empty lists)\n- In-place merging without creating new node copies\n- Works with lists of different lengths\n- Handles cases where lists are empty\n\n### Implementation\n```python\ndef mergeTwoLists(l1, l2):\n    # Create a dummy node to simplify list building\n    dummy = ListNode()\n    current = dummy\n    \n    # Compare and merge lists\n    while l1 and l2:\n        if l1.val < l2.val:\n            current.next = l1\n            l1 = l1.next\n        else:\n            current.next = l2\n            l2 = l2.next\n        current = current.next\n    \n    # Append remaining list\n    current.next = l1 if l1 else l2\n    \n    # Return merged list (skip dummy node)\n    return dummy.next\n```\n\n### Complexity Analysis\n- Time Complexity: O(n + m)\n  - We traverse each list once\n  - n and m are lengths of input lists\n- Space Complexity: O(1)\n  - We only use a constant amount of extra space\n  - Merging is done in-place\n\n### Common Variations\n- Recursive implementation\n- Handling non-sorted lists\n- Merging more than two lists\n\n### Follow-up Questions\n- Can you solve this recursively?\n- How would you modify the solution to handle three sorted lists?",
    testCases: ["[1, 2, 4]\n[1, 3, 4]", "[]\n[]", "[]\n[0]"],
    expectedAnswer: ["[1, 1, 2, 3, 4, 4]", "[]", "[0]"],
    memoryLimit: 536870912,
    runTimeOut: 4000,
    compileTimeOut: 2000,
    codeSnippets: [
      {
        lang: "python",
        code: "def mergeTwoLists(l1: ListNode, l2: ListNode) -> ListNode:\n    pass",
      },
      {
        lang: "typescript",
        code: "function mergeTwoLists(l1: ListNode, l2: ListNode): ListNode {\n    return null;\n}",
      },
    ],
  },
  {
    title: "Pascal's Triangle",
    description:
      "Given an integer numRows, return the first numRows of Pascal's triangle.\n\nIn Pascal's triangle, each number is the sum of the two numbers directly above it.\n\nExample 1:\n\nInput: numRows = 5\nOutput: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]\n\nExample 2:\n\nInput: numRows = 1\nOutput: [[1]]\n\nConstraints:\n\n1 <= numRows <= 30",
    level: "Easy",
    tags: ["Array", "Dynamic Programming", "Math"],
    editorial:
      "Pascal's Triangle\n\nEditorial\n\n### Problem Insights\n- Pascal's triangle is a triangular array of binomial coefficients\n- Each number is the sum of the two numbers directly above it\n- First and last elements of each row are always 1\n\n### Solution Approach\n- Iteratively build the triangle row by row\n- Initialize each row with 1s\n- Calculate middle elements by summing adjacent elements from previous row\n\n### Implementation\n```python\ndef generate(numRows):\n    triangle = []\n    for i in range(numRows):\n        # Create a row with all 1s initially\n        row = [1] * (i + 1)\n        # Calculate middle elements\n        for j in range(1, i):\n            row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]\n        triangle.append(row)\n    return triangle\n```\n\n### Complexity Analysis\n- Time Complexity: O(n²)\n  - Nested loops to generate each row\n  - Each row requires calculations based on previous row\n- Space Complexity: O(n²)\n  - Storing the entire triangle of n rows\n\n### Key Observations\n- Works for any number of rows between 1 and 30\n- No additional data structures needed beyond the result list\n- Each row's length equals its row number\n\n### Mathematical Connection\n- Each number represents a binomial coefficient\n- Relates to combinations and probability calculations\n\n### Follow-up Questions\n- How would you modify this to generate a specific row?\n- Can you calculate a specific element without generating the entire triangle?",
    testCases: ["5", "1", "3"],
    expectedAnswer: [
      "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]",
      "[[1]]",
      "[[1], [1, 1], [1, 2, 1]]",
    ],
    memoryLimit: 536870912,
    runTimeOut: 4000,
    compileTimeOut: 2000,
    codeSnippets: [
      {
        lang: "python",
        code: "def generate(numRows: int) -> List[List[int]]:\n    pass",
      },
      {
        lang: "typescript",
        code: "function generate(numRows: number): number[][] {\n    return [];\n}",
      },
    ],
  },
  {
    title: "Check If Straight Line",
    description:
      "You are given an array of coordinates where coordinates[i] = [x, y]. Determine if these points form a straight line.\n\nExample 1:\n\nInput: coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]\nOutput: true\nExplanation: These points lie on the straight line y = x + 1.\n\nExample 2:\n\nInput: coordinates = [[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]]\nOutput: false\nExplanation: These points do not lie on a straight line.\n\nConstraints:\n\n2 <= coordinates.length <= 1000\n-10^4 <= coordinates[i][0], coordinates[i][1] <= 10^4",
    level: "Easy",
    tags: ["Math", "Geometry", "Array"],
    editorial:
      "Check If Straight Line\n\nEditorial\n\n### Problem Analysis\n- Determine if a set of points lie on the same straight line\n- Need to handle cases with vertical and non-vertical lines\n- Avoid division by zero when calculating slope\n\n### Solution Approach\n- Use cross-multiplication to compare slopes\n- Compare slope between first two points with remaining points\n- Eliminate division to handle special cases like vertical lines\n\n### Mathematical Insight\nInstead of calculating slope as (y2 - y1) / (x2 - x1), we use cross-multiplication:\n- Check if (y - y0) * dx == (x - x0) * dy\n- This avoids division and handles vertical line scenarios\n\n### Implementation\n```python\ndef checkStraightLine(coordinates):\n    # Take first two points to establish reference line\n    (x0, y0), (x1, y1) = coordinates[:2]\n    \n    # Calculate differences for cross-multiplication\n    dx, dy = x1 - x0, y1 - y0\n    \n    # Check slope with all subsequent points\n    for x, y in coordinates[2:]:\n        # Cross-multiplication to compare slopes\n        if (y - y0) * dx != (x - x0) * dy:\n            return False\n    \n    return True\n```\n\n### Complexity Analysis\n- Time Complexity: O(n)\n  - Single pass through all coordinates\n  - Constant time operations for each point\n- Space Complexity: O(1)\n  - Only uses a few variables regardless of input size\n\n### Edge Cases Handled\n- Works with vertical lines\n- Handles lines with different orientations\n- Manages points with integer coordinates\n\n### Follow-up Questions\n- How would you modify this to find the equation of the line?\n- Can you extend this to check collinearity of 3D points?",
    testCases: [
      "[[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]",
      "[[1, 1], [2, 2], [3, 4], [4, 5], [5, 6], [7, 7]]",
    ],
    expectedAnswer: ["True", "False"],
    memoryLimit: 536870912,
    runTimeOut: 4000,
    compileTimeOut: 2000,
    codeSnippets: [
      {
        lang: "python",
        code: "def checkStraightLine(coordinates: List[List[int]]) -> bool:\n    pass",
      },
      {
        lang: "typescript",
        code: "function checkStraightLine(coordinates: number[][]): boolean {\n    return false;\n}",
      },
    ],
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description:
      'Given a string s, find the length of the longest substring without repeating characters.\n\nExample 1:\n\nInput: s = "abcabcbb"\nOutput: 3\nExplanation: The answer is "abc", with the length of 3.\n\nExample 2:\n\nInput: s = "bbbbb"\nOutput: 1\nExplanation: The answer is "b", with the length of 1.\n\nExample 3:\n\nInput: s = "pwwkew"\nOutput: 3\nExplanation: The answer is "wke", with the length of 3.\nNote that the answer must be a substring, "pwke" is a subsequence and not a substring.\n\nConstraints:\n\n0 <= s.length <= 5 * 104\ns consists of English letters, digits, symbols, and spaces.',
    level: "Medium",
    tags: ["Sliding Window", "Hash Map"],
    editorial:
      "Longest Substring Without Repeating Characters\n\n### Solution\nThis problem can be efficiently solved using the sliding window technique. We use two pointers to maintain a window of non-repeating characters:\n\n- The right pointer expands the window by moving through the string.\n- The left pointer shrinks the window when a duplicate character is encountered.\n- A hash set is used to track the unique characters in the current window.\n\n### Key Algorithm Steps\n1. Initialize an empty set to track current characters\n2. Use two pointers: left and right\n3. Expand the window by moving the right pointer\n4. If a duplicate is found, remove characters from the left until the duplicate is eliminated\n5. Update the maximum substring length at each step\n\n### Complexity Analysis\n- **Time Complexity**: O(n), where n is the string length\n  - Each character is visited at most twice (once by right pointer, once by left pointer)\n- **Space Complexity**: O(min(n, m))\n  - Where n is the string length and m is the size of the character set\n  - In the worst case, the set will store unique characters\n  - For string with ASCII characters, space is bounded by 128 or 256",
    testCases: ["abcabcbb", "bbbbb", "pwwkew"],
    expectedAnswer: ["3", "1", "3"],
    memoryLimit: 536870912,
    runTimeOut: 4000,
    compileTimeOut: 2000,
    codeSnippets: [
      {
        lang: "python",
        code: "def lengthOfLongestSubstring(s: str) -> int:\n    pass",
      },
      {
        lang: "typescript",
        code: "function lengthOfLongestSubstring(s: string): number {\n    return 0;\n}",
      },
    ],
  },
  {
    title: "Zigzag Conversion",
    description:
      'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this:\n\nP   A   H   N\nA P L S I I G\nY   I   R\n\nAnd then read line by line: "PAHNAPLSIIGYIR"\n\nWrite the code that will take a string and make this conversion given a number of rows.\n\nExample 1:\n\nInput: s = "PAYPALISHIRING", numRows = 3\nOutput: "PAHNAPLSIIGYIR"\n\nExample 2:\n\nInput: s = "PAYPALISHIRING", numRows = 4\nOutput: "PINALSIGYAHRPI"\n\nExample 3:\n\nInput: s = "A", numRows = 1\nOutput: "A"\n\nConstraints:\n\n1 <= s.length <= 1000\n1 <= numRows <= 1000',
    level: "Medium",
    tags: ["String", "Zigzag"],
    editorial:
      "Zigzag Conversion\n\n### Solution\nThis problem requires simulating a zigzag traversal of the input string across multiple rows. The key steps are:\n\n1. Handle edge cases:\n   - If numRows is 1 or greater than string length, return the original string\n2. Create a list of empty strings to represent rows\n3. Traverse the string with a zigzag pattern:\n   - Use a current row tracker and a step variable to move between rows\n   - Change direction when reaching top or bottom rows\n4. Concatenate characters to their respective rows\n5. Join rows to produce the final converted string\n\n### Key Observations\n- The zigzag pattern follows a 'V' shaped movement\n- Direction changes occur at the first and last rows\n- Step variable helps in changing traversal direction\n\n### Complexity Analysis\n- **Time Complexity**: O(n)\n  - Single pass through the input string\n  - Each character processed once\n- **Space Complexity**: O(n)\n  - Additional space used to store rows\n  - Space proportional to input string length\n\nWhere n is the length of the input string.",
    testCases: ["PAYPALISHIRING\n3", "PAYPALISHIRING\n4", "A\n1"],
    expectedAnswer: ["PAHNAPLSIIGYIR", "PINALSIGYAHRPI", "A"],
    memoryLimit: 536870912,
    runTimeOut: 4000,
    compileTimeOut: 2000,
    codeSnippets: [
      {
        lang: "python",
        code: "def convert(s: str, numRows: int) -> str:\n    pass",
      },
      {
        lang: "typescript",
        code: 'function convert(s: string, numRows: number): string {\n    return "";\n}',
      },
    ],
  },
  {
    title: "Container With Most Water",
    description:
      "Given an integer array height representing the heights of vertical lines, find two lines that, together with the x-axis, form a container that can hold the maximum amount of water.\n\nA container's water capacity is calculated by the width between the two lines multiplied by the height of the shorter line.\n\nKey Points:\n- You are trying to maximize the area between two lines\n- The area is calculated by: min(height[i], height[j]) * |i - j|\n- You must choose two different lines to form the container\n\nExample 1:\n- Input: height = [1,8,6,2,5,4,8,3,7]\n- Output: 49\n- Explanation: The container formed by lines at indices 1 and 8 (heights 8 and 7) has the maximum area of 49\n\nExample 2:\n- Input: height = [1,1]\n- Output: 1\n- Explanation: The container uses both lines of height 1\n\nExample 3:\n- Input: height = [4,3,2,1,4]\n- Output: 16\n- Explanation: The container uses the first and last lines of height 4\n\nConstraints:\n- 2 <= height.length <= 10^5\n- 0 <= height[i] <= 10^4",
    level: "Medium",
    tags: ["Array", "Two Pointers"],
    editorial:
      "### Problem Solving Approach\n\n#### Two-Pointer Technique\nThis problem is optimally solved using the two-pointer technique, which allows us to find the maximum water container in a single pass through the array.\n\n#### Algorithm Steps\n1. Initialize two pointers: left at the start and right at the end of the array\n2. Calculate the initial area between these pointers\n3. Compare the heights at the left and right pointers\n4. Move the pointer with the shorter height inward\n5. Keep track of the maximum area found\n6. Repeat until the pointers meet\n\n#### Intuition\n- The width of the container starts at its maximum\n- Moving the pointer with the shorter height gives a chance to find a taller line that might increase the area\n- By systematically exploring, we guarantee finding the maximum possible water container\n\n#### Complexity Analysis\n- Time Complexity: O(n)\n  - We traverse the array only once\n- Space Complexity: O(1)\n  - We use only two pointers and a variable to track max area\n\n### Implementation Insights\n- The key is to understand that to maximize area, we need to consider both width and height\n- Always move the pointer with the shorter line, as it limits the container's capacity",
    testCases: ["[1, 8, 6, 2, 5, 4, 8, 3, 7]", "[1, 1]", "[4, 3, 2, 1, 4]"],
    expectedAnswer: ["49", "1", "16"],
    memoryLimit: 536870912,
    runTimeOut: 4000,
    compileTimeOut: 2000,
    codeSnippets: [
      {
        lang: "python",
        code: "def maxArea(height: List[int]) -> int:\n    pass",
      },
      {
        lang: "typescript",
        code: "function maxArea(height: number[]): number {\n    return 0;\n}",
      },
    ],
  },
  {
    title: "Swap Nodes in Pairs",
    description:
      "Given a singly linked list, perform an in-place swap of every two adjacent nodes and return the modified list's head.\n\nProblem Requirements:\n- Swap adjacent nodes by changing node links, not node values\n- Maintain the original node values\n- Handle edge cases like empty lists or lists with odd/even number of nodes\n\nExample 1:\n- Input: head = [1, 2, 3, 4]\n- Output: [2, 1, 4, 3]\n- Explanation: \n  1. First pair [1, 2] is swapped\n  2. Second pair [3, 4] is swapped\n\nExample 2:\n- Input: head = []\n- Output: []\n- Explanation: Empty list remains unchanged\n\nExample 3:\n- Input: head = [1]\n- Output: [1]\n- Explanation: Single node list remains unchanged\n\nConstraints:\n- Number of nodes in the list: 0 ≤ n ≤ 100\n- Node value range: 0 ≤ Node.val ≤ 100",
    level: "Medium",
    tags: ["Linked List", "Swap"],
    editorial:
      "### Problem Solving Strategy\n\n#### Key Approach: Pointer Manipulation\nThis problem requires careful manipulation of node pointers to swap adjacent nodes without modifying node values.\n\n#### Algorithm Breakdown\n1. Use a dummy node to simplify head management\n2. Maintain multiple pointers to track node connections\n3. Perform in-place swapping by redirecting node links\n4. Iterate through the list in pairs\n\n#### Implementation Details\n- Create a dummy node pointing to the head\n- Use three primary pointers:\n  - current: Tracks the node before the pair to be swapped\n  - first: First node in the current pair\n  - second: Second node in the current pair\n- Swap nodes by adjusting their next pointers\n- Move pointers after each swap\n\n#### Pointer Redirection Steps\n1. Save first.next to maintain list continuity\n2. Point current.next to second\n3. Point second.next to first\n4. Update current to prepare for next iteration\n\n#### Complexity Analysis\n- Time Complexity: O(n)\n  - Single pass through the linked list\n  - Each node visited once\n- Space Complexity: O(1)\n  - In-place modification\n  - Only a constant number of pointers used\n\n#### Edge Case Handling\n- Empty list: Return null/empty list\n- Single node list: Return list unchanged\n- Odd-length list: Last node remains unswapped",
    testCases: ["[1, 2, 3, 4]", "[]", "[1]"],
    expectedAnswer: ["[2, 1, 4, 3]", "[]", "[1]"],
    memoryLimit: 536870912,
    runTimeOut: 4000,
    compileTimeOut: 2000,
    codeSnippets: [
      {
        lang: "python",
        code: "def swapPairs(head: ListNode) -> ListNode:\n    pass",
      },
      {
        lang: "typescript",
        code: "function swapPairs(head: ListNode): ListNode {\n    return null;\n}",
      },
    ],
  },
  {
    title: "Valid Sudoku",
    description:
      'Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:\n\n1. Each row must contain the digits 1-9 without repetition.\n2. Each column must contain the digits 1-9 without repetition.\n3. Each of the 9 3x3 subgrids must contain the digits 1-9 without repetition.\n\nNote:\n\nA Sudoku board partially filled could be valid but is not necessarily solvable.\n\nExample 1:\n\nInput: board = [["5","3",".",".","7",".",".",".","."]["6",".",".","1","9","5",".",".","."][".","9","8",".",".",".",".","6","."]["8",".",".",".","6",".",".",".","3"]...]\nOutput: true\n\nExample 2:\n\nInput: board = [["8","3",".",".","7",".",".",".","."]["6",".",".","1","9","5",".",".","."][".","9","8",".",".",".",".","6","."]["8",".",".",".","6",".",".",".","3"]...]\nOutput: false\n\nConstraints:\n\nboard.length == 9\nboard[i].length == 9\nboard[i][j] is a character from [\'1\', \'9\', \'.\', \'.\']',
    level: "Medium",
    tags: ["Array", "Hash Set"],
    editorial:
      "Valid Sudoku\n\nEditorial\n\n### Solution\nTo check if a Sudoku board is valid, we need to ensure that each row, each column, and each of the 9 subgrids do not contain any duplicate numbers. We can use hash sets to track the seen digits in each row, column, and subgrid. As we iterate over the board, we check the value at each position. If the value is already seen in its corresponding row, column, or subgrid, the board is invalid.\n\n### Implementation\n```python\ndef isValidSudoku(board):\n    def is_valid(cells):\n        cells = [c for c in cells if c != '.']\n        return len(cells) == len(set(cells))\n    for row in board:\n        if not is_valid(row):\n            return False\n    for col in zip(*board):\n        if not is_valid(col):\n            return False\n    for i in range(0, 9, 3):\n        for j in range(0, 9, 3):\n            block = [board[x][y] for x in range(i, i + 3) for y in range(j, j + 3)]\n            if not is_valid(block):\n                return False\n    return True\n```\n\n### Complexity\nTime complexity: O(n^2)\nSpace complexity: O(n)\n\nWhere n is the size of the board (9x9).",
    testCases: [
      '[["5","3",".",".","7",".",".",".","."]["6",".",".","1","9","5",".",".","."][".","9","8",".",".",".",".","6","."]["8",".",".",".","6",".",".",".","3"]]',
      '[["8","3",".",".","7",".",".",".","."]["6",".",".","1","9","5",".",".","."][".","9","8",".",".",".",".","6","."]["8",".",".",".","6",".",".",".","3"]]',
    ],
    expectedAnswer: ["True", "False"],
    memoryLimit: 536870912,
    runTimeOut: 4000,
    compileTimeOut: 2000,
    codeSnippets: [
      {
        lang: "python",
        code: "def isValidSudoku(board: List[List[str]]) -> bool:\n    pass",
      },
      {
        lang: "typescript",
        code: "function isValidSudoku(board: string[][]): boolean {\n    return true;\n}",
      },
    ],
  },
  {
    title: "Median of Two Sorted Arrays",
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall runtime complexity should be O(log(min(m, n))).\n\nExample 1:\n\nInput:\nnums1 = [1, 3], nums2 = [2]\nOutput:\n2.00000\nExplanation:\nThe merged array is [1, 2, 3], and the median is 2.\n\nExample 2:\n\nInput:\nnums1 = [1, 2], nums2 = [3, 4]\nOutput:\n2.50000\nExplanation:\nThe merged array is [1, 2, 3, 4], and the median is (2 + 3) / 2 = 2.5.\n\nExample 3:\n\nInput:\nnums1 = [0, 0], nums2 = [0, 0]\nOutput:\n0.00000\nExplanation:\nThe merged array is [0, 0, 0, 0], and the median is 0.\n\nExample 4:\n\nInput:\nnums1 = [], nums2 = [1]\nOutput:\n1.00000\n\nExample 5:\n\nInput:\nnums1 = [2], nums2 = []\nOutput:\n2.00000\n\nConstraints:\n\nnums1.length == m\nnums2.length == n\n0 <= m <= 1000\n0 <= n <= 1000\n1 <= m + n <= 2000\n-10^6 <= nums1[i], nums2[i] <= 10^6",
    level: "Hard",
    tags: ["Array", "Binary Search"],
    editorial:
      "### Naive Solution\nThe straightforward approach is to merge both arrays into a single sorted array and compute the median. This solution, however, has a time complexity of O(m + n), which does not meet the requirement for optimized performance.\n\n### Optimized Solution (Binary Search)\nTo achieve the required time complexity of O(log(min(m, n))), we can use a binary search-based approach. The goal is to partition the two arrays such that the left half contains the smaller elements and the right half contains the larger elements. The median is then determined based on the maximum of the left half and the minimum of the right half.\n\n#### Steps:\n1. Assume nums1 is the smaller array. If not, swap nums1 and nums2.\n2. Perform binary search on nums1. Partition nums1 and nums2 at indices such that the left partitions contain the smaller elements.\n3. Check the following conditions for a valid partition:\n   - The largest element in the left partition of nums1 (if it exists) is less than or equal to the smallest element in the right partition of nums2.\n   - Similarly, the largest element in the left partition of nums2 is less than or equal to the smallest element in the right partition of nums1.\n4. If the partition is valid, calculate the median:\n   - If the combined size of the arrays is odd, the median is the maximum element of the left partition.\n   - If even, the median is the average of the maximum of the left partition and the minimum of the right partition.\n5. If the partition is invalid, adjust the binary search range.\n\n### Implementation\n```python\ndef findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:\n    if len(nums1) > len(nums2):\n        nums1, nums2 = nums2, nums1\n\n    x, y = len(nums1), len(nums2)\n    low, high = 0, x\n\n    while low <= high:\n        partitionX = (low + high) // 2\n        partitionY = (x + y + 1) // 2 - partitionX\n\n        maxX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]\n        minX = float('inf') if partitionX == x else nums1[partitionX]\n\n        maxY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]\n        minY = float('inf') if partitionY == y else nums2[partitionY]\n\n        if maxX <= minY and maxY <= minX:\n            if (x + y) % 2 == 0:\n                return (max(maxX, maxY) + min(minX, minY)) / 2\n            else:\n                return max(maxX, maxY)\n        elif maxX > minY:\n            high = partitionX - 1\n        else:\n            low = partitionX + 1\n\n    raise ValueError(\"Input arrays are not sorted\")\n```\n\n### Complexity\n- Time Complexity: O(log(min(m, n))) due to binary search.\n- Space Complexity: O(1) as no additional space is used.",
    testCases: [
      "[1, 3]\\n[2]",
      "[1, 2]\\n[3, 4]",
      "[0, 0]\\n[0, 0]",
      "[]\\n[1]",
      "[2]\\n[]",
    ],
    expectedAnswer: ["2.00000", "2.50000", "0.00000", "1.00000", "2.00000"],
    memoryLimit: 536870912,
    runTimeOut: 4000,
    compileTimeOut: 2000,
    codeSnippets: [
      {
        lang: "python",
        code: "def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:\n    if len(nums1) > len(nums2):\n        nums1, nums2 = nums2, nums1\n\n    x, y = len(nums1), len(nums2)\n    low, high = 0, x\n\n    while low <= high:\n        partitionX = (low + high) // 2\n        partitionY = (x + y + 1) // 2 - partitionX\n\n        maxX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]\n        minX = float('inf') if partitionX == x else nums1[partitionX]\n\n        maxY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]\n        minY = float('inf') if partitionY == y else nums2[partitionY]\n\n        if maxX <= minY and maxY <= minX:\n            if (x + y) % 2 == 0:\n                return (max(maxX, maxY) + min(minX, minY)) / 2\n            else:\n                return max(maxX, maxY)\n        elif maxX > minY:\n            high = partitionX - 1\n        else:\n            low = partitionX + 1\n\n    raise ValueError(\"Input arrays are not sorted\")",
      },
      {
        lang: "typescript",
        code: 'function findMedianSortedArrays(nums1: number[], nums2: number[]): number {\n    if (nums1.length > nums2.length) {\n        [nums1, nums2] = [nums2, nums1];\n    }\n\n    const x = nums1.length, y = nums2.length;\n    let low = 0, high = x;\n\n    while (low <= high) {\n        const partitionX = Math.floor((low + high) / 2);\n        const partitionY = Math.floor((x + y + 1) / 2) - partitionX;\n\n        const maxX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];\n        const minX = partitionX === x ? Infinity : nums1[partitionX];\n\n        const maxY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];\n        const minY = partitionY === y ? Infinity : nums2[partitionY];\n\n        if (maxX <= minY && maxY <= minX) {\n            if ((x + y) % 2 === 0) {\n                return (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;\n            } else {\n                return Math.max(maxX, maxY);\n            }\n        } else if (maxX > minY) {\n            high = partitionX - 1;\n        } else {\n            low = partitionX + 1;\n        }\n    }\n\n    throw new Error("Input arrays are not sorted");\n}',
      },
    ],
  },
  {
    title: "Regular Expression Matching",
    description:
      'Given an input string s and a pattern p, implement regular expression matching with support for \'.\' and \'*\'.\n\n\'.\' Matches any single character.\n\'*\' Matches zero or more of the preceding element.\n\nThe matching should cover the entire input string (not partial).\n\nExample 1:\n\nInput: s = "aa", p = "a*"\nOutput: true\nExplanation: "a*" means zero or more occurrences of \'a\', so it matches the entire string.\n\nExample 2:\n\nInput: s = "mississippi", p = "mis*is*p*."\nOutput: false\n\nExample 3:\n\nInput: s = "ab", p = ".*"\nOutput: true\n\nConstraints:\n\n1 <= s.length <= 20\n1 <= p.length <= 20\nThe characters in s and p are only lowercase English letters.',
    level: "Hard",
    tags: ["String", "Dynamic Programming"],
    editorial:
      "### Dynamic Programming Solution\nTo solve this problem efficiently, we can use dynamic programming. We create a 2D table `dp`, where `dp[i][j]` represents whether the first `i` characters of `s` match the first `j` characters of `p`. We populate the table based on the rules of regular expressions, focusing on handling the `.` and `*` characters.\n\n#### Key Observations:\n1. If the current characters in `s` and `p` match (or if `p[j-1]` is `.`), the value of `dp[i][j]` depends on `dp[i-1][j-1]`.\n2. If `p[j-1]` is `*`, it can:\n   - Represent zero occurrences of the preceding element, depending on `dp[i][j-2]`.\n   - Represent one or more occurrences of the preceding element if `s[i-1]` matches `p[j-2]` (or `p[j-2]` is `.`).\n\n#### Steps:\n1. Initialize `dp[0][0]` as `True` because an empty string matches an empty pattern.\n2. Handle patterns like `a*` or `.*` that can match an empty string.\n3. Iterate over `s` and `p`, updating the `dp` table based on the above rules.\n4. Return `dp[-1][-1]` as the result.\n\n#### Python Implementation:\n```python\ndef isMatch(s: str, p: str) -> bool:\n    dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]\n    dp[0][0] = True\n\n    # Handle patterns like a*, a*b*, etc.\n    for j in range(1, len(p) + 1):\n        if p[j - 1] == '*':\n            dp[0][j] = dp[0][j - 2]\n\n    for i in range(1, len(s) + 1):\n        for j in range(1, len(p) + 1):\n            if p[j - 1] == '.' or p[j - 1] == s[i - 1]:\n                dp[i][j] = dp[i - 1][j - 1]\n            elif p[j - 1] == '*':\n                dp[i][j] = dp[i][j - 2] or (dp[i - 1][j] if p[j - 2] == s[i - 1] or p[j - 2] == '.' else False)\n\n    return dp[-1][-1]\n```\n\n#### Complexity\n- **Time Complexity**: O(m * n), where `m` is the length of `s` and `n` is the length of `p`.\n- **Space Complexity**: O(m * n), for the `dp` table.",
    testCases: [
      "aa\na*",
      "mississippi\nmis*is*p*.",
      "ab\n.*",
      "aab\nc*a*b",
      "mississippi\nmis*is*p*.",
    ],
    expectedAnswer: ["True", "False", "True", "True", "False"],
    memoryLimit: 536870912,
    runTimeOut: 4000,
    compileTimeOut: 2000,
    codeSnippets: [
      {
        lang: "python",
        code: "def isMatch(s: str, p: str) -> bool:\n    pass",
      },
      {
        lang: "typescript",
        code: "function isMatch(s: string, p: string): boolean {\n    return true;\n}",
      },
    ],
  },
  {
    title: "Wildcard Matching",
    description:
      'Given a string s and a pattern p, implement wildcard matching with support for \'?\' and \'*\'.\n\n\'?\' Matches any single character.\n\'*\' Matches any sequence of characters (including the empty sequence).\n\nThe matching should cover the entire input string (not partial).\n\nExample 1:\n\nInput: s = "aa", p = "a*"\nOutput: true\nExplanation: "a*" means zero or more occurrences of \'a\', so it matches the entire string.\n\nExample 2:\n\nInput: s = "mississippi", p = "mis*is*p*."\nOutput: false\n\nExample 3:\n\nInput: s = "ab", p = ".*"\nOutput: true\n\nConstraints:\n\n1 <= s.length <= 20\n1 <= p.length <= 20\nThe characters in s and p are only lowercase English letters.',
    level: "Hard",
    tags: ["String", "Dynamic Programming"],
    editorial:
      "### Dynamic Programming Solution\nThis problem can be solved using dynamic programming. We use a 2D table `dp`, where `dp[i][j]` represents whether the first `i` characters of `s` match the first `j` characters of `p`. The solution handles the `?` and `*` characters in the pattern. `?` matches exactly one character, and `*` matches zero or more characters.\n\n#### Key Observations:\n1. If `p[j-1]` is `*`, it can:\n   - Represent zero characters, depending on `dp[i][j-1]`.\n   - Represent one or more characters, depending on `dp[i-1][j]`.\n2. If `p[j-1]` is `?` or matches `s[i-1]`, the value of `dp[i][j]` depends on `dp[i-1][j-1]`.\n\n#### Steps:\n1. Initialize `dp[0][0]` as `True` because an empty string matches an empty pattern.\n2. Handle patterns like `*` that can match an empty string.\n3. Iterate over `s` and `p`, updating the `dp` table based on the above rules.\n4. Return `dp[s_len][p_len]` as the result.\n\n### Implementation\n#### Python Implementation:\n```python\ndef isMatch(s: str, p: str) -> bool:\n    s_len, p_len = len(s), len(p)\n    dp = [[False] * (p_len + 1) for _ in range(s_len + 1)]\n    dp[0][0] = True\n\n    for j in range(1, p_len + 1):\n        if p[j - 1] == '*':\n            dp[0][j] = dp[0][j - 1]\n\n    for i in range(1, s_len + 1):\n        for j in range(1, p_len + 1):\n            if p[j - 1] == '*':\n                dp[i][j] = dp[i - 1][j] or dp[i][j - 1]\n            elif p[j - 1] == '?' or s[i - 1] == p[j - 1]:\n                dp[i][j] = dp[i - 1][j - 1]\n\n    return dp[s_len][p_len]\n```\n\n### Complexity\n- **Time Complexity**: O(m * n), where `m` is the length of `s` and `n` is the length of `p`.\n- **Space Complexity**: O(m * n), for the `dp` table.",
    testCases: ["aa\na*", "aa\n*", "ab\n?a", "adceb\n*a*b", "acdcb\na*c?b"],
    expectedAnswer: ["True", "True", "False", "True", "False"],
    memoryLimit: 536870912,
    runTimeOut: 4000,
    compileTimeOut: 2000,
    codeSnippets: [
      {
        lang: "python",
        code: "def isMatch(s: str, p: str) -> bool:\n    pass",
      },
      {
        lang: "typescript",
        code: "function isMatch(s: string, p: string): boolean {\n    return true;\n}",
      },
    ],
  },
  {
    title: "Permutation Sequence",
    description:
      'The set [1, 2, 3, ..., n] contains a total of n! unique permutations.\n\nBy listing and labeling all of the permutations in order, we get the following sequence (for n = 3):\n\n1. 1, 2, 3\n2. 1, 3, 2\n3. 2, 1, 3\n4. 2, 3, 1\n5. 3, 1, 2\n6. 3, 2, 1\nGiven n and k, return the k-th permutation sequence.\n\nExample 1:\n\nInput: n = 3, k = 3\nOutput: "213"\nExplanation: The third permutation is "213".\n\nExample 2:\n\nInput: n = 4, k = 9\nOutput: "2314"\nExplanation: The ninth permutation is "2314".\n\nExample 3:\n\nInput: n = 3, k = 1\nOutput: "123"\nExplanation: The first permutation is "123".\n\nConstraints:\n\n1 <= n <= 9\n1 <= k <= n!',
    level: "Medium",
    tags: ["Math", "Backtracking"],
    editorial:
      "### Optimized Solution\nThe problem can be solved efficiently using a factorial-based approach, leveraging the fact that the permutations can be divided into blocks of size `(n-1)!`.\n\n#### Key Observations:\n1. Calculate the index of the current digit as `k // (n-1)!` and update `k = k % (n-1)!`.\n2. Use this index to determine which number to pick from the list of remaining numbers.\n3. Repeat until all numbers are chosen.\n\n#### Steps:\n1. Generate a list of numbers `[1, 2, ..., n]`.\n2. Compute factorial values iteratively to determine block sizes.\n3. Select digits based on index calculations, reducing the problem size until completion.\n\n### Implementation\n#### Python Implementation:\n```python\nimport math\n\ndef getPermutation(n, k):\n    nums = list(range(1, n + 1))\n    k -= 1\n    result = []\n    for i in range(n, 0, -1):\n        j = k // math.factorial(i - 1)\n        k %= math.factorial(i - 1)\n        result.append(nums.pop(j))\n    return ''.join(map(str, result))\n```\n\n### Complexity\n- **Time Complexity**: O(n^2), due to repeated list operations for `pop`.\n- **Space Complexity**: O(n), for storing the list of numbers.\n\nWhere `n` is the size of the sequence.",
    testCases: ["3\n3", "4\n9", "3\n1"],
    expectedAnswer: ["213", "2314", "123"],
    memoryLimit: 536870912,
    runTimeOut: 4000,
    compileTimeOut: 2000,
    codeSnippets: [
      {
        lang: "python",
        code: "def getPermutation(n: int, k: int) -> str:\n    pass",
      },
      {
        lang: "typescript",
        code: 'function getPermutation(n: number, k: number): string {\n    return "";\n}',
      },
    ],
  },
  {
    title: "Count Digit One",
    description:
      "Given an integer n, count how many times digit 1 appears in all non-negative integers less than or equal to n.\n\nExample 1:\n\nInput: n = 13\nOutput: 6\nExplanation: The digit 1 appears 6 times in the numbers [1, 10, 11, 12, 13].\n\nExample 2:\n\nInput: n = 0\nOutput: 0\n\nExample 3:\n\nInput: n = 123\nOutput: 57\nExplanation: The digit 1 appears 57 times in the numbers [1, 10, 11, 12, ..., 123].\n\nConstraints:\n\n0 <= n <= 2 * 10^9",
    level: "Hard",
    tags: ["Math"],
    editorial:
      "### Optimized Solution\nTo efficiently count the digit '1', we can calculate its occurrences at each positional place (units, tens, hundreds, etc.). The key is to consider three parts:\n1. **Lower Numbers**: Numbers less than the current positional place.\n2. **Current Digit**: The digit at the current positional place.\n3. **Higher Numbers**: Numbers greater than the current positional place.\n\n#### Key Observations:\n- If the current digit is `0`, the count is determined by the higher numbers.\n- If the current digit is `1`, it contributes occurrences from the higher numbers plus lower numbers and itself.\n- If the current digit is greater than `1`, it contributes occurrences based on the higher numbers incremented by one positional place.\n\n#### Steps:\n1. Start with `factor = 1` to track positional places.\n2. Calculate contributions from lower numbers, current digit, and higher numbers iteratively.\n3. Sum up contributions for all places and return the total count.\n\n### Implementation\n#### Python Implementation:\n```python\ndef countDigitOne(n):\n    count = 0\n    factor = 1\n    while factor <= n:\n        lower_numbers = n - (n // factor) * factor\n        current_digit = (n // factor) % 10\n        higher_numbers = n // (factor * 10)\n\n        if current_digit == 0:\n            count += higher_numbers * factor\n        elif current_digit == 1:\n            count += higher_numbers * factor + lower_numbers + 1\n        else:\n            count += (higher_numbers + 1) * factor\n\n        factor *= 10\n\n    return count\n```\n\n### Complexity\n- **Time Complexity**: O(log n), as we process each digit in `n`.\n- **Space Complexity**: O(1), as no additional space is used.\n\nWhere `n` is the input number.",
    testCases: ["13", "0", "123"],
    expectedAnswer: ["6", "0", "57"],
    memoryLimit: 536870912,
    runTimeOut: 4000,
    compileTimeOut: 2000,
    codeSnippets: [
      {
        lang: "python",
        code: "def countDigitOne(n: int) -> int:\n    pass",
      },
      {
        lang: "typescript",
        code: "function countDigitOne(n: number): number {\n    return 0;\n}",
      },
    ],
  },
];

module.exports = { problems };
