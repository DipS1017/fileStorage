
// src/app/api/files/index.ts (or src/pages/api/files/index.ts)
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust your prisma path

export const GET = async () => {
  try {
    // Fetch all files from the database
    const files = await prisma.file.findMany();

    // Return all files as a JSON response
    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json({ error: 'Error fetching files' }, { status: 500 });
  }
};
