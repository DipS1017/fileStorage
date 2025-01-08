import React from "react";
import { getFileIcon } from "../../utils";
import { cn } from "@/lib/utils";
interface ThumbnailProps {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string;
}

const Thumbnail = ({
  type,
  extension,
  url = "",
  imageClassName,
  className,
}: ThumbnailProps) => {
  const isImage = type === "Image";

  return (
    <figure className={cn("thumbnail", className)}>
      {isImage && (
        <img
          src={isImage ? url : getFileIcon(extension, type)}
          alt=""
          width={100}
          height={100}
          className={cn(
            "size-8 object-contain",
            imageClassName,
            isImage && "thumbnail-image"
          )}
        />
      )}
    </figure>
  );
};

export default Thumbnail;
