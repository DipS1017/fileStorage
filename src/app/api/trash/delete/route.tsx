
import { NextResponse } from "next/server";
import path from "path";
import { unlink } from "fs/promises";
import prisma from "@/lib/prisma";

export const DELETE = async (req: Request) => {
  try {
    const { fileId } = await req.json();

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      );
    }

    // Check if the file exists
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    // Debugging: Log the file data
    console.log("File found:", file);

    // Ensure fileId and userId are available
    if (!file.id || !file.ownerId) {
      return NextResponse.json(
        { error: "Missing required fields: fileId or ownerId" },
        { status: 400 }
      );
    }

    // Construct the file path
    const filePath = path.join(process.cwd(), "public", file.filePath);

    // Save metadata to the DeletedFile table
    await prisma.deletedFile.create({
      data: {
        fileId: file.id,
        fileName: file.fileName,
        userId: file.ownerId, 
      },
    });

    // Delete the physical file
    try {
      await unlink(filePath);
      console.log(`File deleted from server: ${filePath}`);
    } catch (fsError) {
      console.log(`Error deleting file from server: ${fsError}`);
      return NextResponse.json(
        { error: "Error deleting file from server" },
        { status: 500 }
      );
    }

    // Remove the file record from the File table
    await prisma.file.delete({
      where: { id: fileId },
    });

    return NextResponse.json(
      { message: "File permanently deleted, metadata saved" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error during file deletion:", error.stack);
    return NextResponse.json(
      { error: "Error deleting file" },
      { status: 500 }
    );
  }
};

