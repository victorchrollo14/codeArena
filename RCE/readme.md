# Remote code execution engine

### things to take care of when running code submitted by users

- Running code in a sandboxed or containerized environment
- Putting resource limits on the code like, memory limit, run time limit, compile time limit, disk limit
- Restrict file system access, network access
- Input validations
  - no imports
  - validate code syntax using a parser
  - check if funcName and parameters submitted match the initial problem
