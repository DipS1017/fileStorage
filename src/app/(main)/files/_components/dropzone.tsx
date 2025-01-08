import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Thumbnail from "./Thumbnail";
import { convertFileToUrl } from "../../utils";
import { Minus, Upload } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

// Helper function to upload files to the server
const uploadFiles = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("file", file);
  });

  const response = await fetch("/api/uploads/post", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload files");
  }
  return response.json(); // This returns the uploaded data or success info
};

const getFileType = (filename: string) => {
  const extension = filename.split(".").pop() || "";
  const type = extension.match(/jpg|jpeg|png|gif/) ? "Image" : "File";
  return { type, extension };
};

export const FileUploader: React.FC<FileUploaderProps> = ({
  ownerId,
  accountId,
  className = "",
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    uploadFiles,
    {
      onSuccess: () => {
        console.log("Files uploaded successfully.");
      },
      onError: (error: any) => {
        console.error("Error uploading files:", error.message);
      },
    }
  );

  // Callback to handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  // Function to handle file removal
  const handleRemoveFile = (e: React.MouseEvent, fileToRemove: File) => {
    e.stopPropagation();
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileToRemove.name)
    );
  };

  // Handle form submission to upload the files
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      console.log("No files to upload.");
      return;
    }

    // Call the mutate function to upload the files
    mutate(files); // This triggers the uploadFiles function to be called
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div {...getRootProps()} className={`cursor-pointer ${className}`}>
        <Button type="button" className="uploader-button">
          <Upload size={24} />
          <p>Upload</p>
        </Button>
        {files.length > 0 && (
          <ul className="uploader-preview-list">
            <h4 className="h4 text-light-100">Uploading</h4>
            {files.map((file, index) => {
              const { type, extension } = getFileType(file.name);
              const fileUrl = convertFileToUrl(file);
              return (
                <li
                  key={`${file.name}-${index}`}
                  className="uploader-preview-list-item"
                >
                  <div className="flex items-center gap-2">
                    <Thumbnail
                      type={type}
                      extension={extension}
                      url={fileUrl}
                    />
                    <p>{file.name}</p>
                    <button
                      type="button"
                      onClick={(e) => handleRemoveFile(e, file)}
                    >
                      <Minus
                        size={24}
                        color={"white"}
                        className="bg-red-500 rounded-sm"
                      />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag and drop some files here, or click button to select files</p>
        )}
      </div>

      <Button type="submit" className="mt-4" disabled={isLoading}>
        {isLoading ? "Uploading..." : "Submit"}
      </Button>

      {/* Error or Success Messages */}
      {isError && <p className="text-red-500">Error: {error?.message}</p>}
      {isSuccess && <p className="text-green-500">Upload Successful!</p>}
    </form>
  );
};
