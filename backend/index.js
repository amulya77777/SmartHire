import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

dotenv.config({});

const app = express();

// Security middleware
app.use(helmet());
app.disable('x-powered-by');

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173', // For local development
  'https://job-application-portal-r5ds.onrender.com', // Your Render backend
  'https://seekjob.netlify.app', // Your Netlify frontend
  'https://*.netlify.app' // Allow all Netlify preview deployments
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

// Other middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Rate limiting (uncomment and configure if needed)
// import rateLimit from 'express-rate-limit';
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again after 15 minutes'
// });
// app.use('/api', limiter);

const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// API-only mode - no static file serving
if (process.env.NODE_ENV === 'production') {
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is running' });
  });
  
  // Catch-all for non-API routes
  app.get('*', (req, res) => {
    res.status(404).json({
      status: 'error',
      message: 'Not Found',
      documentation: 'This is an API-only service. Please use the frontend application.',
      apiEndpoints: {
        user: '/api/v1/user',
        company: '/api/v1/company',
        job: '/api/v1/job',
        application: '/api/v1/application'
      }
    });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { error: err.message, stack: err.stack })
  });
});




app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})