const express = require("express");
const cors = require("cors");
const https = require("https");

const app = express();
app.use(cors());

app.get("/api", (req, res) => {
  const data = req.query.data || "Example";
  const imageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`;
  
  https.get(imageUrl, (imageRes) => {
    res.setHeader("Content-Type", "image/png");
    imageRes.pipe(res);
  }).on("error", (err) => {
    res.status(500).send("QR code fetch error.");
  });
});

const PORT = 30126;
app.listen(PORT, () => {
  console.log(`QR Image Proxy running at http://localhost:30126/api?data=Hello`);
});
