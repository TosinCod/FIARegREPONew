const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
const GOOGLE_SCRIPT_URL2 = process.env.GOOGLE_SCRIPT_URL2;

app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL2, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    // console.error("Error forwarding to Google Script:", err.message);
    res.status(500).json({ result: "error", message: err.message });
  }
});

app.post("/api/becomeExpert", async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error forwarding to Google Script:", err.message);
    res.status(500).json({ result: "error", message: err.message });
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
