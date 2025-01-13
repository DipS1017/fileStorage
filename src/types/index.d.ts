export interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  className?: string;
}
export interface ThumbnailProps {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string;
}


// User model interface
export interface User {
  id: string;         // ID (ObjectId as string)
  clerkId?: string;   // Clerk ID (optional)
  email: string;      // User's email
  name?: string;      // User's first name (optional)
  lastName?: string;  // User's last name (optional)
  userType: string;   // User's type (e.g., "free")
  createdAt: string;  // Timestamp for user creation
  updatedAt: string;  // Timestamp for when user is updated
  files: File[];      // One-to-many relationship with File model
  sharedFiles: FileShare[]; // One-to-many relationship with FileShare model
}

// File model interface
export interface File {
  id: string;         // File ID (ObjectId as string)
  ownerId: string;    // Owner's user ID (ObjectId as string)
  owner: User;        // Owner information (User object)
  fileName: string;   // File's name
  filePath: string;   // File's path (location)
  fileSize?: number;  // File size (optional)
  uploadedAt: string; // Timestamp for when file was uploaded
  sharedWith: FileShare[]; // Files shared with other users (one-to-many)
  isDeleted: boolean; // Soft delete flag (default is false)
  deletedFiles: DeletedFile[]; // Relationship with deleted files (one-to-many)
}

// DeletedFile model interface
export interface DeletedFile {
  id: string;         // Deleted file ID (ObjectId as string)
  fileId: string;     // The original file ID (ObjectId as string)
  file: File;         // The original file (File object)
  deletedAt: string;  // Timestamp for when the file was deleted
  userId: string;     // The user who deleted the file (ObjectId as string)
}

// FileShare model interface
export interface FileShare {
  id: string;          // FileShare ID (ObjectId as string)
  fileId: string;      // File ID that is shared (ObjectId as string)
  file: File;          // The file being shared (File object)
  sharedWithId: string; // User ID with whom the file is shared (ObjectId as string)
  sharedWith: User;    // The user with whom the file is shared (User object)
  permissions: string; // The type of permissions (e.g., "view", "edit")
  sharedAt: string;    // Timestamp for when the file was shared
}

