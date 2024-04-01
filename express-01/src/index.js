import "dotenv/config";
import cors from "cors";
import express from "express";
import { routes } from "./routes";
import models, { sequelize } from "./models";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("rwieruch"),
  };
  next();
});

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

app.get("/", (req, res) => {
  return res.send("Hello Express!");
});

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

const port = process.env.PORT || 3000;
sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      messages: [
        {
          text: "Published the Road to learn React",
        },
      ],
    },
    {
      include: [models.Message],
    }
  );

  await models.User.create(
    {
      username: "ddavids",
      messages: [
        {
          text: "Happy to release ...",
        },
        {
          text: "Published a complete ...",
        },
      ],
    },
    {
      include: [models.Message],
    }
  );
};
