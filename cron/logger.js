const fs = require("fs");
const path = require("path");

function logMessage(message) {
  const dir = path.join(__dirname, "../data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const logFile = path.join(dir, "cron.log");
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;

  fs.appendFileSync(logFile, logEntry, "utf8");
  console.log(message);
}

module.exports = { logMessage };
