import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No valid file received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replace(/\s+/g, "_"); // Replace spaces with underscores.
    console.log(`Uploading file: ${filename}`);

    const uploadPath = path.join(process.cwd(), "public", "uploads", filename);

    await writeFile(uploadPath, buffer);

    return NextResponse.json({ message: "File uploaded successfully", status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error occurred:", error.message);
      return NextResponse.json({ error: `Upload failed: ${error.message}` }, { status: 500 });
    }

    console.error("Unknown error occurred:", error);
    return NextResponse.json({ error: "An unknown error occurred.", status: 500 });
  }
};

