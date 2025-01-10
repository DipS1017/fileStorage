import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust the import path as necessary

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        files: true,
        sharedFiles: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  const { email, name } = await request.json();

  if (!email || !name) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.error();
  }
}

