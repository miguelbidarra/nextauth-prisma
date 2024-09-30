import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data);

    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }
    console.log(userFound);

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    const { ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
