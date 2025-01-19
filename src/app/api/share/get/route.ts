
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"; // Import Clerk's auth module
import {  SharedFile } from "@/types";

export const GET = async () => {
  try {
    // Step 1: Get the authenticated user's Clerk ID
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Step 2: Fetch the user based on clerkId from the database
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId, // The clerkId from Clerk's session
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Step 3: Fetch all files shared with the user
    const sharedFiles = await prisma.fileShare.findMany({
      where: { sharedWithId: user.id }, // Use the user's database ID
      include: {
        file: true, // Include file details
      },
    });

    if (!sharedFiles.length) {
      return NextResponse.json(
        { message: "No files shared with you" },
        { status: 200 }
      );
    }

    // Step 4: Return shared files
 const files = sharedFiles.map((sharedFile:SharedFile) => sharedFile.file);
    return NextResponse.json({ files:files ||[]}, { status: 200 });
  } catch (error) {
    console.log("Error fetching shared files:", error);

    return NextResponse.json(
      { error: "Error fetching shared files" },
      { status: 500 }
    );
  }
};

