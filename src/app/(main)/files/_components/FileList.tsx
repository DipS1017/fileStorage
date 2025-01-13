"use client"

import { useEffect, useState } from "react"
import {FileCard} from "@/./components/FileCard"
import {Loader} from "@/./components/element/loader"
import {File} from "@/types"


const FileList = () => {


  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
const [isGrid, ] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/file/get')

        if (!response.ok) {
          throw new Error('Error fetching files')
        }

        const data = await response.json()
        console.log(data)
        setFiles(data.files)
      } catch (err:unknown) {
        setError('Error fetching files: ' + err)
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [])

  if (loading) return <Loader/> 
  if (error) return <div>{error}</div>

  return (
    <div className="file-list">
      {files.length === 0 ? (
        <p>No files found</p>
      ) : (
        files.map((file) => <FileCard key={file.id} file={file} isGrid={isGrid} />)
      )}
    </div>
  )
}

export default FileList

