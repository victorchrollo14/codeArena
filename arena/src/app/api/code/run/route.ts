import prisma from "lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import amqplib from "amqplib";
import { unique } from "next/dist/build/utils";

const RunCodeSchema = z.object({
  lang: z.enum(["python", "javascript", "typescript", "golang"]),
  code: z.string(),
  problemId: z.number(),
});

const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    console.log(data);
    const validate = RunCodeSchema.safeParse(data);

    if (!validate.success) {
      const error = validate.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          message: "Bad Request, Invalid or missing input arguments",
          error: error,
        },
        { status: 400 },
      );
    }

    console.log(validate.data);
    const problemData = await prisma.problem.findFirst({
      where: { id: validate.data.problemId },
      include: { codeSnippets: { where: { lang: validate.data.lang } } },
    });

    if (!problemData) {
      return NextResponse.json(
        { error: "Bad Request, Problem id not found" },
        { status: 400 },
      );
    }

    const submissionId = `runcode_${Date.now()}_${nanoid(6)}`;
    const queueObj = {
      submissionId: submissionId,
      language: validate.data.lang,
      code: validate.data.code,
      testcases: problemData.testCases,
      expectedAnswer: problemData.expectedAnswer,
      compileTimeout: problemData.compileTimeOut,
      runTimeout: problemData.runTimeOut,
      memoryLimit: problemData.memoryLimit,
      codeSnippet: problemData.codeSnippets[0].code,
    };
    const queueData = JSON.stringify(queueObj);
    console.log(queueData);

    const queue = "arena_rce_queue";
    const conn = await amqplib.connect("amqp://localhost");
    const channel = await conn.createChannel();
    channel.sendToQueue(queue, Buffer.from(queueData));

    return NextResponse.json({
      message: "added the code to queue",
      submissionId: submissionId,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 501 },
    );
  }
};

export { POST };
