
"use client";

import { FileCard } from "@/./components/FileCard";
import { Loader } from "@/./components/element/loader";
import { File } from "@/types";
import { useQuery } from "@tanstack/react-query";

// Helper function to fetch files from the trash
const fetchTrashFiles = async (): Promise<{ files: File[] }> => {
  const response = await fetch("/api/trash/get");

  if (!response.ok) {
    throw new Error("Error fetching files");
  }

  return await response.json();
};

const TrashList = () => {
  // Use the useQuery hook from TanStack Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trashFiles"], // The query key
    queryFn: fetchTrashFiles, // The function to fetch the data
    staleTime: 30 * 1000, 
  });

  // Loading state
  if (isLoading) return <Loader />;

  // Error state
  if (isError) return <div>{(error as Error).message}</div>;

  // Render the files list
  return (
    <div className="file-list">
      {data?.files.length === 0 ? (
        <p>No files found</p>
      ) : (
        data?.files.map((file) => <FileCard key={file.id} file={file} />)
      )}
    </div>
  );
};

export default TrashList;

