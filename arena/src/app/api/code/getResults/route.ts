import { serverEnv } from "@config/environ";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const submissionId = body.submissionId;

    console.log(serverEnv.REDIS_URL);
    const client = createClient({ url: serverEnv.REDIS_URL });
    client.on("error", (err) => {
      console.log("redis client error", err);
      throw err;
    });

    await client.connect();
    const results = await client.get(submissionId);
    console.log(results);

    return NextResponse.json({
      message: "code execution done",
      results: results,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 501 },
    );
  }
};

export { POST };
