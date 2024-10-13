// Filename - demoapp/app.js

import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

// Corrected path to serve static files from client/dist (no 'server' in path)
app.use(express.static(path.join(__dirname, "../client/dist")));

// Serve the React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/", "index.html"));
});

app.get("/post", (req, res) => {
  res.send("<h1>About Page<h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
