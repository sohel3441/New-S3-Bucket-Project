import s3 from "../config/s3Config.js";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import fileModel from "../model/fileModel.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";


dotenv.config();

// Multer setup for S3
export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, `uploads/${Date.now()}-${file.originalname}`);
    },
  }),
}).single("file");

// Upload file to S3 and save to MongoDB
export const uploadFile = async (req, res) => {
  try {
    const { originalname, location } = req.file;
    const newFile = new fileModel({
      fileName: originalname,
      fileUrl: location,
    });
    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ message: "File upload failed", error });
  }
};

// Get all files from MongoDB
export const getAllFiles = async (req, res) => {
  try {
    const files = await fileModel.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "Error fetching files", error });
  }
};

// Get all files directly from S3
export const getS3Files = async (req, res) => {
  try {
    const params = { Bucket: process.env.AWS_BUCKET_NAME };
    const s3Files = await s3.listObjectsV2(params).promise();
    res.json(s3Files.Contents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching S3 files", error });
  }
};

// Delete file from S3 and MongoDB
// export const deleteFile = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find file by ID
//     const file = await fileModel.findById(id);
//     if (!file) {
//       return res.status(404).json({ message: "File not found" });
//     }

//     // Extract the file key correctly from the file URL
//     const fileUrl = file.fileUrl;
//     if (!fileUrl) {
//       return res.status(400).json({ message: "File URL not found" });
//     }

//     const fileKey = new URL(fileUrl).pathname.substring(1); // Extract key from URL

//     console.log("Extracted file key:", fileKey); // Debugging

//     if (!fileKey) {
//       return res.status(400).json({ message: "Invalid file URL" });
//     }

//     // Delete from S3
//     await s3
//       .deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: fileKey })
//       .promise();

//     // Delete from MongoDB
//     await fileModel.findByIdAndDelete(id);

//     res.json({ message: "File deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting file:", error);
//     res
//       .status(500)
//       .json({ message: "Error deleting file", error: error.message });
//   }
// };



export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Find file by ID
    const file = await fileModel.findById(id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Extract file key
    const fileUrl = file.fileUrl;
    const fileKey = new URL(fileUrl).pathname.substring(1);

    console.log("Extracted file key:", fileKey);

    // Delete from S3 (v3 way)
    await s3.send(new DeleteObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: fileKey }));

    // Delete from MongoDB
    await fileModel.findByIdAndDelete(id);

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Error deleting file", error: error.message });
  }
};
