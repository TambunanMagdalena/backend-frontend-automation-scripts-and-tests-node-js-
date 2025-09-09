const { v4: uuidv4 } = require("uuid");

class DataModel {
  constructor({ nama, kelas, role, createdBy }) {
    this.uuid = uuidv4(); // string
    this.nama = nama; // string
    this.kelas = kelas; // string
    this.role = role; // string
    this.createdAt = new Date().toISOString(); // string (ISO date)
    this.updatedAt = null; // string (ISO date) | null
    this.deletedAt = null; // string (ISO date) | null
    this.createdBy = createdBy || null; // string | null
    this.updatedBy = null; // string | null
    this.deletedBy = null; // string | null
    this.activeStatus = "ACTIVE"; // string
  }
}

module.exports = DataModel;
