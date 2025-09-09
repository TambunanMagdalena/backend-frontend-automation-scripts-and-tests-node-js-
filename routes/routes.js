const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers");

/**
 * @swagger
 * /data:
 *   get:
 *     summary: Ambil semua data
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter status ACTIVE/INACTIVE
 *     responses:
 *       200:
 *         description: Daftar data
 */
router.get("/data", controller.getAll);

/**
 * @swagger
 * /data/{id}:
 *   get:
 *     summary: Ambil data berdasarkan ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data ditemukan
 *       404:
 *         description: Data tidak ditemukan
 */
router.get("/data/:id", controller.getById);

/**
 * @swagger
 * /data:
 *   post:
 *     summary: Tambah data baru
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nama, kelas, role]
 *             properties:
 *               nama:
 *                 type: string
 *               kelas:
 *                 type: string
 *               role:
 *                 type: string
 *               createdBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Data berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 */
router.post("/data", controller.create);

/**
 * @swagger
 * /data/{id}:
 *   put:
 *     summary: Update data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nama, kelas, role]
 *             properties:
 *               nama:
 *                 type: string
 *               kelas:
 *                 type: string
 *               role:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data berhasil diupdate
 *       404:
 *         description: Data tidak ditemukan
 */
router.put("/data/:id", controller.update);

/**
 * @swagger
 * /data/{id}/status:
 *   patch:
 *     summary: Ubah status ACTIVE/INACTIVE
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE]
 *     responses:
 *       200:
 *         description: Status berhasil diubah
 *       404:
 *         description: Data tidak ditemukan
 */
router.patch("/data/:id/status", controller.setStatus);

/**
 * @swagger
 * /data/{id}:
 *   delete:
 *     summary: Hapus data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data berhasil dihapus
 *       404:
 *         description: Data tidak ditemukan
 */
router.delete("/data/:id", controller.remove);

module.exports = router;
