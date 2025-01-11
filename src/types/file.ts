
export interface User {
  id: string
  clerkId?: string
  email: string
  name?: string
  lastName?: string
  userType: string
  createdAt: Date
  updatedAt: Date
  files: File[]
  sharedFiles: FileShare[]
}

export interface File {
  id: string
  ownerId: string
  owner: User
  fileName: string
  filePath: string
  fileSize?: number
  uploadedAt: Date
  sharedWith: FileShare[]
}

export interface FileShare {
  id: string
  fileId: string
  file: File
  userId: string
  user: User
  sharedAt: Date
}
