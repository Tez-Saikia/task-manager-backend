import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes"; 

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);
app.listen(5000, () => console.log("Server running on port 5000"));
