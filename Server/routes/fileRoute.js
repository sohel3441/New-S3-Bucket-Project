import express from "express";
import { upload, uploadFile, getAllFiles, getS3Files, deleteFile } from "../controllers/fileController.js";

const router = express.Router();

router.post("/upload", upload, uploadFile);
router.get("/files", getAllFiles);
router.get("/s3files", getS3Files);
router.delete("/delete/:id", deleteFile);

export default router;