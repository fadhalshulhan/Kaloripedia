document
  .getElementById("calorie-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let gender = document.getElementById("gender").value;
    let age = Number(document.getElementById("age").value);
    let height = Number(document.getElementById("height").value);
    let weight = Number(document.getElementById("weight").value);
    let resultElement = document.getElementById("result");

    if (!gender || !age || !height || !weight) {
      resultElement.innerHTML =
        '<p style="color: red;">Harap isi semua kolom.</p>';
      return;
    }

    let bmr =
      gender === "male"
        ? 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age
        : 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
    resultElement.innerHTML = `<p><strong>${bmr.toFixed(
      0
    )}</strong> kalori</p>`;
    hitungDefisit(); // Automatically update Defisit Kalori
  });

document
  .getElementById("dailyCalorieStatus")
  .addEventListener("DOMSubtreeModified", hitungDefisit);

let totalCaloriesConsumed = 0;

function addFood() {
  let totalCalorieOfFood =
    parseInt(document.getElementById("totalCalorieOfFood").value) || 0;
  totalCaloriesConsumed += totalCalorieOfFood;
  document.getElementById("dailyCalorieStatus").textContent =
    totalCaloriesConsumed;
  hitungDefisit(); // Automatically update Defisit Kalori after adding food
}

document.getElementById("add-update-button").addEventListener("click", addFood);

function hitungDefisit() {
  let totalKaloriDikonsumsi = totalCaloriesConsumed;
  let totalKaloriDibakar =
    parseInt(document.getElementById("result").textContent) || 0;
  let defisitKalori = totalKaloriDibakar - totalKaloriDikonsumsi;

  let kategori, targetDefisit, masukan;
  if (defisitKalori > 1000) {
    kategori = "Sangat Buruk";
    targetDefisit = "Kalori tidak terkendali";
    masukan = "Segera ubah pola makan!";
  } else if (defisitKalori > 700) {
    kategori = "Buruk";
    targetDefisit = "Defisit/Surplus ekstrem";
    masukan = "Perbaiki keseimbangan kalori!";
  } else if (defisitKalori > 500) {
    kategori = "Cukup";
    targetDefisit = "Defisit/Surplus mulai besar";
    masukan = "Tambahkan sedikit aktivitas.";
  } else if (defisitKalori > 300) {
    kategori = "Baik";
    targetDefisit = "Defisit/Surplus kecil";
    masukan = "Pertahankan pola makan & olahraga.";
  } else {
    kategori = "Sangat Baik";
    targetDefisit = "Kalori seimbang";
    masukan = "Teruskan pola hidup sehat!";
  }

  document.getElementById(
    "resultDefisit"
  ).innerHTML = `<h5><strong>${defisitKalori}</strong> Kalori</h5>`;
  document.getElementById("kategori").textContent = kategori;
  document.getElementById("target_defisit").textContent = targetDefisit;
  document.getElementById(
    "total_kalori_dikonsumsi"
  ).textContent = `${totalKaloriDikonsumsi} kcal`;
  document.getElementById(
    "total_kalori_dibakar"
  ).textContent = `${totalKaloriDibakar} kcal`;
  document.getElementById("masukan").textContent = masukan;
}
