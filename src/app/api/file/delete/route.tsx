
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust your prisma path

export const DELETE = async (req: Request) => {
  try {
    const { fileId } = await req.json(); // Assuming you're passing the fileId in the request body
    
    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      );
    }

    // Check if the file exists and is not already marked as deleted
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    // Perform the soft delete by setting isDeleted to true
    const deletedFile = await prisma.file.update({
      where: { id: fileId },
      data: {
        isDeleted: true, // Mark as deleted
      },
    });

    // Optionally, you can store the deleted file details in the DeletedFile model for record-keeping
    await prisma.deletedFile.create({
      data: {
        fileId: deletedFile.id,
        userId: deletedFile.ownerId, // This is the user who deleted the file (or the current user)
      },
    });

    return NextResponse.json(
      { message: "File marked as deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during file deletion:", error);
    return NextResponse.json(
      { error: "Error deleting file" },
      { status: 500 }
    );
  }
};
