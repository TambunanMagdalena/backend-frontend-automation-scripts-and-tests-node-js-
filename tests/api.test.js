const request = require("supertest");
const app = require("../app"); // ✅ ambil express app, bukan server.js

describe("📌 Student Data API", () => {
  let createdId = null;

  it("should create new student", async () => {
    const res = await request(app)
      .post("/api/data")
      .send({ nama: "John Doe", kelas: "10A", role: "Ketua" });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("uuid");

    createdId = res.body.data.uuid;
  });

  it("should get all students", async () => {
    const res = await request(app).get("/api/data");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should get a student by id", async () => {
    const res = await request(app).get(`/api/data/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("uuid", createdId);
  });

  it("should update a student", async () => {
    const res = await request(app)
      .put(`/api/data/${createdId}`)
      .send({ nama: "Jane Doe", kelas: "11B", role: "Wakil" });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("nama", "Jane Doe");
  });

  it("should change status of student", async () => {
    const res = await request(app)
      .patch(`/api/data/${createdId}/status`)
      .send({ status: "ACTIVE" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should delete a student", async () => {
    const res = await request(app).delete(`/api/data/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
