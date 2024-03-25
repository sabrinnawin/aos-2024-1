import "dotenv/config";
import cors from "cors";
import express from "express";
import { routes } from "./routes";
import models, { sequelize } from "./models";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

app.get("/", (req, res) => {
  return res.send("Hello Express!");
});

const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
