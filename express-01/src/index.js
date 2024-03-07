import "dotenv/config";
import cors from "cors";
import express from "express";

console.log("Hello ever running Node.js project.");
console.log("MY_SECRET", process.env.MY_SECRET);

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("My express server!");
});

app.post("/", (req, res) => {
  res.send("My express server - POST!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
