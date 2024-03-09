import { NextResponse } from "next/server";
import prisma from "~/utils/db";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Please enter all details" },
        { status: 500 },
      );
    }

    var user = await prisma.user.create({
      data: {
        email: username,
        password,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
}
