const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 5000;

/* const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
const GOOGLE_SCRIPT_URL2 = process.env.GOOGLE_SCRIPT_URL2; */

app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  res.json({ result: "success" });

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzIpeG-rcoDHHXEK7ic6LfhHpKvS5cAOsdcZHeBgcruWS7pNTSPsRVvZMOISc_lFnF5_w/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );
  } catch (err) {
    console.error("Google Script POST failed:", err.message);
    res.status(500).json({ result: "error", message: err.message });
  }
});

app.post("/api/becomeExpert", async (req, res) => {
  res.json({ result: "received" });

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbz67esJy0syCJnHCI-6oAUVnTX5YJuIUMMy2hSHl_vmf2v5iPen8AzkeJagD5SlN7BV2Q/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );
  } catch (err) {
    console.error("Error forwarding to Google Script:", err.message);
    res.status(500).json({ result: "error", message: err.message });
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
