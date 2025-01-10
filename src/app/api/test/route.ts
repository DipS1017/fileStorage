import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Try querying the database
    const users = await prisma.user.findMany(); // Replace with a query based on your schema

    console.log('Users:', users); // Log the result for testing purposes

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error('Error connecting to MongoDB or querying data:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
