const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get("/duco/:username", async (req, res) => {
  try {
    const url = `https://server.duinocoin.com/users/${req.params.username}`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(500).json({ error: "Ошибка при запросе к API DuinoCoin" });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Ошибка на сервере:", err);
    res.status(500).json({ error: "Ошибка сервера-прокси" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy работает на порту ${PORT}`);
});
