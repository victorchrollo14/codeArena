import { PrismaClient } from "@prisma/client";
import { problems } from "./seedData.mjs";

const prisma = new PrismaClient();

const seedProblems = async () => {
  try {
    console.log("seeding the problems table....");
    const existingProblems = await prisma.problem.findMany();

    if (existingProblems.length !== 0) {
      console.log("problems table already contains data");
      return;
    }

    const modProblems = problems.map((problem) => {
      return {
        ...problem,
        level: problem.level.toLowerCase(),
        codeSnippets: { create: problem.codeSnippets },
      };
    });

    modProblems.forEach(async (problem) => {
      await prisma.problem.create({ data: problem });
    });

    console.log(`seeded ${problems.length} problems`);
  } catch (error) {
    console.log(error);
  }
};

seedProblems();
