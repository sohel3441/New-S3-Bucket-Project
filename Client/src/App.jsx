import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import FileList from "./component/FileList";
import FileUpload from "./component/FileUpload";
import './App.css';

// const API_URL = "http://localhost:3000/api/files";

const Home = ({ fetchFiles }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles().then((data) => setFiles(data));
  }, [fetchFiles]);

  return (
    <div>
      <button className="File-button" onClick={() => navigate("/files")}>
        See All Files
      </button>
      <FileUpload refreshFiles={fetchFiles} />
    </div>
  );
};

const App = () => {
  const fetchFiles = async () => {
    try {
      // const res = await axios.get(`${import.meta.env.VITE_API_URL}/files`);
      const res = await axios.get(`/api/files/files`)
      return res.data;
    } catch (error) {
      console.error("Error fetching files:", error);
      return [];
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home fetchFiles={fetchFiles} />} />
        <Route path="/files" element={<FileList />} />
      </Routes>
    </Router>
  );
};

export default App;