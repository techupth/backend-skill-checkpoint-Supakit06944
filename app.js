import express from "express";
import questionRouter from "./apps/question.js";

async function init() {
  const app = express();
  const port = 4000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/questions", questionRouter);

  app.get("/", (req, res) => {
    return res.json("Hello Skill Checkpoint #2");
  });

  app.get("*", (req, res) => {
    return res.status(404).json("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
