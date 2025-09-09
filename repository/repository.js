const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../data.json");

function loadData() {
  if (!fs.existsSync(dataPath)) return [];
  const raw = fs.readFileSync(dataPath);
  return JSON.parse(raw);
}

function saveData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

function getAll() {
  const data = loadData();
  // Jika ingin hanya data aktif:
  // return data.filter(item => item.activeStatus === "ACTIVE" || !item.activeStatus);
  return data;
}

function getById(uuid) {
  const data = loadData();
  return data.find((item) => item.uuid == uuid);
}

function save(newData) {
  const data = loadData();
  data.push(newData);
  saveData(data);
}

function update(uuid, updatedData) {
  const data = loadData();
  const index = data.findIndex((item) => item.uuid == uuid);
  if (index === -1) return null;

  data[index] = { ...data[index], ...updatedData };
  saveData(data);
  return data[index];
}

function remove(uuid) {
  let data = loadData();
  const index = data.findIndex((item) => item.uuid == uuid);
  if (index === -1) return false;

  data.splice(index, 1);
  saveData(data);
  return true;
}

function setStatus(uuid, status) {
  const data = loadData();
  const index = data.findIndex((item) => item.uuid == uuid);
  if (index === -1) return null;
  data[index].activeStatus = status;
  saveData(data);
  return data[index];
}

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove,
  setStatus,
};
