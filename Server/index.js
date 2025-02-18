// import express from "express";
// // import connectDB from "./config/db.js";
// import connectDB from "./connection/connection.js";
// // import fileRoutes from "./routes/fileRoutes.js";
// import router from "./routes/fileRoute.js";
// import dotenv from "dotenv";
// import cors from "cors";

// //configure cors


// dotenv.config();
// const app = express();

// app.use(express.json());
// const allowedOrigins = [
//     "http://localhost:3000/api/files",
//     "https://react-frontend-black.vercel.app"
//   ];
  
//   app.use(
//     cors({
//       origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//           callback(null, true);
//         } else {
//           callback(new Error("Not allowed by CORS"));
//         }
//       },
//     })
//   );


// connectDB();

// app.use("/api/files", router);

// app.get('/' , (req,res) => {
//     res.send('API is running')
// })

// export default app;

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

















import express from "express";
import connectDB from "./connection/connection.js";
import router from "./routes/fileRoute.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());

// Fixed CORS configuration
// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://react-frontend-git-main-shaikh-sohels-projects.vercel.app",
//   "https://react-frontend-black.vercel.app"
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // Add this if you're using cookies/sessions
//   })
// );


app.use(cors());

// OR (better) allow only specific frontend origins
const allowedOrigins = [ process.env.FRONTEND_URI , "https://react-frontend-black.vercel.app"];
app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // If you use cookies or authentication
  })
);

connectDB();

// Your routes
app.use("/api/files", router);

app.get('/', (req, res) => {
  res.send('API is running')
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;