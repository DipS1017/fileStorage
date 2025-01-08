import { Button } from "@/components/ui/button";
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
        <Button>Add File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Drag and drop files or click the drop area to upload.
          </DialogDescription>
        </DialogHeader>
        <FileUploader />
      </DialogContent>
    </Dialog>
  );
};
