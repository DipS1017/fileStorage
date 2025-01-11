import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import prisma from '@/lib/prisma';

export const POST = async (req: Request) => {
  try {
    // Parse FormData from the request
    const formData = await req.formData();
    const files = formData.getAll("file[]"); // Assumes input field has the name `file[]`
    const accountId = formData.get("accountId");

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No valid files received." },
        { status: 400 },
      );
    }
    if (!accountId) {
      return NextResponse.json(
        { error: "Owner ID or Account ID is missing." },
        { status: 400 },
      );
    }

    const uploadedFilesMetadata = []; // To store metadata for database insertion

    for (const file of files) {
      if (!(file instanceof Blob)) {
        return NextResponse.json(
          { error: "Invalid file type." },
          { status: 400 },
        );
      }

      // Extract file data
      const buffer = Buffer.from(await file.arrayBuffer());
      const originalFileName = file.name;
      const sanitizedFileName = originalFileName.replace(/\s+/g, "_");
      const uploadDirectory = path.join(process.cwd(), "public", "uploads");
      const uploadPath = path.join(uploadDirectory, sanitizedFileName);

      // Save the file to the server
      await writeFile(uploadPath, buffer);

      // Generate a public URL for the uploaded file
      const fileUrl = `/uploads/${sanitizedFileName}`;

      // Store metadata for each file
      uploadedFilesMetadata.push({
        ownerId: accountId,
        fileName: originalFileName,
        filePath: fileUrl,
        fileSize: buffer.length, // File size in bytes
      });
    }
    console.log("Uploaded files metadata:", uploadedFilesMetadata);

    // Save all file metadata to the database using Prisma
    try {
      if (uploadedFilesMetadata.length === 0) {
        console.error("No files to save to the database.");
        return NextResponse.json(
          { error: "No files to save to the database." },
          { status: 500 },
        );
      }
      const savedFiles = await prisma.file.createMany({
        data: uploadedFilesMetadata,
      });
      console.log("Saved files:", savedFiles);
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Database error: " + dbError.message },
        { status: 500 },
      );
    }

    // Return success response
    return NextResponse.json(
      {
        message: "Files uploaded and metadata saved successfully",
        uploadedFiles: uploadedFilesMetadata,
      },
      { status: 201 },
    );
  } catch (error) {
    // Improved error handling with error logging
    console.error("Error during file upload:", error);

    // Check if the error is an instance of Error to get the message
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Return a 500 error response with the error message
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
