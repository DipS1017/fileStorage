
"use client";

import { FileCard } from "@/./components/FileCard";
import { Loader } from "@/./components/element/loader";
import { File } from "@/types";
import { useQuery } from "@tanstack/react-query";

// Helper function to fetch files
const fetchFiles = async (): Promise<{ files: File[] }> => {
  const response = await fetch("/api/fav/get");

  if (!response.ok) {
    throw new Error("Error fetching files");
  }

  return await response.json();
};

const FavList= () => {
  // Use the useQuery hook from TanStack Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["files"], // Unique query key
    queryFn: fetchFiles, // Fetching function
    staleTime: 5*1000,
  });

  // Loading state
  if (isLoading) return <Loader />;

  // Error state
  if (isError) return <div>Error fetching files: {(error as Error).message}</div>;

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

export default FavList;

