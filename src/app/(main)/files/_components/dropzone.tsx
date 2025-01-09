"use client"
import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Thumbnail from "./Thumbnail";
import axios from "axios";

const getFileType = (filename: string) => {
  const extension = filename.split(".").pop() || "";
  const type = extension.match(/jpg|jpeg|png|gif/) ? "Image" : "File";
  return { type, extension };
};

export const FileUploader: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Callback to handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  // Function to handle file removal
  const handleRemoveFile = (fileToRemove: File) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileToRemove.name)
    );
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadError("No files to upload.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("file", file);
      });

      const response = await axios.post("/api/uploads/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setUploadSuccess(true);
        setFiles([]); // Clear files on success
      }
    } catch (error: any) {
      setUploadError(
        error.response?.data?.message || "Failed to upload files."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div>
      <div {...getRootProps()} className="cursor-pointer">
        <Button type="button" className="uploader-button">
          Drag and Drop or Click to Upload
        </Button>
        <input {...getInputProps()} />
        {isDragActive && <p>Drop the files here...</p>}
      </div>

      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <h4 className="h4 text-light-100">Files to Upload</h4>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li key={`${file.name}-${index}`} className="uploader-preview-list-item">
                <Thumbnail type={type} extension={extension} url={URL.createObjectURL(file)} />
                <p>{file.name}</p>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(file)}
                  className="bg-red-500 rounded-sm"
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <Button
        type="button"
        onClick={handleUpload}
        disabled={isUploading}
        className="mt-4"
      >
        {isUploading ? "Uploading..." : "Submit"}
      </Button>

      {uploadError && <p className="text-red-500">{uploadError}</p>}
      {uploadSuccess && <p className="text-green-500">Files uploaded successfully!</p>}
    </div>
  );
};

