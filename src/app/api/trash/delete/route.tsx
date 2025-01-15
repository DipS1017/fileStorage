import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const DELETE = async (req: Request) => {
  try {
    const { fileId } = await req.json();

    // First check if file exists and is in trash
    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        isDeleted: true
      },
      include: {
        deletedFiles: true // Get the trash metadata
      }
    });

    if (!file) {
      return NextResponse.json(
        { error: "File not found in trash" },
        { status: 404 }
      );
    }


    // Then delete the file
    await prisma.file.delete({
      where: {
        id: fileId,
      },
    });

    return NextResponse.json(
      { message: "File permanently deleted" },
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
