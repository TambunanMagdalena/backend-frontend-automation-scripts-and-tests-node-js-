const repository = require("../repository/repository");
const DataModel = require("../model/model");

function getAllData(status) {
  const all = repository.getAll();
  if (status) {
    return all.filter((item) => item.activeStatus === status);
  }
  return all;
}

function getDataById(uuid) {
  return repository.getById(uuid);
}

function addData(nama, kelas, role, createdBy) {
  const newData = new DataModel({ nama, kelas, role, createdBy });
  repository.save(newData);
  return newData;
}

function updateData(uuid, payload) {
  const updatedFields = {
    ...payload,
    updatedAt: new Date().toISOString(),
    updatedBy: payload.updatedBy || null,
  };
  return repository.update(uuid, updatedFields);
}

function removeData(uuid) {
  return repository.remove(uuid);
}

function setStatus(uuid, status) {
  return repository.setStatus(uuid, status);
}

module.exports = {
  getAllData,
  getDataById,
  addData,
  updateData,
  removeData,
  setStatus,
};
