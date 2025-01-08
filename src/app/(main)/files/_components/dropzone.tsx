"use client";

import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Thumbnail from "./Thumbnail";
import { convertFileToUrl } from "../../utils";
import { Upload } from "lucide-react";

interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  className?: string;
}

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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
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
                  <Thumbnail type={type} extension={extension} url={fileUrl} />
                  <p>{file.name}</p>
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
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};
