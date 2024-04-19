import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { userRouter } from "./router/user.router";

dotenv.config();
const PORT = parseInt((process.env.SERVER_PORT as string) || "8080", 10);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use("/api/v1", userRouter);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
