

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust your prisma path

export const PATCH= async (req: Request) => {
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
    if (file.isFavorite=== false) {
   
    // Perform the restoration by setting isDeleted to false
     await prisma.file.update({
      where: { id: fileId },
      data: {
        isFavorite: true, // Mark as not deleted
      },
    });    }else{

    // Perform the restoration by setting isDeleted to false
     await prisma.file.update({
      where: { id: fileId },
      data: {
        isFavorite: false, // Mark as not deleted
      },
    });
    }


    return NextResponse.json(
      { message: "File is Favorite" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during file Favorite:", error);
    return NextResponse.json(
      { error: "Error favoriting file" },
      { status: 500 }
    );
  }
};

