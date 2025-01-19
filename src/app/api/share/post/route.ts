
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req: Request) => {
  try {
    const { fileId, sharedWithUserId, permission } = await req.json();

    // Check if the file exists and the requester owns it
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Verify the requester is the owner
    if (file.ownerId !== req.headers.get("userId")) {
      return NextResponse.json({ error: "You are not the owner of this file" }, { status: 403 });
    }

    // Check if the user being shared with exists
    const sharedWithUser = await prisma.user.findUnique({
      where: { id: sharedWithUserId },
    });

    if (!sharedWithUser) {
      return NextResponse.json({ error: "User to share with not found" }, { status: 404 });
    }

    // Create or update the FileShare entry
    const fileShare = await prisma.fileShare.upsert({
      where: {
        fileId_sharedWithId: {
          fileId,
          sharedWithId: sharedWithUserId,
        },
      },
      update: {
        permissions: permission || "VIEW",
      },
      create: {
        fileId,
        sharedWithId: sharedWithUserId,
        permissions: permission || "VIEW",
      },
    });

    return NextResponse.json({ message: "File shared successfully", fileShare }, { status: 200 });
  } catch (error) {
    console.log("Error sharing file:", error.stack);
    return NextResponse.json({ error: "Error sharing file" }, { status: 500 });
  }
};
