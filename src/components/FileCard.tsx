"use client";

import { File } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { ArchiveRestoreIcon, MoreVertical, Star, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem } from "./ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { usePathname } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileModal } from "@/components/FileModal";
import { formatFileSize } from "@/components/element/fileSize";
import { useState } from "react";
// Helper function for deleting the file
const deleteFile = async (fileId: string) => {
  const response = await fetch("/api/file/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileId }),
  });

  if (!response.ok) {
    throw new Error("Error deleting file");
  }
  return fileId; // Return fileId to be used for invalidating queries
};

// Helper function for restoring the file
const restoreFile = async (fileId: string) => {
  const response = await fetch("/api/trash/patch", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileId }),
  });

  if (!response.ok) {
    throw new Error("Error restoring file");
  }
  return fileId; // Return fileId to be used for invalidating queries
};

// Helper function to toggle favorite
const toggleFavorite = async (fileId: string, isFavorite: boolean) => {
  const response = await fetch("/api/fav/toggle", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileId, isFavorite }),
  });

  if (!response.ok) {
    throw new Error("Error toggling favorite status");
  }

  return fileId; // Return fileId for invalidating queries
};
// function to perma delete from Trash
const permaDeleteFile = async (fileId: string) => {
  const response = await fetch("/api/trash/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileId }),
  });

  if (!response.ok) {
    throw new Error("Error deleting file");
  }
  return fileId; // Return fileId to be used for invalidating queries
};
interface FileCardProps {
  file: File;
  isGrid: boolean;
}

export function FileCard({ file, isGrid }: FileCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const fileExtension = file.fileName.split(".").pop()?.toLowerCase();

  const queryClient = useQueryClient(); // Access the query client for invalidating queries

  // Set up mutations for delete and restore
  const deleteMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      // Invalidate queries related to files or trash, depending on the action

      queryClient.invalidateQueries({ queryKey: ["trashFiles"] });
      queryClient.invalidateQueries({ queryKey: ["favfiles"] });
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: (error: unknown) => {
      console.error("Error deleting file:", error);
    },
  });

  const restoreMutation = useMutation({
    mutationFn: restoreFile,
    onSuccess: () => {
      // Invalidate trash query after restoring
      queryClient.invalidateQueries({ queryKey: ["trashFiles"] });
      queryClient.invalidateQueries({ queryKey: ["favfiles"] });
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: (error: unknown) => {
      console.error("Error restoring file:", error);
    },
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: ({
      fileId,
      isFavorite,
    }: {
      fileId: string;
      isFavorite: boolean;
    }) => toggleFavorite(fileId, isFavorite),
    onSuccess: () => {
      // Invalidate relevant queries to reflect changes
      queryClient.invalidateQueries({ queryKey: ["favfiles"] });
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: (error: unknown) => {
      console.error("Error toggling favorite status:", error);
    },
  });
  const permaDeleteMutation = useMutation({
    mutationFn: ({ fileId }: { fileId: string }) => permaDeleteFile(fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trashFiles"] });
    },
    onError: (error: unknown) => {
      console.error("Error deleting file:", error);
    },
  });

  const getThumbnail = () => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    if (imageExtensions.includes(fileExtension || "")) {
      return (
        <img
          src={`http://localhost:3000${file.filePath}`}
          alt={file.fileName}
          className="w-16 h-16 object-cover"
        />
      );
    }
    return null; // Return nothing if it's not an image
  };

  const getFileIcon = () => {
    switch (fileExtension) {
      case "pdf":
        return "📄";
      case "doc":
      case "docx":
        return "📝";
      case "xls":
      case "xlsx":
        return "📊";
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️";
      default:
        return "📁";
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate(file.id);
  };

  const handleRestore = () => {
    restoreMutation.mutate(file.id);
  };
  const handlePermaDelete = () => {
    permaDeleteMutation.mutate(file.id);
  };
  const isInTrash = pathname === "/trash";

  return (
    <>
      <Card
        className={`hover:shadow-lg transition-shadow duration-300 ${isGrid ? "max-w-xs" : "w-full"
          }`}
        onClick={() => setIsModalOpen(true)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">
                {getThumbnail(file) || getFileIcon(file)}
              </div>
              <div>
                <h3
                  className="font-semibold text-lg truncate"
                  title={file.fileName}
                >
                  {file.fileName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.fileSize)} •{" "}
                  {formatDistanceToNow(new Date(file.uploadedAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isInTrash && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 transition-colors duration-200 ${file.isFavorite
                      ? "text-yellow-500 hover:text-yellow-600"
                      : "text-muted-foreground hover:text-yellow-500"
                    }`}
                  aria-label={
                    file.isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavoriteMutation.mutate({
                      fileId: file.id,
                      isFavorite: !file.isFavorite,
                    });
                  }}
                >
                  <Star
                    className={`h-5 w-5 ${file.isFavorite ? "fill-current" : ""}`}
                  />
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {!isInTrash ? (
                    <>
                      <DropdownMenuItem
                        onClick={handleDelete}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        onClick={handleRestore}
                        className="text-green-600"
                      >
                        <ArchiveRestoreIcon className="mr-2 h-4 w-4" />
                        <span>Restore</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={permaDeleteFile}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
      <FileModal
        file={file}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
