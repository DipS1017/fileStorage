import React from "react";
import { Modal} from "./_components/modal";
import  FileList from "./_components/FileList";
import { Button } from "@/components/ui/button";
import { GridIcon, ListIcon } from "lucide-react";

const FilesPage = () => {

  return (
  <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Files</h2>
        <div className="flex items-center space-x-2">
<Button
          variant="outline"
          size="icon"
          // onClick={toggleView}
          // aria-label={isGrid? "Switch to list view" : "Switch to grid view"}
            // <ListIcon className="" />
        >
            <GridIcon className="" />
        </Button>
          <Modal />
         </div>
      </div>
    <div className="min-h-screen p-1 ">


        <FileList />
    </div>
    </div>
  );
};

export default FilesPage;
