
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req: Request) => {
  try {
    // Parse FormData
    const formData = await req.formData();
    const files = formData.getAll("file[]");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No valid files received." }, { status: 400 });
    }

    for (const file of files) {
      if (!(file instanceof Blob)) {
        return NextResponse.json({ error: "Invalid file type." }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replace(/\s+/g, "_");
      const uploadPath = path.join(process.cwd(), "public", "uploads", filename);

      // Save file to the server
      await writeFile(uploadPath, buffer);
    }

    return NextResponse.json({ message: "Files uploaded successfully", status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
};
