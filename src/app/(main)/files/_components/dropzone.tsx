import React from "react";
import Dropzone from "dropzone";
export const Dropzones = () => {
  let myDropzone = new Dropzone("div#myId", { url: "/file/post" });
  return (
    <>
      <div className="dz-preview dz-file-preview">
        <div className="dz-details">
          <div className="dz-filename">
            <span data-dz-name></span>
          </div>
          <div className="dz-size" data-dz-size></div>
          <img data-dz-thumbnail />
        </div>
        <div className="dz-progress">
          <span className="dz-upload" data-dz-uploadprogress></span>
        </div>
        <div className="dz-success-mark">
          <span>✔</span>
        </div>
        <div className="dz-error-mark">
          <span>✘</span>
        </div>
        <div className="dz-error-message">
          <span data-dz-errormessage></span>
        </div>
      </div>
    </>
  );
};
