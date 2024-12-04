import app from "./app.js";
import { db } from "./database/db.js";
import { config } from "dotenv";
import cloudinary from "cloudinary";
import path from "path";
import { dirname } from "path";
import express from "express";
import { fileURLToPath } from "url";
// bodyParser=require('body-parser');
// app.use(bodyParser.json());

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
// Corrected path to serve static files from client/dist (no 'server' in path)
app.use(express.static(path.join(__dirname, "../client/dist")));
// Serve the React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
