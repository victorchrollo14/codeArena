import sys
import os
import pika
import json


def main():
    def on_message(ch, method, properties, body):
        try:
            data = json.loads(body)
            print("recieved: ")
            print(data)
        except Exception as e:
            print(e)
            print("some error occured")

    connection = pika.BlockingConnection(
        pika.ConnectionParameters("localhost")
    )
    channel = connection.channel()
    channel.queue_declare(queue="test_queue")

    channel.basic_consume(
        queue="test_queue",
        auto_ack=True,
        on_message_callback=on_message,
    )

    print(" [*] Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Interrupted")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
