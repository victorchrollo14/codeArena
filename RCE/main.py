import pika
import os
import sys
import json
from pprint import pprint

import subprocess
from execution import Execution


def main():
    def on_message(ch, method, properties, body):
        try:
            data = json.loads(body)
            submission_id = data["submissionId"]
            language = data["language"]
            code = data["code"]
            testcases = data["testcases"]
            compile_timeout = data["compileTimeout"]
            memory_limit = data["memoryLimit"]
            run_timeout = data["runTimeout"]

            codeinstance = Execution(
                submission_id,
                language,
                code,
                testcases,
                compile_timeout,
                run_timeout,
                memory_limit,
            )

            codeinstance.createCode()
            output = codeinstance.run()
            pprint(output)

            os.system("rm -rf ./temp_code/*")
            ch.basic_ack(delivery_tag=method.delivery_tag)
        except Exception as e:
            print("some error occured", e)

    connection = pika.BlockingConnection(pika.ConnectionParameters("rabbitmq"))
    channel = connection.channel()

    channel.queue_declare(queue="arena_rce_queue", durable=True)

    channel.basic_consume(
        queue="arena_rce_queue", on_message_callback=on_message, auto_ack=False
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
# todos
# 1. function to constuct the code to be run, using the code in message
# + some boiler plate based on the language provided
# run that code based on languages and get the output and send to a
# rabbitmq queue or some redis cache
