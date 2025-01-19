
import React from "react";

import  SharedFileList from "./_components/SharedFileList";
import { Button } from "@/components/ui/button";
import {  GridIcon, Share2Icon,} from "lucide-react";

const SharedFilesPage = () => {

  return (
  <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">

        <h2 className="text-3xl font-bold tracking-tight flex gap-2 items-center"> <Share2Icon size={20} strokeWidth={1}/>Shared File</h2>
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
         </div>
      </div>
    <div className="min-h-screen p-1 ">


        <SharedFileList />
    </div>
    </div>
  );
};

export default SharedFilesPage;
