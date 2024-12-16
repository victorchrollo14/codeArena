import prisma from "./prisma";

const fetchProblems = async () => {
  try {
    const data = await prisma.problem.findMany({
      select: { id: true, title: true, level: true, tags: true },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

const fetchProblem = async (problemId: number) => {
  try {
    console.log(problemId);
    const data = await prisma.problem.findFirst({
      where: { id: problemId },
      select: {
        id: true,
        title: true,
        description: true,
        level: true,
        tags: true,
        editorial: true,
        codeSnippets: true,
        testCases: true,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export { fetchProblems, fetchProblem };
