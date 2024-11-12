import ast
import textwrap
import docker


class Execution:
    def __init__(self, language, code, testcases):
        self.language = language
        self.code = code
        self.testcases = testcases
        self.output = {}

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
                        print(f"ERROR MARKET {{e}} ERROR MARKER")
                """
                )

                with open("temp_code/index.py", "w") as file:
                    file.write(self.code)
                    file.write("\n" + full_code)

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

                # temporary solution, need to figure out
                # how to get absolute path on main machine, or other options
                file = "/mnt/harddrive/100xdevs/codeArena/RCE/temp_code/"
                # file_path = os.path.abspath(file)

                # alternative soln run the container without any command,
                # insert file into the container then do a docker exec
                # with open(file_path, "rb") as f:
                #    container.put_archive("/path/in/container", f)

                # container.exec_run('python /path/in/container/your_file.py')

                container_config = {
                    "image": image,
                    "command": ["timeout", "3s", "python3", "index.py"],
                    "volumes": [f"{file}:/temp_code"],
                    "working_dir": "/temp_code",
                    "detach": True,
                    "network_disabled": True,
                    "mem_limit": "512m",
                    "nano_cpus": int(1 * 1e9),
                }

                try:
                    try:
                        image = client.images.get(image)
                    except Exception:
                        print(f"pulling the {image}")
                        client.images.pull(image)

                    print("running the python code inside of the container")
                    container = client.containers.run(**container_config)

                    container.wait()
                    logs = container.logs().decode().split("\n")
                    print(logs)

                except Exception as e:
                    print("error", e)

            case "javascript":
                pass
