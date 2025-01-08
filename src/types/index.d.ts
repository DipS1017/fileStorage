interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  className?: string;
}
interface ThumbnailProps {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string;
}