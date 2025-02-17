import express from "express";
// import connectDB from "./config/db.js";
import connectDB from "./connection/connection.js";
// import fileRoutes from "./routes/fileRoutes.js";
import router from "./routes/fileRoute.js";
import dotenv from "dotenv";
import cors from "cors";

//configure cors
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
};

dotenv.config();
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use("/api/files", router);

export default app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));