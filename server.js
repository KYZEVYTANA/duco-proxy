const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors()); // разрешаем запросы с твоего сайта

app.get("/duco/:username", async (req, res) => {
  try {
    const url = `https://server.duinocoin.com/users/${req.params.username}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при получении данных" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy работает на порту ${PORT}`));

