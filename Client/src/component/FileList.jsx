import React, { useEffect, useState } from "react";
import axios from "axios";
import './File.css';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
              // const response = await axios.get(`https://new-s3-bucket-project-backend.vercel.app/api/files`) 
             // const response = await axios.get(`http://localhost:3000/api/files`) 
        const response = await axios.get(`http://35.154.24.123:3000/api/files`) 

        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleDelete = async (id) => {
    try {
      // await axios.delete(`https://new-s3-bucket-project-backend.vercel.app/api/delete/${id}`);
    //   await axios.delete(`http://localhost:3000/api/delete/${id}`);
         await axios.delete(`http://35.154.24.123:3000/api/delete/${id}`);
      setFiles(files.filter((file) => file._id!== id));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div>
      <h1 className="filelist"> All Files List</h1>
      <table className="Table" border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>#</th>
            <th>File Name</th>
            <th>File URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 ? (
            files.map((file, index) => (
              <tr key={file._id}>
                <td>{index + 1}</td>
                <td>{file.fileName}</td>
                <td>
                  <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                </td>
                {/* //Give delete button */}
                <td>
                  <button onClick={() => handleDelete(file._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No files available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
