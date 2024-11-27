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
        code_snippet,
        testcases,
        expected_answer,
        compile_timeout,
        run_timeout,
        memory_limit,
    ):
        self.submission_id = submission_id
        self.language = language
        self.code = code
        self.code_snippet = code_snippet
        self.testcases = testcases
        self.expected_answer = expected_answer
        self.compile_timeout = compile_timeout
        self.run_timeout = run_timeout
        self.memory_limit = memory_limit
        self.fileMount = "/mnt/harddrive/100xdevs/codeArena/RCE/temp_code/"
        self.output = {
            "submission_id": submission_id,
            "language": language,
            "testcases": testcases,
            "expected_answer": expected_answer,
            "total_testcases": len(testcases),
            "total_correct": 0,
            "runtime_error": None,
            "code_answer": [],
            "code_output": [],
        }

    def clean_up(self):
        subprocess.run(["rm", "-rf", "./temp_code/*"])

    def createCode(self):
        match self.language:
            case "python":
                print("parsing the code")

                code_snippet_tree = ast.parse(self.code_snippet)
                func_node = code_snippet_tree.body[0]
                print(ast.dump(func_node, indent=4))
                func_name = func_node.name
                return_type = parse_return_type(func_node.returns)

                arg_type_array = []
                for arg in func_node.args.args:
                    arg_type = parse_args(arg.annotation)
                    arg_type_array.append(arg_type)

                print(func_name, return_type, arg_type_array)

                helper_code = textwrap.dedent(
                    """
                    import ast
                    
                    class ListNode:
                        def __init__(self, val=0, next=None):
                            self.val = val
                            self.next = next
                    
                    def list_to_listnode(nums):
                        dummy = ListNode()
                        current = dummy
                        for num in nums:
                            current.next = ListNode(num)
                            current = current.next
                        return dummy.next
                    
                    def listnode_to_list(node):
                        result = []
                        while node:
                            result.append(node.val)
                            node = node.next
                        return result

                    def safe_eval(arg):
                       try:
                          return ast.literal_eval(arg)
                       except Exception as err:
                          return arg
                """
                )

                running_testcases = textwrap.dedent(
                    f"""
                        return_type = '{return_type}'
                        arg_type_array = {arg_type_array}
                        testcases = {self.testcases}
                        for i, test in enumerate(testcases):
                            args = test.split("\\n")
                            safe_args = []
                            for i, arg in enumerate(args):
                               safe_arg = safe_eval(arg)
                               if(arg_type_array[i] == 'ListNode'):
                                    safe_arg = list_to_listnode(safe_arg)
                               safe_args.append(safe_arg)

                            try:
                                result = {func_name}(*safe_args)
                                if(return_type == 'ListNode'):
                                   result = listnode_to_list(result)
                                print(f"OUTPUT MARKER {{result}} OUTPUT MARKER")
                            except Exception as e:
                                raise e
                                # print(f"ERROR MARKER {{e}} ERROR MARKER")
                 """
                )

                # Ensure the user's code is properly integrated
                full_code = (
                    f"{helper_code}\n\n{self.code}\n{running_testcases}"
                )

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
        final_output = []  # this is for user logs
        final_answer = []  # this is for user result
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

                    for index, log in enumerate(logs):
                        if len(logs) > 10000:
                            self.output["status_message"] = (
                                "Output limit Exceeded"
                            )
                            break
                        elif log.endswith("ERROR MARKER"):
                            print(log)
                        elif log.endswith("OUTPUT MARKER"):
                            result = log.replace("OUTPUT MARKER", "").strip()
                            final_answer.append(result)
                        else:
                            final_output.append(log)

                    expected_output_array = self.expected_answer
                    for index, value in enumerate(final_answer):
                        if value == expected_output_array[index]:
                            self.output["total_correct"] += 1

                    self.output["code_answer"] = final_answer
                    self.output["code_output"] = final_output
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
                    self.output["status_message"] = "Internal Server error"
                    return self.output

            case "javascript":
                pass


def parse_return_type(return_obj):
    if isinstance(return_obj, ast.Name):
        main_type = return_obj.id
        return main_type
    else:
        main_type = return_obj.value.id

    if isinstance(return_obj.slice, ast.Subscript):
        sub_type = parse_return_type(return_obj.slice)
    else:
        sub_type = return_obj.slice.id

    return f"{main_type}[{sub_type}]"


def parse_args(arg):
    if isinstance(arg, ast.Name):
        return arg.id
    else:
        main_type = arg.value.id

    print("main", main_type)
    if isinstance(arg.slice, ast.Subscript):
        sub_type = parse_args(arg.slice)
    else:
        sub_type = arg.slice.id

    return f"{main_type}[{sub_type}]"
