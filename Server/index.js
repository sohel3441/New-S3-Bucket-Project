import express from "express";
// import connectDB from "./config/db.js";
import connectDB from "./connection/connection.js";
// import fileRoutes from "./routes/fileRoutes.js";
import router from "./routes/fileRoute.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/files", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

















// import express from "express";
// import dotenv from "dotenv";
// import router from './routes/fileRoute.js'
// import cors from 'cors';
// import connectDB from "./connection/connection.js";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(cors());
// app.use("/api", router);
// connectDB();


// app.use((error, req, res, next) => {
//     console.error('Error:', error);
//     res.status(500).json({ 
//         error: "Server error", 
//         message: error.message 
//     });
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));