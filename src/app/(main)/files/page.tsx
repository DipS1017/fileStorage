import React from "react";
import { Modal} from "./_components/modal";
import  FileList from "./_components/FileList";

const FilesPage = () => {

  return (
    <>
    <div className="min-h-screen p-1 ">
        <div className="flex justify-between">
          <Modal />
          <Modal />
        </div>

        <FileList/>
    </div>
    </>
  );
};

export default FilesPage;
