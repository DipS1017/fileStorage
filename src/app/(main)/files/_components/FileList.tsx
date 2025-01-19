"use client";

import { FileCard } from "@/./components/FileCard";
import { Loader } from "@/./components/element/loader";
import { File } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchFiles = async (): Promise<File[]> => {
  const response = await fetch("/api/file/get");

  if (!response.ok) {
    throw new Error("Error fetching files");
  }

  const data = await response.json();
  console.log(data);
  return data.files;
};
const FileList = () => {
  const { data: files, isLoading, isError, error,} = useQuery<File[], Error>({
    queryKey: ["files"],
    queryFn: fetchFiles,
    staleTime:30*1000,
  });

  const isGrid = false; // Static state, can be replaced with props or dynamic logic

  if (isLoading) return <Loader />;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="file-list">
      {files && files.length === 0 ? (
        <p>No files found</p>
      ) : (
        files?.map((file) => <FileCard key={file.id} file={file} isGrid={isGrid} />)
      )}
    </div>
  );
};

export default FileList;
