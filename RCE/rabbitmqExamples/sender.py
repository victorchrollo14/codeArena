import pika
import sys
import json
from testData import questions

num = sys.argv[1]

print(type(num), int(num))
if int(num) < 1 or int(num) > 15:
    raise Exception("Invalid input parameter, questions are from 1 to 15")
    exit(-1)


connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()

channel.queue_declare(queue="arena_rce_queue", durable=True)
channel.basic_publish(
    exchange="",
    routing_key="arena_rce_queue",
    body=json.dumps(questions.get(num)),
    properties=pika.BasicProperties(
        delivery_mode=pika.DeliveryMode.Persistent
    ),
)
print("backend server has sent the message")
connection.close()
