# backend-frontend-automation-scripts-and-tests-node-js-

## Student Data Backend, Frontend & Automation

---

## 📦 Struktur Proyek

```
.
├── app.js
├── server.js
├── data.json
├── public/
│   ├── form.html
│   ├── data.html
│   ├── script.js
│   └── style.css
├── constants/
├── controllers/
├── model/
├── repository/
├── routes/
├── usecases/
├── cron/
│   ├── cron_collect_data.js
│   ├── cron_cleanse_data.js
│   └── logger.js
├── tests/
│   └── api.test.js
```

---

## 🚀 Cara Menjalankan Backend

1. **Install dependencies**

   ```
   npm install
   ```

2. **Jalankan server**

   ```
   node server.js
   ```

   Server berjalan di [http://localhost:3000](http://localhost:3000)

3. **Akses API**
   - Endpoint utama: `http://localhost:3000/api/data`
   - Dokumentasi Swagger: `http://localhost:3000/api-docs`

---

## 📝 Dokumentasi API (Swagger)

- **Swagger** digunakan untuk dokumentasi otomatis seluruh endpoint backend.
- Akses di: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Di Swagger, Anda bisa:
  - Melihat semua endpoint beserta penjelasan, parameter, dan contoh respons.
  - Melakukan uji coba request langsung dari browser.
  - Melihat spesifikasi input/output, error, dan response format.

---

## 🛠️ Fitur CRUD (Create, Read, Update, Delete)

Aplikasi backend menyediakan endpoint API untuk operasi CRUD pada data siswa:

- **Create**  
  Endpoint: `POST /api/data`  
  Mengirim data siswa (nama, kelas, role) dari frontend ke backend dan menyimpannya.

- **Read**  
  Endpoint: `GET /api/data`  
  Mengambil seluruh data siswa yang sudah disimpan.  
  Endpoint: `GET /api/data/:id`  
  Mengambil data siswa berdasarkan ID.

- **Update**  
  Endpoint: `PUT /api/data/:id`  
  Mengubah data siswa berdasarkan ID.

- **Delete**  
  Endpoint: `DELETE /api/data/:id`  
  Menghapus data siswa berdasarkan ID.

- **Change Status**  
  Endpoint: `PATCH /api/data/:id/status`  
  Mengubah status siswa (ACTIVE/INACTIVE).

Semua endpoint dan contoh request/response dapat dilihat dan diuji langsung melalui Swagger di [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

---

## 🖥️ Cara Menjalankan Frontend

1. **Buka file**

   - `public/form.html` untuk input data.
   - `public/data.html` untuk melihat, update, dan hapus data.

2. **Akses melalui browser**  
   Jika server berjalan, akses:
   - [http://localhost:3000/form.html](http://localhost:3000/form.html)
   - [http://localhost:3000/data.html](http://localhost:3000/data.html)

---

## 🤖 Automation (Linux & Lokal)

### 1. Menjalankan Automation Secara Manual/Lokal

- Jalankan script secara manual di terminal:
  ```sh
  node cron/cron_collect_data.js
  node cron/cron_cleanse_data.js
  ```
- File hasil collect data akan muncul di folder `data/` dengan format `cron_{date}_{hours}.csv`.
- Semua aktivitas (collect & cleansing) dicatat di file log: `data/cron.log`.

### 2. Menjadwalkan Automation di Linux (Cron)

- Edit crontab:
  ```sh
  crontab -e
  ```
- Tambahkan baris berikut (ganti path sesuai lokasi project Anda):
  ```
  0 8,12,15 * * * /usr/bin/node /home/lena/server/cron/cron_collect_data.js
  0 0 * * * /usr/bin/node /home/lena/server/cron/cron_cleanse_data.js
  ```
- Script akan berjalan otomatis sesuai jadwal:

  - **cron_collect_data.js**: collect data jam 08:00, 12:00, 15:00 setiap hari.
  - **cron_cleanse_data.js**: hapus file lama (>30 hari) setiap jam 00:00.

- Hasil file dan log tetap di folder `data/`.

---

## 📄 Log Cron

- Semua aktivitas cron (collect data & cleansing) dicatat di file log:
  ```
  data/cron.log
  ```
- Setiap baris log berisi timestamp dan pesan status, misal:
  ```
  [2025-09-06T15:06:12.325Z] ✅ Data collected and saved to /home/lena/server/data/cron_09062025_22.06.csv
  ```

---

## 🧪 Testing

### 1. **Unit & Integration Test Otomatis**

- Testing dilakukan menggunakan [Jest](https://jestjs.io/) dan [Supertest](https://github.com/ladjs/supertest).
- File test utama: `tests/api.test.js`
- Test mencakup:
  - Menambah data siswa (POST)
  - Mengambil seluruh data (GET)
  - Mengambil data berdasarkan ID (GET)
  - Update data (PUT)
  - Ubah status (PATCH)
  - Hapus data (DELETE)

### 2. **Menjalankan Test**

Jalankan perintah berikut di terminal:

```sh
npm test
```

atau

```sh
npx jest
```

### 3. **Hasil Test**

- Jika semua berjalan baik, akan muncul pesan bahwa seluruh test **passed**.
- Jika ada error, akan muncul detail error pada terminal.

---

## 📝 Catatan

- Pastikan Node.js dan npm sudah terinstall.
- Untuk menjalankan cron job di Linux, pastikan permission folder `data/` sudah benar.
- Semua data backend disimpan di file `data.json` (bisa di-reset jika perlu).
- File log cron otomatis akan dibuat di folder `data/` jika belum ada.
- Semua endpoint dan response sudah terdokumentasi di Swagger.

---

## 👤 Author

Nama: _Magdalena Pebrianty Tambunan_
