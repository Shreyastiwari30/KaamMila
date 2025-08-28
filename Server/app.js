import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

import userRoute from './routes/user.route.js';
import companyRoute from './routes/companyroute.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/applicationroutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS - allow local dev + deployed frontend
app.use(cors({
  origin: [
    "http://localhost:5173",                          // local dev
    "https://kaam-mila-vercel.app",                  // deployed frontend (remove trailing slash)
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Handle preflight requests
app.options("*", cors());

// Connect to MongoDB before starting server
connectDB().then(() => {
    console.log('MongoDB connected');

    const PORT = process.env.PORT || 3000;

    // Routes (use **relative paths only**, not full URLs)
    app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/application", applicationRoute);


    // Start server
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
}).catch(err => {
    console.error('DB connection failed:', err);
});
