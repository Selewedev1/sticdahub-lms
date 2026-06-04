const express = require("express");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const app = express();
app.use(cors());
app.use(express.json());

// ======================
// CONFIG (ADD YOUR DATA)
// ======================
const API_KEY = "AIzaSyDoxAOQssbVvpfA9ncJJz6NJEJ8h9IihnQ";
const BLOG_ID = "1400790858073281872";

// ======================
// BLOGGER FUNCTION
// ======================
async function postToBlogger(title, content) {
  const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/?key=${API_KEY}`;

  const post = {
    title,
    content
  };

  const response = await axios.post(url, post);
  return response.data;
}

// ======================
// YOUR EXISTING LMS ROUTE
// ======================
app.post("/generate-lesson", (req, res) => {
  const { content } = req.body;

  const lesson = {
    theory: content,
    examples: ["Example 1", "Example 2"],
    exercises: ["Exercise 1", "Exercise 2"],
    examPractice: ["Exam Question 1", "Exam Question 2"]
  };

  res.json({ lesson });
});

// ======================
// BLOGGER PUBLISH ROUTE
// ======================
app.post("/publish-blog", async (req, res) => {
  const { title, content } = req.body;

  try {
    const result = await postToBlogger(title, content);

    res.json({
      message: "Published to Blogger successfully",
      data: result
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// ======================
// SERVER START
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
