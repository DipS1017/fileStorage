import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dropzones } from "./dropzone";

export const Modal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add File</Button>
      </DialogTrigger>
      <DialogContent>
        <Dropzones />
      </DialogContent>
    </Dialog>
  );
};
