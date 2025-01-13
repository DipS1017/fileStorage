"use client";
import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Thumbnail from "./Thumbnail";
import { convertFileToUrl } from "../../utils";
import { Minus, Upload } from "lucide-react";
import axios from "axios";
import { useUser} from "@clerk/nextjs";
import { FileUploaderProps } from "@/types";

// Helper function to upload files to the server
const uploadFiles = async (
  files: File[],
  accountId: string,
) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("file[]", file);
  });
  formData.append("accountId", accountId);
  console.log("formData", formData);
  

  const response = await axios.post("/api/uploads/post", formData, {
    headers: { "content-type": "multipart/form-data" },
  });

  if (!response.data) {
    throw new Error("Failed to upload files");
  }

  return response.data; // This returns the uploaded data or success info
};

const getFileType = (filename: string) => {
  const extension = filename.split(".").pop() || "";
  const type = extension.match(/jpg|jpeg|png|gif/) ? "Image" : "File";
  return { type, extension };
};

export const FileUploader: React.FC<FileUploaderProps> = ({
  className = ""
}) => {
  const { user } = useUser();
  const accountId= user?.id;
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

console.log("ownerId", accountId);
  // Callback to handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);
  console.log("files", files);

  // Function to handle file removal
  const handleRemoveFile = (e: React.MouseEvent, fileToRemove: File) => {
    e.stopPropagation();
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileToRemove.name),
    );
  };

  // Handle form submission to upload the files
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      console.log("No files to upload.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Call the uploadFiles function to upload the files using Axios
      if (!accountId) {
        throw new Error("Owner ID or Account ID is missing.");
      }
      const response = await uploadFiles(files,  accountId);
      console.log("Files uploaded successfully:", response);
      setSuccessMessage("Files uploaded successfully!");
      setFiles([]);
    } catch (err: unknown) {
      console.error("Error uploading files:", err);
      setError("Error uploading files: " + err);
    } finally {
      setIsLoading(false);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div
        {...getRootProps()}
        className={`flex items-center justify-center w-full cursor-pointer ${className}`}
      >
        <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input {...getInputProps()} />
        </div>
      </div>

      {files.length > 0 && (
        <ul className="uploader-preview-list mt-4">
          <h4 className="h4 text-light-100">Selected Files ({files.length})</h4>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);
            const fileUrl = convertFileToUrl(file);
            return (
              <li
                key={`${file.name}-${index}`}
                className="uploader-preview-list-item flex items-center gap-2 mb-2"
              >
                <Thumbnail type={type} extension={extension} url={fileUrl} />
                <p className="text-sm">{file.name}</p>
                <button
                  type="button"
                  onClick={(e) => handleRemoveFile(e, file)}
                  className="bg-red-500 text-white p-2 rounded-full"
                >
                  <Minus size={24} />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <Button
        type="submit"
        className="mt-4 w-full"
        disabled={isLoading || files.length === 0}
      >
        {isLoading ? (
          <span>Uploading...</span>
        ) : (
          <span className="flex items-center gap-2">
            <Upload size={24} />
            Upload {files.length > 0 ? `(${files.length} files)` : ""}
          </span>
        )}
      </Button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
    </form>
  );
};
