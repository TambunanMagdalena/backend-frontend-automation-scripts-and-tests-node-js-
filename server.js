/*const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
const cors = require("cors");
const setupSwagger = require("./swagger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 3000;

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

// === CRON JOBS ===
const cron = require("node-cron");
const { collectData } = require("./cron/cron_collect_data");
const { cleanseData } = require("./cron/cron_cleanse_data");

// Collect data jam 08:00, 12:00, 15:00
cron.schedule("0 8,12,15 * * *", () => {
  console.log("⏰ Running data collection...");
  collectData();
});

// Clean file lama tiap malam jam 23:59
cron.schedule("59 23 * * *", () => {
  console.log("⏰ Running data cleansing...");
  cleanseData();
});

// Jalankan server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
*/
const app = require("./app");
const cron = require("node-cron");
const { collectData } = require("./cron/cron_collect_data");
const { cleanseData } = require("./cron/cron_cleanse_data");

const PORT = 3000;

// Hanya jalankan cron & listen kalau BUKAN test
if (process.env.NODE_ENV !== "test") {
  // Collect data jam 08:00, 12:00, 15:00
  cron.schedule("0 8,12,15 * * *", () => {
    console.log("⏰ Running data collection...");
    collectData();
  });

  // Clean file lama tiap malam jam 23:59
  cron.schedule("59 23 * * *", () => {
    console.log("⏰ Running data cleansing...");
    cleanseData();
  });

  // Jalankan server
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
