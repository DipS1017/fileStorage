
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust your prisma path

export const PATCH = async (req: Request) => {
  try {
    const { fileId } = await req.json(); // Assuming you're passing the fileId in the request body
    
    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      );
    }

    // Check if the file exists and is already marked as deleted
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    // Check if the file is marked as deleted, then restore it
    if (file.isDeleted === false) {
      return NextResponse.json(
        { error: "File is not deleted" },
        { status: 400 }
      );
    }

    // Perform the restoration by setting isDeleted to false
    const updatedFile = await prisma.file.update({
      where: { id: fileId },
      data: {
        isDeleted: false, // Mark as not deleted
      },
    });

    return NextResponse.json(
      { message: "File restored successfully", file: updatedFile },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error during file restoration:", error.stack);
    return NextResponse.json(
      { error: "Error restoring file" },
      { status: 500 }
    );
  }
};

