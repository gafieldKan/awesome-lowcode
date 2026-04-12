const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let apps = [];

app.post("/api/saveApp", (req, res) => {
  apps.push(req.body);
  res.json({ success: true });
});

app.get("/api/getApps", (req, res) => {
  res.json(apps);
});

app.listen(3300, () => console.log("LowCode server running at 3300"));