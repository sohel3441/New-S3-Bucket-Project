import express from "express";
import connectDB from "./connection/connection.js";
import router from "./routes/fileRoute.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
}))

connectDB();

// Your routes
app.use("/api", router);

app.get('/', (req, res) => {
  res.send('API is running')
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/favicon.png", (req, res) => res.status(204).end());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;