
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: Request) => {
  try {
    const userId = req.headers.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Fetch all files shared with the user
    const sharedFiles = await prisma.fileShare.findMany({
      where: { sharedWithId: userId },
      include: {
        file: true, // Include file details
      },
    });

    if (!sharedFiles.length) {
      return NextResponse.json({ message: "No files shared with you" }, { status: 200 });
    }

    return NextResponse.json({ sharedFiles }, { status: 200 });
  } catch (error) {
    console.log("Error fetching shared files:", error.stack);
    return NextResponse.json({ error: "Error fetching shared files" }, { status: 500 });
  }
};
