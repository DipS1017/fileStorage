
"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { File } from "@/types"
import { formatDistanceToNow } from "date-fns"
import { formatFileSize } from "@/components/element/fileSize"

interface FileModalProps {
  file: File
  isOpen: boolean
  onClose: () => void
}

export function FileModal({ file, isOpen, onClose }: FileModalProps) {
  const fileExtension = file.fileName.split('.').pop()?.toLowerCase()

  const getThumbnail = () => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg']
    if (imageExtensions.includes(fileExtension || '')) {
      return <img src={`http://localhost:3000${file.filePath}`} alt={file.fileName} className="w-full h-64 object-cover" />
    }
    return null
  }

  const getFileIcon = () => {
    switch (fileExtension) {
      case 'pdf':
        return '📄'
      case 'doc':
      case 'docx':
        return '📝'
      case 'xls':
      case 'xlsx':
        return '📊'
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '🖼️'
      default:
        return '📁'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{file.fileName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center">
            {getThumbnail() || <span className="text-6xl">{getFileIcon()}</span>}
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Size:</span>
            <span>{formatFileSize(file.fileSize)}</span>
            <span className="font-semibold">Uploaded:</span>
            <span>{formatDistanceToNow(new Date(file.uploadedAt), { addSuffix: true })}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

