"use client"

import { useEffect, useState } from "react"

const FileList = () => {


  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/files')

        if (!response.ok) {
          throw new Error('Error fetching files')
        }

        const data = await response.json()
        setFiles(data.files)
      } catch (err) {
        setError('Error fetching files: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="file-list">
      {files.length === 0 ? (
        <p>No files found</p>
      ) : (
        files.map((file) => <FileCard key={file.id} file={file} />)
      )}
    </div>
  )
}

export default FileList

