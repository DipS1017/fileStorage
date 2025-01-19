
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';  // Adjust the path to your prisma client
import { auth } from '@clerk/nextjs/server';  // Ensure Clerk is set up correctly

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();  // Get the current user's ID from Clerk
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { shareType, selectedUser, email, fileId } = await req.json();

    // Validate required fields
    if (!fileId || (!selectedUser && !email)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Fetch the file to ensure it exists
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    let sharedWithId;

    // If sharing with an existing user
    if (shareType === "user" && selectedUser) {
      // Ensure the selected user exists in the database
      const user = await prisma.user.findUnique({
        where: { id: selectedUser },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      sharedWithId = user.id; // Store the user's ID
    }

    // If sharing via email, search for the user by email
    if (shareType === "email" && email) {
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found with the given email" }, { status: 404 });
      }

      sharedWithId = user.id; // Use the found user's ID
    }

    // Store the sharing information in the database
    const fileShare = await prisma.fileShare.create({
      data: {
        fileId,
        sharedWithId,
        permissions: "VIEW", // Default permission is "VIEW"
      },
    });

    // Respond with success
    return NextResponse.json({ message: "File shared successfully", fileShare }, { status: 200 });
  } catch (error) {
    console.error(error.stack);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

