
require("dotenv").config();

const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve existing salon website files
app.use(express.static(__dirname));

// Parse incoming data
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true }));

// Configure PDF upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // Maximum 10 MB
  },
  fileFilter: (req, file, cb) => {
    const isPDF =
      file.mimetype === "application/pdf" &&
      path.extname(file.originalname).toLowerCase() === ".pdf";

    if (isPDF) {
      return cb(null, true);
    }

    cb(new Error("Only PDF files are allowed."));
  }
});

// Check backend status
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "B&Y Salon backend is running!"
  });
});

// Receive PDF bill from the billing website
app.post("/api/upload-bill", upload.single("bill"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload a PDF bill."
    });
  }

  console.log("PDF received:", req.file.originalname);
  console.log("PDF size:", req.file.size, "bytes");

  res.json({
    success: true,
    message: "PDF received successfully.",
    fileName: req.file.originalname,
    fileSize: req.file.size
  });
});

// Handle upload errors
app.use((err, req, res, next) => {
  console.error("Request error:", err.message);

  res.status(400).json({
    success: false,
    message: err.message || "Something went wrong."
  });
});

// Start server
app.listen(PORT, () => {
  console.log(
    `B&Y Salon server running at http://localhost:${PORT}`
  );
});
