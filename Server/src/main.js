import express from "express";
import cors from 'cors';
import coursesRouter from "./routes/courses.js";
import studentsRouter from "./routes/students.js";

const app = express();
app.use(express.json());
app.use(cors())

app.use("/courses", coursesRouter);
app.use("/students", studentsRouter);

export default app;