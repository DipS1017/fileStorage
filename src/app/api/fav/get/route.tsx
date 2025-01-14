

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust your prisma path
import { auth } from '@clerk/nextjs/server'; // Import Clerk's auth module

export const GET = async () => {
  try {
    // Step 1: Authenticate the user with Clerk to get the clerkId
    const { userId: clerkId } = await auth(); // This assumes you are passing the session token or API key

    if (!clerkId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Step 2: Fetch the user based on clerkId from the database
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId, // The clerkId from Clerk's session
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Step 3: Fetch all files associated with the userId
    const files = await prisma.file.findMany({
      where: {
        ownerId: user.id, // Assuming the `ownerId` field stores the userId
        isFavorite:true,
      },
    });

    // Return the files associated with the user
    return NextResponse.json(
      { files },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json(
      { error: 'Error fetching files' },
      { status: 500 }
    );
  }
};

