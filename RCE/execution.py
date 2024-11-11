import ast
import textwrap
import subprocess


class Execution:
    def __init__(self, language, code, testcases):
        self.language = language
        self.code = code
        self.testcases = testcases

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

                subprocess.run(["black", "temp_code/index.py"])

            case "javascript":
                pass
            case "typescript":
                pass
            case "go":
                pass

    def run():
        pass
