const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");


const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

/* =======================
   HOME TEST
======================= */
app.get("/", (req, res) => {
  res.send("STICDAHUB LMS RUNNING 🚀");
});

/* =======================
   PDF UPLOAD ENGINE
======================= */
app.post("/upload-pdf", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded");

    const data = await pdfParse(req.file.buffer);

    res.json({
      message: "PDF extracted successfully",
      content: data.text
    });

  } catch (err) {
    res.status(500).send("PDF error");
  }
});

/* =======================
   AI LESSON GENERATOR
======================= */
function generateLesson(text) {
  return {
    theory: text.slice(0, 500),
    examples: [
      "Step-by-step example 1",
      "Step-by-step example 2"
    ],
    exercises: [
      "Solve related question 1",
      "Solve related question 2"
    ],
    examPractice: [
      "Paper style question 1",
      "Paper style question 2"
    ]
  };
}

app.post("/generate-lesson", (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "No content provided" });
  }

  const lesson = generateLesson(content);

  res.json({
    lesson
  });
});

/* =======================
   START SERVER
======================= */
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});

