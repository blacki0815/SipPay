// server.js
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Pfade zu den JSON-Dateien
const ORDERS_DB_PATH = "orders.json";
const PFAND_DB_PATH = "pfand_rueckgaben.json";

// Falls Dateien nicht existieren, erstellen
if (!fs.existsSync(ORDERS_DB_PATH)) fs.writeFileSync(ORDERS_DB_PATH, JSON.stringify({}));
if (!fs.existsSync(PFAND_DB_PATH)) fs.writeFileSync(PFAND_DB_PATH, JSON.stringify({}));

// Hilfsfunktionen
function readDB(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

function writeDB(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// GET Orders (optional mit Datum filtern)
app.get("/orders", (req, res) => {
  let orders = readDB(ORDERS_DB_PATH);
  const date = req.query.date;

  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    orders = Object.fromEntries(
      Object.entries(orders).filter(([id, order]) => {
        const ts = new Date(order.timestamp);
        return ts >= startOfDay && ts <= endOfDay;
      })
    );
  }

  res.json(orders);
});

// POST neue Bestellung
app.post("/orders", (req, res) => {
  const orders = readDB(ORDERS_DB_PATH);
  const id = Date.now().toString();
  orders[id] = req.body;
  writeDB(ORDERS_DB_PATH, orders);
  res.json({ status: "ok", id });
});

// PUT Bestellung aktualisieren
app.put("/orders/:id", (req, res) => {
  const orders = readDB(ORDERS_DB_PATH);
  if (!orders[req.params.id]) {
    return res.status(404).json({ error: "Bestellung nicht gefunden" });
  }
  orders[req.params.id] = { ...orders[req.params.id], ...req.body };
  writeDB(ORDERS_DB_PATH, orders);
  res.json({ status: "updated" });
});

// DELETE alle Bestellungen
app.delete("/orders", (req, res) => {
  writeDB(ORDERS_DB_PATH, {}); // komplett leeren
  res.json({ status: "Alle Bestellungen gelöscht" });
});

// ------------------
// Pfand-Rückgaben API
// ------------------
app.get("/pfand_rueckgaben", (req, res) => {
  res.json(readDB(PFAND_DB_PATH));
});

app.post("/pfand_rueckgaben", (req, res) => {
  const pfand = readDB(PFAND_DB_PATH);
  const id = Date.now().toString();
  pfand[id] = req.body;
  writeDB(PFAND_DB_PATH, pfand);
  res.json({ status: "ok", id });
});

app.delete("/pfand_rueckgaben", (req, res) => {
  writeDB(PFAND_DB_PATH, {}); // komplett leeren
  res.json({ status: "Alle Pfand-Rückgaben gelöscht" });
});

// ------------------
// Server Start
// ------------------
app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));


app.use(express.static(__dirname + "/public"));