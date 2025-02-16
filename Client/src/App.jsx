import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import FileList from "./component/FileList";
import FileUpload from "./component/FileUpload";
import './App.css';

const API_URL = "http://localhost:3000/api/files";

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
      const res = await axios.get(`${API_URL}/files`);
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

























// import React from "react"
// import { BrowserRouter, Routes, Route  } from "react-router-dom"
// import FileManager from "./component/FileManager";

// function App() {

//   return (
//      <BrowserRouter>
//      <Routes>
//        <Route path="/" element={<FileManager />} />
//      </Routes>
//      </BrowserRouter>
//      )
// }

// export default App;












// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import FileList from "./component/FileList";
// import FileUpload from "./component/FileUpload";
// import './App.css'

// const API_URL = "http://localhost:3000/api/files";

// const App = () => {
//   const [files, setFiles] = useState([]);

//   // Fetch files from backend
//   const fetchFiles = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/files`);
//       setFiles(res.data);
//     } catch (error) {
//       console.error("Error fetching files:", error);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   return (
//     <div>
//       <button className="File-button">See All Files</button>
//       <FileUpload refreshFiles={fetchFiles} />
//       <FileList files={files} />
//     </div>
//   );
// };

// export default App;




















