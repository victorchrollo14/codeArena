import prisma from "lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import bcrypt from "bcrypt";

const RegisterSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validate = RegisterSchema.safeParse(body);

    if (!validate.success) {
      return NextResponse.json(
        { error: "invalid input parameters" },
        { status: 400 },
      );
    }

    const validData = validate.data;

    const hashedPassword = await bcrypt.hash(validData.password, 10);
    validData.password = hashedPassword;

    const newUser = await prisma.user.create({
      data: {
        username: validData.username,
        email: validData.email,
        password: validData.password,
      },
    });

    console.log(newUser);

    return NextResponse.json({ message: "user registered successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export { POST };
