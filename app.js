const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// LISTENING THE SERVER
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("app running on port", port);
});

// ROUTES
app.get("/", (req, res) => {
  res.send("OK");
});

// Get all articles
app.get("/api/articles", (req, res) => {
  connectDB.query("SELECT * FROM articles", (err, rows) => {
    if (err) throw err;
    else res.send(rows);
  });
});

// Get one article
app.get("/api/articles/:id", (req, res) => {
  let sql = "SELECT * FROM articles WHERE id = ?";

  connectDB.query(sql, [req.params.id], (err, row) => {
    if (err) throw err;
    else res.send(row);
  });
});

// Create an article
app.post("/api/articles", (req, res) => {
  let data = {
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
  };

  let sql = "INSERT INTO articles SET ?";

  connectDB.query(sql, data, (err, results) => {
    if (err) throw err;
    else res.send(results);
  });
});

// Edit articles
app.put("/api/articles/:id", (req, res) => {
  let id = req.params.id;
  let description = req.body.description;
  let price = req.body.price;
  let stock = req.body.stock;
  let sql =
    "UPDATE articles SET description = ? , price = ? , stock = ? WHERE id = ?";

  connectDB.query(sql, [description, price, stock, id], (err, results) => {
    if (err) throw err;
    else res.send(results);
  });
});

// Delete article
app.delete("/api/articles/:id", (req, res) => {
  let sql = "DELETE FROM articles WHERE id = ?";
  connectDB.query(sql, [req.params.id], (err, rows) => {
    if (err) throw err;
    else res.send(rows);
  });
});

// DATABASE
const connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "articlesdb",
});

connectDB.connect((error) => {
  if (error) throw error;
  else console.log("Base de datos conectada");
});
