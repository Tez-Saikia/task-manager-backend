import express from "express";
import cors, { CorsOptions } from "cors";
import taskRoutes from "./routes/taskRoutes";

const app = express();

const allowedOrigins: string[] = [
  "https://todo-task-management-frontend.netlify.app",
  "http://localhost:5177"
];

const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: (error: Error | null, allow?: boolean | string) => void) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", taskRoutes);
app.listen(5000, () => console.log("Server running on port 5000"));
