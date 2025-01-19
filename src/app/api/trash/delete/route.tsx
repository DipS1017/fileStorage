
import { NextResponse } from "next/server";
import path from "path";
import { unlink } from "fs/promises";
import prisma from "@/lib/prisma";

export const DELETE = async (req: Request) => {
  try {
    const { fileId } = await req.json(); 

    // First check if the file exists and is in trash
    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        isDeleted: true,
      },
    });

    if (!file) {
      return NextResponse.json(
        { error: "File not found in trash" },
        { status: 404 }
      );
    }

    // Construct the file path to delete the physical file
    const filePath = path.join(process.cwd(), "public", file.filePath);

    // Delete the physical file
    try {
      await unlink(filePath);
      console.log(`File deleted from server: ${filePath}`);
    } catch (fsError) {
      console.log(`Error deleting file from server: ${fsError.stack}`);
      return NextResponse.json(
        { error: "Error deleting file from server" },
        { status: 500 }
      );
    }

    // Then delete the file from the database
    await prisma.file.delete({
      where: {
        id: fileId,
      },
    });

    return NextResponse.json(
      { message: "File permanently deleted from trash and server" },
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

