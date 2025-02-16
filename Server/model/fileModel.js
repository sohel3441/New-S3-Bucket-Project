import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileName: String,
  fileUrl: String,
  uploadedAt: { type: Date, default: Date.now },
});

const fileModel = mongoose.model('File' , fileSchema);

export default fileModel;