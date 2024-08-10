const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");

dotenv.config();

const app = express();

//database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database is connected successfully!");
  } catch (err) {
    console.log("error in bd");
    console.log(err);
  }
};

//middlewares
// app.use("/images",express.static(path.join(__dirname,"/images")))
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://blog-app-tuhin.vercel.app"],
//     credentials: true,
//   })
// );
// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "https://blog-app-tuhin.vercel.app/"],
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Handle preflight requests for all routes

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
app.get("/api/posts", (req, res) => {
  // Example response
  res.json({ message: "This is a list of posts" });
});
app.use("/api/comments", commentRoute);
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});
app.get("/", (req, res) => {
  // Example response
  res.json("hello");
});
// //image upload
// const storage=multer.diskStorage({
//     destination:(req,file,fn)=>{
//         fn(null,"images")
//     },
//     filename:(req,file,fn)=>{
//         fn(null,req.body.img)
//         // fn(null,"image1.jpg")
//     }
// })

// const upload=multer({storage:storage})
// app.post("/api/upload",upload.single("file"),(req,res)=>{
//     // console.log(req.body)
//     res.status(200).json("Image has been uploaded successfully!")
// })

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("app is running on port " + process.env.PORT);
});
