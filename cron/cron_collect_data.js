const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { logMessage } = require("./logger");

async function collectData() {
  const now = new Date();
  const dateStr = `${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}${now.getFullYear()}`;
  const hourStr = `${String(now.getHours()).padStart(2, "0")}.${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  const dir = path.join(__dirname, "../data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filename = `cron_${dateStr}_${hourStr}.csv`;
  const filepath = path.join(dir, filename);

  try {
    const res = await axios.get("http://localhost:3000/api/data");
    const data = res.data.data || [];

    if (data.length === 0) {
      logMessage("⚠️ Tidak ada data untuk disimpan.");
      return;
    }

    const rows = data.map((item) => ({
      uuid: item.uuid,
      nama: item.nama,
      kelas: item.kelas,
      role: item.role,
      status: item.activeStatus || "-",
    }));

    const header = Object.keys(rows[0]).join(",");
    const csvRows = rows.map((row) =>
      Object.values(row)
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header, ...csvRows].join("\n");

    fs.writeFileSync(filepath, csv);
    logMessage(`✅ Data collected and saved to ${filepath}`);
  } catch (err) {
    logMessage(`❌ Failed to collect data: ${err.message}`);
  }
}

if (require.main === module) {
  collectData();
}

module.exports = { collectData };
