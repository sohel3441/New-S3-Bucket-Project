import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/File-Manager', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

export default connectDB;

// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();
// console.log(process.env.MONGO_URI);
// console.log(process.env.DB_NAME);
// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             dbName: process.env.DB_NAME,
//         });
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit(1);
//     }
// };

// export default connectDB;
    