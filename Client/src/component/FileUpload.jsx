import React, { useState } from "react";
import axios from "axios";
import "./style.css";

const FileUpload = ({ refreshFiles }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // await axios.post(`https://new-s3-bucket-project-backend.vercel.app/api/upload` , formData);
     // await axios.post(`http://localhost:3000/api/upload` , formData);
      await axios.post(`http://35.154.24.123:3000/api/upload` , formData);

      setMessage("✅ File uploaded successfully!");
      setFile(null); // Clear file input after upload
      refreshFiles();
    } catch (error) {
      setMessage("❌ Error uploading file. Please try again.");
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="upload-container">
      <h4>Upload Your File</h4>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      {/* Display message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default FileUpload;
