import prisma from "./prisma";

export const fetchProblems = async () => {
  try {
    const data = await prisma.problem.findMany({
      select: { id: true, title: true, level: true, tags: true },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
