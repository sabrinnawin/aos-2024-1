import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Welcome to the user API!");
});

router.get("/", (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  return res.send(req.context.models.users[userId]);
});

router.post("/", (req, res) => {
  const newUser = req.body;
  return res.send(`User created: ${JSON.stringify(newUser)}`);
});

router.put("/:userId", (req, res) => {
  const userId = req.params.userId;
  return res.send(`User with ID ${userId} updated`);
});

router.delete("/:userId", (req, res) => {
  const userId = req.params.userId;
  return res.send(`User with ID ${userId} deleted`);
});

export default router;
