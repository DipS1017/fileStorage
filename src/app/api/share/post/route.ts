

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';  
import { auth } from '@clerk/nextjs/server';  

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = await auth();  // Get the current user's ID from Clerk
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { shareType, selectedUser, email, fileId } = req.body;

    // Check for required fields
    if (!fileId || (!selectedUser && !email)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Fetch the file from the database to ensure it exists
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    let sharedWithId;

    // If sharing with an existing user
    if (shareType === "user" && selectedUser) {
      // Check if the selected user exists
      const user = await prisma.user.findUnique({
        where: { id: selectedUser },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      sharedWithId = user.id;
    }

    // If sharing via email
    if (shareType === "email" && email) {
      // Handle email sharing logic, e.g., send an email or store it
      sharedWithId = email;
    }

    // Store the file sharing in the database
    const fileShare = await prisma.fileShare.create({
      data: {
        fileId,
        sharedWithId,
        permissions: "VIEW", // Default permission
      },
    });

    // Respond with success
    return res.status(200).json({ message: "File shared successfully", fileShare });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

