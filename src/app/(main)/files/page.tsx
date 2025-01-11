import React from "react";
import { Modal} from "./_components/modal";
import { FileCard } from "./_components/FileCard";

const FilesPage = () => {

/* const fakeFiles = [
  {
    id: "file_1",
    ownerId: "user_2rFWnFcRkniubGB20FrBuBRaG03",
    fileName: "pizza.jpg",
    filePath: "/uploads/pizza.jpg",
    fileSize: 138733, // in bytes
    uploadedAt: new Date('2025-01-11T10:28:30.970Z'), // date when the file was uploaded
  },
  {
    id: "file_2",
    ownerId: "user_2rFWnFcRkniubGB20FrBuBRaG03",
    fileName: "Pink_Pasta_Sauce2.jpg",
    filePath: "/uploads/Pink_Pasta_Sauce2.jpg",
    fileSize: 187385, // in bytes
    uploadedAt: new Date('2025-01-11T10:28:30.971Z'),
  },
  {
    id: "file_3",
    ownerId: "user_2rFWnFcRkniubGB20FrBuBRaG03",
    fileName: "Milk.jpg",
    filePath: "/uploads/Milk.jpg",
    fileSize: 99589, // in bytes
    uploadedAt: new Date('2025-01-11T10:28:30.971Z'),
  },
  {
    id: "file_4",
    ownerId: "user_3rFWnFcRkniubGB20FrBuBRaG04",
    fileName: "document.pdf",
    filePath: "/uploads/document.pdf",
    fileSize: 302917, // in bytes
    uploadedAt: new Date('2025-01-10T15:22:15.600Z'),
  },
  {
    id: "file_5",
    ownerId: "user_3rFWnFcRkniubGB20FrBuBRaG04",
    fileName: "report.docx",
    filePath: "/uploads/report.docx",
    fileSize: 145738, // in bytes
    uploadedAt: new Date('2025-01-09T12:10:45.550Z'),
  }
]; */
  return (
    <div className="min-h-screen ">
      <Modal />
        <FileCard/>

    </div>
  );
};

export default FilesPage;
