import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:8000",
    "https://smart-hire-instant.vercel.app",
    "https://smat-hire-instant.vercel.app",
    "https://smart-hire-three.vercel.app",
    "https://job-hunt-opal.vercel.app",
    "https://smarthireinstant.netlify.app"
  ],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

app.use("/", (req, res) => {
  res.send("Welcome to SmartHire Backend API");
});


const start = async () => {
  await connectDB();        // yaha MONGO_URI use hoga
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
};

start();

export default app;
