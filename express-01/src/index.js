import express from "express";
import { models } from "./models";
import userRoutes from "./userRoutes";

const app = express();

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.use("/", userRoutes);

export default app;
