test1 = {
    "submissionid": "runcode_rahluyou723hl_hslhsl",
    "language": "python",
    "code": "def twosum(nums, target):\n        for i in range(len(nums)):\n            for j in range(i + 1, len(nums)):\n                if nums[j] == target - nums[i]:\n                    return [i, j]\n        # return an empty list if no solution is found\n        return []",
    "testcases": ["[2, 7, 11, 15]\n9", "[3, 2, 4]\n6", "[3, 3]\n6"],
    "expected_output": "[0, 1]\n[1, 2]\n[0, 1]",
    "compiletimeout": 2000,
    "runtimeout": 4000,
    "memorylimit": 536870912,
    "codesnippet": "def twosum(self, nums: list[int], target: int) -> list[int]:\n        ",
}
