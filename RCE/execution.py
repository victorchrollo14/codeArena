import ast
import textwrap
import docker
import subprocess

code_output_format = {
    "submission_id": "some_job_id",
    "code_answer": ["[1,2]", "undefined", "[0,1"],
    "code_output": ["hello\nhello\n", "hello\nhello", "hello\nhello"],
    "language": "python3",
    "expected_answer": ["[1,2]", "[0,1]", "[1,2]"],
    "total_testcases": 3,
    "total_correct": 3,
}


class Execution:
    def __init__(
        self,
        submission_id,
        language,
        code,
        testcases,
        compile_timeout,
        run_timeout,
        memory_limit,
    ):
        self.submission_id = submission_id
        self.language = language
        self.code = code
        self.testcases = testcases
        self.compile_timeout = compile_timeout
        self.run_timeout = run_timeout
        self.memory_limit = memory_limit
        self.fileMount = "/mnt/harddrive/100xdevs/codeArena/RCE/temp_code/"
        self.output = {
            "submission_id": submission_id,
            "language": language,
            "expected_answer": [
                str(testcase["expectedOutput"]) for testcase in testcases
            ],
            "total_testcases": len(testcases),
            "total_correct": 0,
            "runtime_error": None,
        }

    def clean_up(self):
        subprocess.run(["rm", "-rf", "./temp_code/*"])

    def createCode(self):
        match self.language:
            case "python":
                print("parsing the code")
                tree = ast.parse(self.code)
                for node in ast.walk(tree):
                    if isinstance(node, ast.FunctionDef):
                        func_name = node.name
                        print(node.name)

                full_code = textwrap.dedent(
                    f"""
                        testcases = {self.testcases}
                        for i, test in enumerate(testcases):
                            args = test["arg"].values()
                            try:
                                result = {func_name}(*args)
                                print(f"OUTPUT MARKER {{result}} OUTPUT MARKER")
                            except Exception as e:
                                raise e
                                # print(f"ERROR MARKER {{e}} ERROR MARKER")
                 """
                )

                # Ensure the user's code is properly integrated
                full_code = f"{self.code}\n{full_code}"

                # Write to file
                with open("temp_code/index.py", "w") as file:
                    file.write(full_code)
            case "javascript":
                pass
            case "typescript":
                pass
            case "go":
                pass

    def run(self):
        client = docker.from_env()

        match self.language:
            case "python":
                image = "python:3.12-slim"

                container_config = {
                    "image": image,
                    "command": "python3 index.py",
                    "volumes": {
                        f"{self.fileMount}": {
                            "bind": "/temp_code/",
                            "mode": "ro",
                        }
                    },
                    "working_dir": "/temp_code",
                    "detach": True,
                    "network_disabled": True,
                    "mem_limit": "512m",
                    "nano_cpus": int(1 * 1e9),
                    "read_only": True,
                    "stderr": True,
                    "stdout": True,
                }

                try:
                    try:
                        image = client.images.get(image)
                    except Exception:
                        print(f"pulling the {image}")
                        client.images.pull(image)

                    print("running the python code inside of the container")
                    container = client.containers.run(**container_config)

                    try:
                        exit_status = container.wait(timeout=3)
                        print(f"exit_status: {exit_status}")
                    except Exception as e:
                        print("time limit exceeded, so stopping the container")
                        self.output["status_message"] = "Time limit Exceeded"
                        container.kill()

                    logs = container.logs(stderr=True).decode().split("\n")

                    if exit_status["StatusCode"] != 0:
                        self.output["runtime_error"] = "".join(logs) + "\n"

                    final_output = []
                    for index, log in enumerate(logs):
                        if len(logs) > 10000:
                            self.output["status_message"] = (
                                "Output limit Exceeded"
                            )
                            break
                        if log.endswith("ERROR MARKER"):
                            print(log)
                        if log.endswith("OUTPUT MARKER"):
                            result = log.replace("OUTPUT MARKER", "").strip()
                            final_output.append(result)

                    self.output["code_answer"] = final_output
                    for index, value in enumerate(self.output["code_answer"]):
                        if value == self.output["expected_answer"][index]:
                            self.output["total_correct"] += 1

                    if (
                        self.output["total_correct"]
                        == self.output["total_testcases"]
                    ):
                        self.output["status_message"] = "Accepted"
                    else:
                        self.output["status_message"] = (
                            "Few test cases are failing"
                        )
                    return self.output

                except Exception as e:
                    print("error", e)

            case "javascript":
                pass
