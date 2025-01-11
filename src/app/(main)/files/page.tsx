import React from "react";
import { Modal} from "./_components/modal";
import  FileList from "./_components/FileList";
import { Button } from "@/components/ui/button";
import { GridIcon, ListIcon } from "lucide-react";

const FilesPage = () => {

  return (
    <>
    <div className="min-h-screen p-1 ">
        <div className="flex justify-between">
          <Modal />
<Button
          variant="outline"
          size="icon"
          // onClick={toggleView}
          // aria-label={isGrid? "Switch to list view" : "Switch to grid view"}
            // <ListIcon className="" />
        >
            <GridIcon className="" />
        </Button>
        </div>

        <FileList />
    </div>
    </>
  );
};

export default FilesPage;
