# backend-frontend-automation-scripts-and-tests-node-js-

# Student Data Backend & Automation

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
- **Swagger juga mendokumentasikan** endpoint terkait data siswa, update, hapus, dan perubahan status.

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

## 🤖 Automation (Linux/Ubuntu)

### 1. Collect Data Otomatis

- File: `cron/cron_collect_data.js`
- Mengambil data dari resource tertentu dan menyimpan ke `/home/cron/cron_{date}_{hours}.csv`
- **Log aktivitas**: Setiap kali collect data, hasil dan error dicatat di file log `data/cron.log` (lihat penjelasan log di bawah).

**Jadwalkan dengan cron:**

```bash
crontab -e
```

Tambahkan baris berikut:

```
0 8,12,15 * * * /usr/bin/node /path/to/cron/cron_collect_data.js
```

### 2. Data Cleansing Otomatis

- File: `cron/cron_cleanse_data.js`
- Menghapus file di `/home/cron` yang lebih dari 30 hari
- **Log aktivitas**: Setiap file yang dihapus juga dicatat di `data/cron.log`.

**Jadwalkan dengan cron:**

```
0 0 * * * /usr/bin/node /path/to/cron/cron_cleanse_data.js
```

> Ganti `/path/to/cron/` dengan path sebenarnya di server Anda.

---

## 📄 Log Cron

- Semua aktivitas cron (collect data & cleansing) dicatat di file log:
  ```
  data/cron.log
  ```
- Setiap baris log berisi timestamp dan pesan status, misal:
  ```
  [2025-09-06T15:06:12.325Z] ✅ Data collected and saved to D:\server\data\cron_09062025_22.06.csv
  ```
- Log ini bisa digunakan untuk audit, troubleshooting, dan memastikan cron berjalan sesuai jadwal.

---

## 🧪 Testing

- Jalankan unit test:
  ```
  npm test
  ```
- Test otomatis menggunakan file `tests/api.test.js` (menggunakan Jest/Supertest).

---

## 📝 Catatan

- Pastikan Node.js dan npm sudah terinstall.
- Untuk menjalankan cron job, pastikan permission folder `/home/cron` sudah benar.
- Semua data backend disimpan di file `data.json` (bisa di-reset jika perlu).
- File log cron otomatis akan dibuat di folder `data/` jika belum ada.

---

## 👤 Author

Nama: _Magdalena Pebrianty Tambunan_
