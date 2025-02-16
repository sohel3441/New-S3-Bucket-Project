import axios from "axios";

const API_URL = "http://localhost:3000/api/files";

export const uploadFile = (formData) => axios.post(`${API_URL}/upload`, formData);
export const getFiles = () => axios.get(`${API_URL}/files`);
export const getS3Files = () => axios.get(`${API_URL}/s3files`);
export const deleteFile = (id) => axios.delete(`${API_URL}/delete/${id}`);
