import express from "express";
// import connectDB from "./config/db.js";
import connectDB from "./connection/connection.js";
// import fileRoutes from "./routes/fileRoutes.js";
import router from "./routes/fileRoute.js";
import dotenv from "dotenv";
import cors from "cors";

//configure cors


dotenv.config();
const app = express();

app.use(express.json());
const allowedOrigins = [
    "https://react-frontend-git-main-shaikh-sohels-projects.vercel.app",
    "https://react-frontend-black.vercel.app"
  ];
  
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    })
  );


connectDB();

app.use("/api/files", router);

app.get('/' , (req,res) => {
    res.send('API is running')
})

export default app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));