import pika
import sys
import json

message = sys.argv[1]
print(f"sending message = {message}")

code = "def twoSum(nums, target):\n        for i in range(len(nums)):\n            for j in range(i + 1, len(nums)):\n                if nums[j] == target - nums[i]:\n                    return [i, j]\n        # Return an empty list if no solution is found\n        return []"

new_message = {
    "id": "user_1234",
    "language": "python",
    "code": str(code),
    "testcases": [
        {
            "arg": {"nums": [2, 7, 11, 15], "target": 9},
            "expectedOutput": [0, 1],
        },
        {
            "arg": {"nums": [3, 2, 4], "target": 6},
            "expectedOutput": [1, 2],
        },
        {
            "arg": {"nums": [3, 3], "target": 6},
            "expectedOutput": [0, 1],
        },
    ],
    "compileTimeout": 5000,
    "runTimeout": 5000,
    "memoryLimit": 256 * 1024,
}

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()

channel.queue_declare(queue="arena_rce_queue", durable=True)
channel.basic_publish(
    exchange="",
    routing_key="arena_rce_queue",
    body=json.dumps(new_message),
    properties=pika.BasicProperties(
        delivery_mode=pika.DeliveryMode.Persistent
    ),
)
print("backend server has sent the message")
connection.close()
