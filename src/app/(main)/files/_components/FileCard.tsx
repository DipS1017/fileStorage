import { File } from '@/types/file'
import { formatDistanceToNow } from 'date-fns'
import { MoreVerticalIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface FileCardProps {
  file: File
}

export function FileCard({ file }: FileCardProps) {
  const fileExtension = file.fileName.split('.').pop()?.toLowerCase()

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

  const formatFileSize = (size: number | undefined) => {
    if (!size) return 'Unknown size'
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    let i = 0
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024
      i++
    }
    return `${size.toFixed(1)} ${units[i]}`
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">{getFileIcon()}</div>
            <div>
              <h3 className="font-semibold text-lg truncate" title={file.fileName}>
                {file.fileName}
              </h3>
              <p className="text-sm text-gray-500">
                {formatFileSize(file.fileSize)} • {formatDistanceToNow(new Date(file.uploadedAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


