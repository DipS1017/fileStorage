
"use client";

import { File } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { ArchiveRestore, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem } from "./ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { usePathname } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Helper function for deleting the file
const deleteFile = async (fileId: string) => {
  const response = await fetch('/api/file/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileId }),
  });

  if (!response.ok) {
    throw new Error('Error deleting file');
  }
  return fileId; // Return fileId to be used for invalidating queries
};

// Helper function for restoring the file
const restoreFile = async (fileId: string) => {
  const response = await fetch('/api/trash/patch', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileId }),
  });

  if (!response.ok) {
    throw new Error('Error restoring file');
  }
  return fileId; // Return fileId to be used for invalidating queries
};

interface FileCardProps {
  file: File;
  isGrid: boolean;
}

export function FileCard({ file, isGrid }: FileCardProps) {
  const pathname = usePathname();
  const fileExtension = file.fileName.split('.').pop()?.toLowerCase();

  const queryClient = useQueryClient(); // Access the query client for invalidating queries

  // Set up mutations for delete and restore
  const deleteMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      // Invalidate queries related to files or trash, depending on the action

      queryClient.invalidateQueries({queryKey:["trashFiles"]});
      queryClient.invalidateQueries({queryKey:["files"]});
    },
    onError: (error: unknown) => {
      console.error('Error deleting file:', error);
    },
  });

  const restoreMutation = useMutation({
    mutationFn: restoreFile,
    onSuccess: () => {
      // Invalidate trash query after restoring
      queryClient.invalidateQueries({queryKey:["trashFiles"]});
      queryClient.invalidateQueries({queryKey:["files"]});
    },
    onError: (error: unknown) => {
      console.error('Error restoring file:', error);
    },
  });

  const getThumbnail = () => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
    if (imageExtensions.includes(fileExtension || '')) {
      return <img src={`http://localhost:3000${file.filePath}`} alt={file.fileName} className="w-16 h-16 object-cover" />;
    }
    return null; // Return nothing if it's not an image
  };

  const getFileIcon = () => {
    switch (fileExtension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '🖼️';
      default:
        return '📁';
    }
  };

  const formatFileSize = (size: number | undefined) => {
    if (!size) return 'Unknown size';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(1)} ${units[i]}`;
  };

  const handleDelete = () => {
    deleteMutation.mutate(file.id);
  };

  const handleRestore = () => {
    restoreMutation.mutate(file.id);
  };

  const isInFile = pathname === "/files";
  const isInTrash = pathname === "/trash";
  const isInFavorites = pathname === "/favorites";

  return (
    <Card className={`hover:shadow-lg transition-shadow duration-300 ${isGrid ? "max-w-xs" : "w-full"}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">{getThumbnail() || getFileIcon()}</div>
            <div>
              <h3 className="font-semibold text-lg truncate" title={file.fileName}>
                {file.fileName}
              </h3>
              <p className="text-sm text-gray-500">
                {formatFileSize(file.fileSize)} • {formatDistanceToNow(new Date(file.uploadedAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVerticalIcon className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!isInTrash && (
                <DropdownMenuItem className="text-red-600">
                  <Trash2Icon className="mr-2 h-4 w-4" />
                  <span>
                    <button onClick={handleDelete}>Delete</button>
                  </span>
                </DropdownMenuItem>
              )}
              {isInTrash && (
                <DropdownMenuItem className="text-green-600">
                  <ArchiveRestore className="mr-2 h-4 w-4" />
                  <span>
                    <button onClick={handleRestore}>Restore</button>
                  </span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

