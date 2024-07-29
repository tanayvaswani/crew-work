import express from "express";

import { taskRouter } from "./routes/task-router";

const app = express();

app.use(express.json());

app.get("/health", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "UP!" });
});

app.use("/api/v1/tasks", taskRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `${new Date().toLocaleString()}: Project is live on http://localhost:${
      process.env.PORT
    }`
  );
});
