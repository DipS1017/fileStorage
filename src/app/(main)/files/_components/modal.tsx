import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUploader } from "./dropzone";

export const Modal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><PlusIcon/> Add File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Drag and drop files or click the upload button to upload.
          </DialogDescription>
        </DialogHeader>
        <FileUploader />
      </DialogContent>
    </Dialog>
  );
};
