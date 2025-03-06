// ANDI

document
  .getElementById("calorie-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    let gender = document.getElementById("gender").value;
    let age = Number(document.getElementById("age").value);
    let height = Number(document.getElementById("height").value);
    let weight = Number(document.getElementById("weight").value);
    let resultElement = document.getElementById("result");

    // Validate input fields
    if (!gender || !age || !height || !weight) {
      resultElement.innerHTML =
        '<p style="color: red;">Harap isi semua kolom.</p>';
      return;
    }

    let bmr =
      gender === "male"
        ? 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age
        : 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
    resultElement.innerHTML = `<div class="mt-2 font-weight-medium">
                  <strong>${bmr.toFixed(0)}</strong> Kalori
                </div>`;
    hitungDefisit(); // Automatically update Defisit Kalori
  });

document
  .getElementById("dailyCalorieStatus")
  .addEventListener("DOMSubtreeModified", hitungDefisit);

// END BY ANDI

// =========

// FADHAL

let totalCaloriesConsumed = 0;
let foodEntries = [];
let editingIndex = null;

function addFood() {
  let foodName = document.getElementById("foodName").value.trim();
  let totalCalorieOfFood = document
    .getElementById("totalCalorieOfFood")
    .value.trim();
  let addButton = document.getElementById("add-update-button");
  let foodNameError = document.getElementById("foodNameError");
  let calorieError = document.getElementById("calorieError");

  // Cek apakah kolom 'Hitung Kalori' sudah lengkap
  let gender = document.getElementById("gender").value;
  let age = document.getElementById("age").value;
  let height = document.getElementById("height").value;
  let weight = document.getElementById("weight").value;
  let isCalorieFormIncomplete = !gender || !age || !height || !weight;

  // Reset error state setiap kali tombol ditekan
  resetErrorState();

  let hasError = false;

  // Jika kolom 'Hitung Kalori' belum lengkap & kalori kosong, tampilkan error
  if (isCalorieFormIncomplete && totalCalorieOfFood === "") {
    calorieError.textContent = "Jumlah kalori tidak boleh kosong.";
    document.getElementById("totalCalorieOfFood").classList.add("is-invalid");
    hasError = true;
  }

  // Validasi bahwa jumlah kalori hanya boleh angka
  let calorieRegex = /^[0-9]+$/;
  if (totalCalorieOfFood !== "" && !calorieRegex.test(totalCalorieOfFood)) {
    calorieError.textContent = "Jumlah kalori hanya boleh berisi angka.";
    document.getElementById("totalCalorieOfFood").classList.add("is-invalid");
    hasError = true;
  }

  // Jika ada error, hentikan proses
  if (hasError) {
    return;
  }

  totalCalorieOfFood = parseInt(totalCalorieOfFood);

  // Jika semua validasi berhasil, pastikan error hilang
  resetErrorState();

  if (foodName) {
    if (editingIndex !== null) {
      totalCaloriesConsumed -= foodEntries[editingIndex].calories; // Kurangi jumlah lama
      foodEntries[editingIndex] = {
        name: foodName,
        calories: totalCalorieOfFood,
      };
      editingIndex = null;
      addButton.textContent = "Tambahkan Makanan";
    } else {
      foodEntries.push({
        name: foodName,
        calories: totalCalorieOfFood,
      });
    }

    // Update total kalori konsumsi
    totalCaloriesConsumed = foodEntries.reduce(
      (sum, entry) => sum + entry.calories,
      0
    );
    document.getElementById(
      "dailyCalorieStatus"
    ).innerHTML = `<strong>${totalCaloriesConsumed}</strong> Kalori`;

    // Reset input setelah makanan ditambahkan
    document.getElementById("foodName").value = "";
    document.getElementById("totalCalorieOfFood").value = "";

    displayFoodEntries();
    hitungDefisit();
  }
}

document.getElementById("add-update-button").addEventListener("click", addFood);

document.addEventListener("DOMContentLoaded", () => {
  displayFoodEntries();
});

function displayFoodEntries() {
  let foodList = document.getElementById("foodList");
  foodList.innerHTML = "";
  let totalCalories = 0;

  foodEntries.forEach((entry, index) => {
    totalCalories += parseInt(entry.calories);
    foodList.innerHTML += `
            <div class="food-item d-flex justify-content-between align-items-center border-bottom py-2">
                <span>${entry.name} - ${entry.calories} Kalori</span>
                <div>
                    <button class="btn btn-warning btn-sm" onclick="editFood(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="removeFood(${index})">Hapus</button>
                </div>
            </div>
        `;
  });

  document.getElementById(
    "dailyCalorieStatus"
  ).innerHTML = `<strong>${totalCalories}</strong> Kalori`;

  // Jika semua makanan dihapus, kembalikan tampilan ke default
  if (foodEntries.length === 0) {
    document.getElementById("add-update-button").textContent =
      "Tambahkan Makanan";
    document.getElementById("foodName").value = "";
    document.getElementById("totalCalorieOfFood").value = "";
    resetErrorState();
    editingIndex = null;
  }
}

function editFood(index) {
  document.getElementById("foodName").value = foodEntries[index].name;
  document.getElementById("totalCalorieOfFood").value =
    foodEntries[index].calories;
  document.getElementById("add-update-button").textContent =
    "Perbarui Data Makanan";
  editingIndex = index;

  // Reset error saat masuk ke mode edit
  resetErrorState();
}

function removeFood(index) {
  foodEntries.splice(index, 1);
  displayFoodEntries();
}

function resetErrorState() {
  document.getElementById("foodNameError").textContent = "";
  document.getElementById("calorieError").textContent = "";
  document.getElementById("foodName").classList.remove("is-invalid");
  document.getElementById("totalCalorieOfFood").classList.remove("is-invalid");
}

// END BY FADHAL
// =========

// FAHRI //

function hitungDefisit() {
  let totalKebutuhanKaloriText = document.getElementById("result").innerText;
  let totalKaloriDikonsumsiText =
    document.getElementById("dailyCalorieStatus").innerText;

  let totalKebutuhanKalori = parseInt(totalKebutuhanKaloriText);
  let totalKaloriDikonsumsi = parseInt(totalKaloriDikonsumsiText);

  let defisitKalori = totalKebutuhanKalori - totalKaloriDikonsumsi;

  document.getElementById(
    "resultDefisit"
  ).innerHTML = `<h5><b>${defisitKalori} Kalori</b></h5>`;
  let kesimpulan = "";

  if (defisitKalori <= 300) {
    kesimpulan =
      "Kalorimu seimbang dan aktivitasmu juga cukup, pertahankan pola makan dan olahragamu.";
    bgColor = "bg-success text-white"; // Hijau (baik)
  } else if (defisitKalori > 300 && defisitKalori <= 500) {
    kesimpulan =
      "Defisit kalorimu kecil, dengan sedikit tingkatkan aktivitas bisa menyeimbangkan kalorimu.";
    bgColor = "bg-info text-white"; // Biru (cukup baik)
  } else if (defisitKalori > 500 && defisitKalori <= 700) {
    kesimpulan =
      "Defisit kalorimu mulai besar dan kamu perlu mengontrol pola makan dan tingkatkan aktivitasmu.";
    bgColor = "bg-warning text-dark"; // Kuning (peringatan)
  } else if (defisitKalori > 700 && defisitKalori <= 1000) {
    kesimpulan =
      "Defisit kalorimu ekstrem! Kamu berisiko obesitas atau kekurangan gizi, segera perbaiki!";
    bgColor = "bg-danger text-white"; // Merah (berbahaya)
  } else if (defisitKalori > 1000) {
    kesimpulan =
      "Kalorimu tidak terkendali! Ini bisa berbahaya bagi kesehatan, butuh perubahan segera! Jika perlu, konsultasikan ke dokter!";
    bgColor = "bg-dark text-white"; // Hitam (sangat berbahaya)
  }

  document.getElementById("kesimpulan").innerText = kesimpulan;

  // Update warna background
  let kesimpulanContainer = document.getElementById("kesimpulan-container");
  kesimpulanContainer.className = `text-center mt-4 p-3 rounded ${bgColor}`;

  let kategori, targetDefisit, masukan;

  let textColor = "text-dark"; // Default warna hitam

  if (defisitKalori > 1000) {
    kategori = "Sangat Buruk";
    targetDefisit = "Kalori tidak terkendali";
    masukan = "Segera ubah pola makan!";
    textColor = "text-danger"; // Merah (berbahaya)
  } else if (defisitKalori > 700) {
    kategori = "Buruk";
    targetDefisit = "Defisit/Surplus ekstrem";
    masukan = "Perbaiki keseimbangan kalori!";
    textColor = "text-warning"; // Kuning (peringatan)
  } else if (defisitKalori > 500) {
    kategori = "Cukup";
    targetDefisit = "Defisit/Surplus mulai besar";
    masukan = "Tambahkan sedikit aktivitas.";
    textColor = "text-info"; // Biru (cukup baik)
  } else if (defisitKalori > 300) {
    kategori = "Baik";
    targetDefisit = "Defisit/Surplus kecil";
    masukan = "Pertahankan pola makan & olahraga.";
    textColor = "text-success"; // Hijau (baik)
  } else {
    kategori = "Sangat Baik";
    targetDefisit = "Kalori seimbang";
    masukan = "Teruskan pola hidup sehat!";
    textColor = "text-primary"; // Biru tua (terbaik)
  }

  document.getElementById(
    "resultDefisitKesimpulan"
  ).innerHTML = `<b>${defisitKalori}</b> Kalori`;

  // Update teks Kategori
  let kategoriElement = document.getElementById("kategori");
  kategoriElement.textContent = kategori;
  kategoriElement.className = `card-text rounded ${textColor}`;

  let targetElement = document.getElementById("target_defisit");
  targetElement.textContent = targetDefisit;
  targetElement.className = `card-text rounded ${textColor}`;
  document.getElementById(
    "total_kalori_dikonsumsi"
  ).innerHTML = `<b>${totalKaloriDikonsumsi}</b> Kalori`;
  document.getElementById(
    "total_kalori_dibakar"
  ).innerHTML = `<b>${totalKebutuhanKalori}</b> Kalori`;
  document.getElementById("masukan").textContent = masukan;
}

// END FAHRI
