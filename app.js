const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
const cors = require("cors");
const setupSwagger = require("./swagger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware parsing JSON & form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS support
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Swagger docs
setupSwagger(app);

// Prefix API
app.use("/api", routes);
app.use(errorHandler);

module.exports = app; // ✅ penting untuk supertest
