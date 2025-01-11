import React from "react";
import { Modal} from "./_components/modal";
import  FileList from "./_components/FileList";

const FilesPage = () => {

  return (
    <div className="min-h-screen ">
      <Modal />
        <FileList/>

    </div>
  );
};

export default FilesPage;
