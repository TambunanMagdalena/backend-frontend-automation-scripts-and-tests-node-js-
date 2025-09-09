// (File not needed, logic moved to form.html)
document
  .getElementById("dataForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const kelas = document.getElementById("kelas").value;
    const role = document.getElementById("role").value;

    const response = await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, kelas, role }),
    });

    const result = await response.json();
    alert("Data berhasil ditambahkan!");
    window.location.href = "data.html";
  });

// 🔹 Event tombol lihat data
document.getElementById("lihatDataBtn").addEventListener("click", function () {
  window.location.href = "data.html";
});
