const fs = require("fs");
const path = require("path");
const { logMessage } = require("./logger");

function cleanseData() {
  const dir = path.join(__dirname, "../data");
  const now = Date.now();
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const filepath = path.join(dir, file);
      const stat = fs.statSync(filepath);
      if (now - stat.mtimeMs > THIRTY_DAYS) {
        fs.unlinkSync(filepath);
        logMessage(`🗑️ Deleted old file: ${filepath}`);
      }
    });
  }
}

// Jalankan langsung kalau dipanggil manual
if (require.main === module) {
  cleanseData();
}

module.exports = { cleanseData };
